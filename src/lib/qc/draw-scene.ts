import type { Detection, Inspection, RecipeId, Verdict } from "./types";

export const DRAW = {
  bg: "#121511",
  belt: "#1a1e19",
  beltGroove: "#10140f",
  sage: "#c5d0c2",
  sageDim: "rgba(197, 208, 194, 0.45)",
  ink: "#e8ebe4",
  muted: "#8b9288",
  pass: "#6b9a72",
  fail: "#c45c4a",
  hold: "#b08a4a",
  grid: "rgba(232, 235, 228, 0.06)",
  hud: "rgba(14, 16, 15, 0.72)",
};

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

type Phase = "incoming" | "inspecting" | "decided" | "outgoing" | "idle";

export function productOffset(phase: Phase, t: number) {
  if (phase === "incoming") return 1 - easeOut(t);
  if (phase === "outgoing") return -easeIn(t);
  if (phase === "idle") return 1.15;
  return 0;
}

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}
function easeIn(t: number) {
  return t * t;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function drawScene(
  ctx: CanvasRenderingContext2D,
  opts: {
    w: number;
    h: number;
    recipeId: RecipeId;
    inspection: Inspection | null;
    phase: Phase;
    t: number;
    showGrid: boolean;
    now: number;
    reduced: boolean;
  },
) {
  const { w, h, recipeId, inspection, phase, t, showGrid, now, reduced } = opts;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = DRAW.bg;
  ctx.fillRect(0, 0, w, h);

  drawVignette(ctx, w, h);
  drawBelt(ctx, w, h, now, reduced);

  const shift = productOffset(phase, reduced ? 1 : t);
  const cx = w * (0.5 + shift * 0.72);
  const cy = h * 0.5;
  const pw = w * 0.58;
  const ph = h * 0.56;

  if (phase !== "idle") {
    drawProduct(ctx, recipeId, inspection, cx, cy, pw, ph, now);
  }

  if (showGrid) drawGrid(ctx, w, h);

  if (phase === "inspecting" || phase === "decided") {
    const reveal = phase === "decided" ? 1 : reduced ? 1 : t;
    drawDetections(ctx, w, h, cx, cy, pw, ph, inspection, reveal);
    if (phase === "inspecting") drawScan(ctx, w, h, t);
  }

  if (phase === "decided" && inspection) {
    drawStamp(ctx, w, h, inspection.verdict, reduced ? 1 : t);
  }

  drawCrosshair(ctx, w, h);
  drawHud(ctx, w, h, recipeId, inspection, phase, now);
}

function drawVignette(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const g = ctx.createRadialGradient(w * 0.5, h * 0.48, h * 0.15, w * 0.5, h * 0.5, h * 0.78);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.42)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function drawBelt(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  now: number,
  reduced: boolean,
) {
  const y0 = h * 0.72;
  const y1 = h * 0.92;
  ctx.fillStyle = DRAW.belt;
  ctx.fillRect(0, y0, w, y1 - y0);
  ctx.fillStyle = DRAW.beltGroove;
  const drift = reduced ? 0 : (now / 18) % 28;
  for (let x = -28 + drift; x < w; x += 28) {
    ctx.fillRect(x, y0, 3, y1 - y0);
  }
  ctx.fillStyle = "rgba(197, 208, 194, 0.08)";
  ctx.fillRect(0, y0, w, 1);
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = DRAW.grid;
  ctx.lineWidth = 1;
  const step = 32;
  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
  }
  for (let y = 0; y <= h; y += step) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
  }
  ctx.stroke();
}

function drawCrosshair(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  ctx.strokeStyle = "rgba(197, 208, 194, 0.28)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 18, cy);
  ctx.lineTo(cx - 6, cy);
  ctx.moveTo(cx + 6, cy);
  ctx.lineTo(cx + 18, cy);
  ctx.moveTo(cx, cy - 18);
  ctx.lineTo(cx, cy - 6);
  ctx.moveTo(cx, cy + 6);
  ctx.lineTo(cx, cy + 18);
  ctx.stroke();
  ctx.strokeRect(cx - 4.5, cy - 4.5, 9, 9);
}

