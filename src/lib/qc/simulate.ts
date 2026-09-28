import type {
  Detection,
  Inspection,
  Measurement,
  RecipeId,
  TeachSample,
  Verdict,
} from "./types";
import { recipeOf } from "./recipes";

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted<T extends { weight: number }>(rng: () => number, items: T[]): T {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let x = rng() * total;
  for (const item of items) {
    x -= item.weight;
    if (x <= 0) return item;
  }
  return items[items.length - 1]!;
}

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function jitter(rng: () => number, value: number, span: number) {
  return value + (rng() - 0.5) * span;
}

function boxAround(rng: () => number, cx: number, cy: number, w: number, h: number) {
  return {
    x: clamp(cx - w / 2 + (rng() - 0.5) * 0.04, 0.04, 0.9),
    y: clamp(cy - h / 2 + (rng() - 0.5) * 0.04, 0.08, 0.86),
    w,
    h,
  };
}

export function simulateInspection(opts: {
  recipeId: RecipeId;
  lotId: string;
  unitIndex: number;
  seed?: number;
  timestamp?: number;
}): Inspection {
  const recipe = recipeOf(opts.recipeId);
  const seed = opts.seed ?? Date.now() + opts.unitIndex * 9973;
  const rng = mulberry32(seed);

  const fail = rng() < recipe.failRate;
  const hold = !fail && rng() < 0.03;
  const defectCount = fail ? 1 + Math.floor(rng() * (rng() < 0.25 ? 3 : 2)) : 0;

  const detections: Detection[] = [];

  detections.push({
    id: `obj-${opts.unitIndex}`,
    label: recipe.name,
    ...boxAround(rng, 0.5, 0.52, 0.62, 0.58),
    confidence: 0.92 + rng() * 0.07,
    kind: "object",
  });

  for (let i = 0; i < defectCount; i++) {
    const d = pickWeighted(rng, recipe.defects);
    const cx = 0.28 + rng() * 0.44;
    const cy = 0.3 + rng() * 0.4;
    detections.push({
      id: `def-${opts.unitIndex}-${i}`,
      label: d.name,
      ...boxAround(rng, cx, cy, 0.1 + rng() * 0.12, 0.08 + rng() * 0.1),
      confidence: 0.71 + rng() * 0.24,
      kind: "defect",
      severity: d.severity,
    });
  }

  if (recipe.huskyAlgos.includes("ocr") || recipe.huskyAlgos.includes("barcode")) {
    detections.push({
      id: `code-${opts.unitIndex}`,
      label: recipe.huskyAlgos.includes("barcode") ? "GS1 barcode" : "Batch OCR",
      ...boxAround(rng, 0.68, 0.7, 0.22, 0.1),
      confidence: fail && rng() < 0.4 ? 0.42 + rng() * 0.2 : 0.9 + rng() * 0.08,
      kind: recipe.huskyAlgos.includes("barcode") ? "barcode" : "ocr",
      severity: fail && rng() < 0.4 ? "critical" : undefined,
    });
  }

  const measurements: Measurement[] = recipe.specs.map((spec) => {
    const inSpec = !fail || rng() > 0.45;
    let value: number;
    const target = spec.target ?? spec.specMin ?? 0;
    if (inSpec) {
      const span = spec.specMax != null && spec.specMin != null
        ? (spec.specMax - spec.specMin) * 0.35
        : Math.max(0.2, Math.abs(target) * 0.08);
      value = jitter(rng, target, span);
      if (spec.specMin != null) value = Math.max(spec.specMin, value);
      if (spec.specMax != null) value = Math.min(spec.specMax, value);
    } else {
      if (spec.specMax != null && rng() > 0.5) value = spec.specMax + (0.4 + rng()) * (Math.abs(spec.specMax) * 0.08 + 0.5);
      else if (spec.specMin != null) value = spec.specMin - (0.4 + rng()) * (Math.abs(spec.specMin) * 0.06 + 0.4);
      else value = target * (1.2 + rng() * 0.3);
    }
    return {
      name: spec.name,
      value: Number(value.toFixed(spec.unit === "ea" ? 0 : 2)),
      unit: spec.unit,
      specMin: spec.specMin,
      specMax: spec.specMax,
      target: spec.target,
    };
  });

  const oos = measurements.filter((m) => {
    if (m.specMin != null && m.value < m.specMin) return true;
    if (m.specMax != null && m.value > m.specMax) return true;
    return false;
  }).length;

  const defectDetections = detections.filter((d) => d.kind === "defect");
  let verdict: Verdict = "pass";
  if (hold) verdict = "hold";
  if (fail || defectDetections.some((d) => d.severity === "critical") || oos > 0) {
    verdict = "fail";
  }

  const score = clamp(
    100 - defectDetections.length * 18 - oos * 14 - (verdict === "hold" ? 8 : 0) + rng() * 4,
    12,
    99.4,
  );

  return {
    id: `u${opts.lotId.slice(-4)}${opts.unitIndex.toString(36)}`,
    lotId: opts.lotId,
    recipeId: opts.recipeId,
    sku: recipe.sku,
    unitIndex: opts.unitIndex,
    timestamp: opts.timestamp ?? 0,
    verdict,
    score: Number(score.toFixed(1)),
    detections,
    measurements,
    cycleMs: recipe.inspectMs + Math.round((rng() - 0.5) * 80),
    huskyAlgos: recipe.huskyAlgos,
  };
}

export function measurementStatus(m: Measurement): "ok" | "warn" | "fail" {
  if (m.specMin != null && m.value < m.specMin) return "fail";
  if (m.specMax != null && m.value > m.specMax) return "fail";
  if (m.target != null && m.specMin != null && m.specMax != null) {
    const band = (m.specMax - m.specMin) * 0.15;
    if (Math.abs(m.value - m.target) > (m.specMax - m.specMin) / 2 - band) return "warn";
  }
  return "ok";
}

export function yieldOf(rows: { verdict: Verdict }[]) {
  if (rows.length === 0) return { n: 0, pass: 0, fail: 0, hold: 0, yieldPct: 0 };
  const pass = rows.filter((r) => r.verdict === "pass").length;
  const fail = rows.filter((r) => r.verdict === "fail").length;
  const hold = rows.filter((r) => r.verdict === "hold").length;
  return { n: rows.length, pass, fail, hold, yieldPct: (pass / rows.length) * 100 };
}

export function defectPareto(rows: Inspection[]) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    for (const d of row.detections) {
      if (d.kind !== "defect") continue;
      counts.set(d.label, (counts.get(d.label) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function makeTeachSample(
  inspection: Inspection,
  label: TeachSample["label"],
  thumb: string,
): TeachSample {
  const defect = inspection.detections.find((d) => d.kind === "defect");
  return {
    id: `ts-${inspection.id}-${label}`,
    recipeId: inspection.recipeId,
    label,
    defectName: label === "defect" ? defect?.label : undefined,
    capturedAt: Date.now(),
    thumb,
  };
}