function drawScan(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const y = lerp(h * 0.16, h * 0.78, t);
  const g = ctx.createLinearGradient(0, y - 18, 0, y + 18);
  g.addColorStop(0, "rgba(197, 208, 194, 0)");
  g.addColorStop(0.5, "rgba(197, 208, 194, 0.16)");
  g.addColorStop(1, "rgba(197, 208, 194, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, y - 18, w, 36);
  ctx.fillStyle = "rgba(197, 208, 194, 0.45)";
  ctx.fillRect(0, y, w, 1);
}

function drawStamp(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  verdict: Verdict,
  t: number,
) {
  const label = verdict.toUpperCase();
  const color = verdict === "pass" ? DRAW.pass : verdict === "fail" ? DRAW.fail : DRAW.hold;
  ctx.save();
  ctx.translate(w * 0.78, h * 0.22);
  ctx.rotate(-0.18);
  ctx.globalAlpha = Math.min(1, t * 1.8);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  roundRect(ctx, -52, -22, 104, 44, 4);
  ctx.stroke();
  ctx.font = "600 18px 'IBM Plex Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 0, 1);
  ctx.restore();
}

function drawHud(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  recipeId: RecipeId,
  inspection: Inspection | null,
  phase: Phase,
  now: number,
) {
  ctx.fillStyle = DRAW.hud;
  ctx.fillRect(0, 0, w, 28);
  ctx.fillRect(0, h - 26, w, 26);
  ctx.fillStyle = DRAW.sage;
  ctx.font = "500 11px 'IBM Plex Mono', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("HUSKYLENS 2  ·  GC2093  640×480", 10, 14);
  ctx.textAlign = "right";
  ctx.fillStyle = DRAW.muted;
  const frame = Math.floor(now / 33) % 99999;
  ctx.fillText(`F ${String(frame).padStart(5, "0")}   ${phase.toUpperCase()}`, w - 10, 14);

  ctx.textAlign = "left";
  ctx.fillStyle = DRAW.muted;
  ctx.fillText(`RECIPE  ${recipeId.toUpperCase()}`, 10, h - 13);
  ctx.textAlign = "right";
  if (inspection) {
    ctx.fillStyle = DRAW.ink;
    ctx.fillText(
      `UNIT ${inspection.unitIndex.toString().padStart(4, "0")}  ${inspection.sku}`,
      w - 10,
      h - 13,
    );
  } else {
    ctx.fillText("STANDBY", w - 10, h - 13);
  }
}

function drawDetections(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  pw: number,
  ph: number,
  inspection: Inspection | null,
  reveal: number,
) {
  if (!inspection) return;
  const n = inspection.detections.length;
  inspection.detections.forEach((d, i) => {
    const gate = (i + 1) / Math.max(n, 1);
    if (reveal + 0.12 < gate) return;
    const alpha = Math.min(1, (reveal - (gate - 0.2)) * 4);
    drawBox(ctx, d, w, h, cx, cy, pw, ph, alpha);
  });
}

function drawBox(
  ctx: CanvasRenderingContext2D,
  d: Detection,
  w: number,
  h: number,
  cx: number,
  cy: number,
  pw: number,
  ph: number,
  alpha: number,
) {
  const x = cx - pw / 2 + d.x * pw;
  const y = cy - ph / 2 + d.y * ph;
  const bw = d.w * pw;
  const bh = d.h * ph;
  const color =
    d.kind === "defect"
      ? DRAW.fail
      : d.kind === "object"
        ? DRAW.sage
        : DRAW.hold;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = d.kind === "defect" ? 2 : 1.25;
  ctx.strokeRect(x, y, bw, bh);
  ctx.fillStyle = color;
  ctx.font = "500 10px 'IBM Plex Mono', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  const tag = `${d.label}  ${(d.confidence * 100).toFixed(0)}`;
  const tw = ctx.measureText(tag).width + 8;
  ctx.fillRect(x, y - 16, tw, 16);
  ctx.fillStyle = "#0e100f";
  ctx.fillText(tag, x + 4, y - 3);
  ctx.restore();
  void w;
  void h;
}

function drawProduct(
  ctx: CanvasRenderingContext2D,
  recipeId: RecipeId,
  inspection: Inspection | null,
  cx: number,
  cy: number,
  pw: number,
  ph: number,
  now: number,
) {
  ctx.save();
  ctx.translate(cx, cy);
  const seed = inspection?.unitIndex ?? 1;
  switch (recipeId) {
    case "textile":
      drawTextile(ctx, pw, ph, seed, inspection);
      break;
    case "packaging":
      drawBottle(ctx, pw, ph, seed, inspection);
      break;
    case "metal":
      drawBracket(ctx, pw, ph, seed, inspection);
      break;
    case "electronics":
      drawPcb(ctx, pw, ph, seed, inspection);
      break;
    case "ceramics":
      drawTile(ctx, pw, ph, seed, inspection);
      break;
    case "print":
      drawCarton(ctx, pw, ph, seed, inspection);
      break;
  }
  ctx.restore();
  void now;
}

function drawTextile(
  ctx: CanvasRenderingContext2D,
  pw: number,
  ph: number,
  seed: number,
  inspection: Inspection | null,
) {
  const w = pw * 0.92;
  const h = ph * 0.78;
  ctx.fillStyle = "#3a4a3d";
  ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = "rgba(232, 235, 228, 0.08)";
  ctx.lineWidth = 1;
  for (let x = -w / 2; x < w / 2; x += 7) {
    ctx.beginPath();
    ctx.moveTo(x, -h / 2);
    ctx.lineTo(x + 4, h / 2);
    ctx.stroke();
  }
  for (let y = -h / 2; y < h / 2; y += 6) {
    ctx.beginPath();
    ctx.moveTo(-w / 2, y);
    ctx.lineTo(w / 2, y);
    ctx.stroke();
  }
  const hueShift = (hash(seed) - 0.5) * 10;
  ctx.fillStyle = `rgba(90, ${120 + hueShift}, 95, 0.18)`;
  ctx.fillRect(-w / 2, -h / 2, w, h);
  if (inspection?.verdict === "fail") {
    const d = inspection.detections.find((x) => x.kind === "defect");
    if (d?.label.includes("stain") || d?.label.includes("Shade") || hash(seed) > 0.4) {
      ctx.fillStyle = "rgba(70, 50, 30, 0.55)";
      ctx.beginPath();
      ctx.ellipse(-w * 0.12, h * 0.08, 18, 12, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    if (d?.label.includes("hole") || hash(seed * 3) > 0.55) {
      ctx.fillStyle = "#121511";
      ctx.beginPath();
      ctx.arc(w * 0.16, -h * 0.12, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.strokeStyle = "rgba(197, 208, 194, 0.2)";
  ctx.strokeRect(-w / 2, -h / 2, w, h);
}

function drawBottle(
  ctx: CanvasRenderingContext2D,
  pw: number,
  ph: number,
  seed: number,
  inspection: Inspection | null,
) {
  const underfill = inspection?.detections.some((d) => d.label === "Underfill");
  const noCap = inspection?.detections.some((d) => d.label === "Missing cap");
  const skew = inspection?.detections.some((d) => d.label === "Label skew") ? 0.12 : 0;
  ctx.fillStyle = "#2a332c";
  roundRect(ctx, -pw * 0.16, -ph * 0.08, pw * 0.32, ph * 0.42, 16);
  ctx.fill();
  const fillH = underfill ? ph * 0.18 : ph * 0.3;
  ctx.fillStyle = "rgba(90, 140, 110, 0.55)";
  roundRect(ctx, -pw * 0.14, ph * 0.3 - fillH, pw * 0.28, fillH, 12);
  ctx.fill();
  ctx.fillStyle = "#cfc8b4";
  ctx.save();
  ctx.translate(0, ph * 0.06);
  ctx.rotate(skew);
  ctx.fillRect(-pw * 0.13, -ph * 0.06, pw * 0.26, ph * 0.16);
  ctx.fillStyle = "#3d453c";
  ctx.font = "600 11px 'IBM Plex Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("500 ml", 0, 4);
  ctx.restore();
  ctx.fillStyle = "#8a9086";
  ctx.fillRect(-pw * 0.06, -ph * 0.28, pw * 0.12, ph * 0.2);
  if (!noCap) {
    ctx.fillStyle = hash(seed) > 0.5 ? "#6b9a72" : "#4a6b52";
    roundRect(ctx, -pw * 0.07, -ph * 0.38, pw * 0.14, ph * 0.11, 4);
    ctx.fill();
  }
}

function drawBracket(
  ctx: CanvasRenderingContext2D,
  pw: number,
  ph: number,
  seed: number,
  inspection: Inspection | null,
) {
  const missing = inspection?.detections.some((d) => d.label === "Missing hole");
  ctx.fillStyle = "#8d9388";
  ctx.beginPath();
  ctx.moveTo(-pw * 0.36, -ph * 0.12);
  ctx.lineTo(pw * 0.36, -ph * 0.12);
  ctx.lineTo(pw * 0.36, ph * 0.08);
  ctx.lineTo(pw * 0.12, ph * 0.08);
  ctx.lineTo(pw * 0.12, ph * 0.28);
  ctx.lineTo(-pw * 0.12, ph * 0.28);
  ctx.lineTo(-pw * 0.12, ph * 0.08);
  ctx.lineTo(-pw * 0.36, ph * 0.08);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#6f756c";
  ctx.fill();
  const holes = [
    [-0.26, -0.02],
    [0.26, -0.02],
    [-0.0, 0.18],
    [0.0, -0.02],
  ] as const;
  holes.forEach((pt, i) => {
    if (missing && i === 2) return;
    ctx.beginPath();
    ctx.fillStyle = "#121511";
    ctx.arc(pt[0] * pw, pt[1] * ph, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#b7bdb4";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
  if (inspection?.detections.some((d) => d.label.includes("burr"))) {
    ctx.strokeStyle = "#c45c4a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pw * 0.36, -ph * 0.04);
    ctx.lineTo(pw * 0.4, 0);
    ctx.lineTo(pw * 0.36, ph * 0.04);
    ctx.stroke();
  }
  void seed;
}

function drawPcb(
  ctx: CanvasRenderingContext2D,
  pw: number,
  ph: number,
  seed: number,
  inspection: Inspection | null,
) {
  const w = pw * 0.78;
  const h = ph * 0.62;
  ctx.fillStyle = "#1d3a2a";
  ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 8; i++) {
    const y = -h / 2 + 10 + i * (h / 9);
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 8, y);
    ctx.lineTo(w / 2 - 8, y + (hash(seed + i) - 0.5) * 8);
    ctx.stroke();
  }
  const missing = inspection?.detections.some((d) => d.label.includes("Missing"));
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      if (missing && r === 1 && c === 2) continue;
      const x = -w / 2 + 22 + c * (w / 6.4);
      const y = -h / 2 + 18 + r * (h / 3.4);
      ctx.fillStyle = r === 0 && c === 0 ? "#1a1c1a" : "#2a2e2a";
      ctx.fillRect(x, y, 22, 12);
      ctx.fillStyle = "#d4af37";
      ctx.fillRect(x + 2, y + 3, 3, 6);
      ctx.fillRect(x + 17, y + 3, 3, 6);
    }
  }
  ctx.fillStyle = "#111";
  ctx.fillRect(-18, -12, 36, 28);
  ctx.fillStyle = "#c5d0c2";
  ctx.font = "500 8px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("U1", 0, 4);
  if (inspection?.detections.some((d) => d.label.includes("bridge"))) {
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 18);
    ctx.lineTo(28, 18);
    ctx.stroke();
  }
}

function drawTile(
  ctx: CanvasRenderingContext2D,
  pw: number,
  ph: number,
  seed: number,
  inspection: Inspection | null,
) {
  const s = Math.min(pw, ph) * 0.72;
  ctx.fillStyle = "#d8d2c4";
  ctx.fillRect(-s / 2, -s / 2, s, s);
  for (let i = 0; i < 40; i++) {
    const x = -s / 2 + hash(seed + i) * s;
    const y = -s / 2 + hash(seed + i * 9) * s;
    ctx.fillStyle = `rgba(120, 110, 95, ${0.04 + hash(i) * 0.08})`;
    ctx.beginPath();
    ctx.arc(x, y, 8 + hash(i * 3) * 14, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(14,16,15,0.18)";
  ctx.strokeRect(-s / 2, -s / 2, s, s);
  if (inspection?.detections.some((d) => d.label.includes("crack"))) {
    ctx.strokeStyle = "rgba(40, 36, 32, 0.7)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-s * 0.1, -s * 0.3);
    ctx.lineTo(0, -s * 0.02);
    ctx.lineTo(s * 0.22, s * 0.18);
    ctx.stroke();
  }
  if (inspection?.detections.some((d) => d.label.includes("chip"))) {
    ctx.fillStyle = "#121511";
    ctx.beginPath();
    ctx.moveTo(s / 2, -s / 2);
    ctx.lineTo(s / 2 - 16, -s / 2);
    ctx.lineTo(s / 2, -s / 2 + 14);
    ctx.fill();
  }
}

function drawCarton(
  ctx: CanvasRenderingContext2D,
  pw: number,
  ph: number,
  seed: number,
  inspection: Inspection | null,
) {
  const w = pw * 0.8;
  const h = ph * 0.56;
  ctx.fillStyle = "#c4a574";
  ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = "#efe7d6";
  ctx.fillRect(-w / 2 + 10, -h / 2 + 10, w * 0.42, h * 0.38);
  ctx.fillStyle = "#3d453c";
  ctx.font = "600 12px 'IBM Plex Sans', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("LOT A4", -w / 2 + 16, -h / 2 + 28);
  const badCode = inspection?.detections.some((d) => d.label.includes("barcode"));
  const x0 = w / 2 - 88;
  const y0 = h / 2 - 36;
  for (let i = 0; i < 28; i++) {
    const bw = 1 + hash(seed + i) * 2.4;
    ctx.fillStyle = badCode && i % 7 === 0 ? "rgba(40,40,40,0.2)" : "#1a1c1a";
    ctx.fillRect(x0 + i * 2.6, y0, bw, 22);
  }
  if (inspection?.detections.some((d) => d.label.includes("register"))) {
    ctx.strokeStyle = "#c45c4a";
    ctx.strokeRect(-w / 2 + 14, -h / 2 + 14, w * 0.42, h * 0.38);
  }
}
