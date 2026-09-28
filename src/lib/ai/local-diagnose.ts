import type { DiagnosePayload, Measurement } from "@/lib/qc/types";

function oos(m: Measurement) {
  if (m.specMin != null && m.value < m.specMin) return "low";
  if (m.specMax != null && m.value > m.specMax) return "high";
  return null;
}

export function localDiagnose(data: DiagnosePayload) {
  const defects = data.detections.filter((d) => d.kind === "defect" || d.severity);
  const bad = data.measurements.filter((m) => oos(m));
  const top = defects[0];

  let cause = "No defect blocks; unit is within spec on this frame.";
  let process = "Keep the current recipe. Spot-audit the next 5 units.";
  let operator = "Pass and continue. Do not stop the line.";
  let capa = "No immediate CAPA. File the score in the lot record.";

  if (data.verdict === "fail" && defects.length === 0 && bad.length === 0) {
    cause =
      "Operator overrode to fail. HuskyLens 2 did not raise a defect block on this frame — treat as a process or handling call, not a model miss until proven.";
    process = "Second-eye the unit off-line. If it is truly bad, teach the defect class.";
    operator = "Keep the fail. Do not reverse without a gold comparison.";
    capa = "If this repeats, add a station SOP for override reasons.";
  } else if (data.verdict === "fail" || defects.length || bad.length) {
    if (top?.label.toLowerCase().includes("hole") || top?.label.toLowerCase().includes("missing")) {
      cause = `${top.label} at ${(top.confidence * 100).toFixed(0)}% on ${data.sku}. Typical of die wear, a missed pick, or a shifted nest.`;
      process = "Stop and check the last tool hit / feeder. Confirm nest location vs the gold teach set.";
      operator = "Reject the unit. Quarantine the last 10. Call the setter before restarting.";
      capa = "Add a hole-count hard gate on RDK X5. Retrain HuskyLens 2 self-learn with 8 gold + 8 miss samples.";
    } else if (top?.label.toLowerCase().includes("stain") || top?.label.toLowerCase().includes("shade")) {
      cause = `${top.label} — shade or soil against the master. Dye lot or loom oil is the usual MSME cause.`;
      process = "Hold the roll. Compare ΔE to the gold swatch under the same fill lights.";
      operator = "Mark the defect with a clip. Do not mix into the packed lot.";
      capa = "Tighten Shade ΔE on the recipe. Recalibrate HuskyLens color model at shift start.";
    } else if (top?.label.toLowerCase().includes("fill") || top?.label.toLowerCase().includes("cap")) {
      cause = `${top.label}. Filler drift or cap chute starve — not a camera false reject if fill pixels are OOS.`;
      process = "Check nozzle height and cap bowl. Run 3 empties through as a sanity check.";
      operator = "Reject. Do not recap on the line unless SOP allows a rework station.";
      capa = "RDK X5 GPIO already pulses reject — add a 3-fail-in-10 stop rule.";
    } else if (top?.label.toLowerCase().includes("barcode") || top?.label.toLowerCase().includes("register") || top?.label.toLowerCase().includes("ocr")) {
      cause = `${top.label}. Print register or ink void; GS1 grade will fail downstream even if the carton looks fine.`;
      process = "Stop the printer. Check plate lock-up and anilox. Reprint the batch code.";
      operator = "Hold the bundle. Do not ship unreadable codes.";
      capa = "Make barcode grade a critical gate. Keep a gold print on the teach set.";
    } else if (top?.label.toLowerCase().includes("crack") || top?.label.toLowerCase().includes("chip")) {
      cause = `${top.label} on ceramic/glass. Handling after kiln or edge contact on the belt.`;
      process = "Slow the belt. Inspect transfer fingers. Sample the last kiln car.";
      operator = "Fail and set aside for grind/rework if the shop allows seconds.";
      capa = "Add edge ROI on instance segmentation. Teach chips as a separate class.";
    } else if (top?.label.toLowerCase().includes("solder") || top?.label.toLowerCase().includes("polarity") || top?.label.toLowerCase().includes("0805") || top?.label.toLowerCase().includes("tombstone")) {
      cause = `${top.label} on SMT. Paste volume, placement offset or a flipped reel.`;
      process = "Pause the placer. Check the reel against BOM. Re-run first article.";
      operator = "Hold for rework. Do not pass a polarity fail.";
      capa = "Lock polarity on the RDK overlay. Add 8 gold boards to the self-learn set.";
    } else if (top) {
      cause = `${top.label} (${top.severity ?? "unspecified"}, ${(top.confidence * 100).toFixed(0)}%) on ${data.recipeName}.`;
      process = "Compare to the gold teach sample. If new, add it to the defect class before changing the process.";
      operator = "Fail or hold per SOP. Photograph the unit on the HuskyLens 2 stills app.";
      capa = "Promote this class in the K230 self-learning head once 8 samples exist.";
    }
    if (bad[0]) {
      const m = bad[0];
      const dir = oos(m);
      cause += ` Spec ${m.name} is ${dir}: ${m.value} ${m.unit}.`;
    }
  } else if (data.verdict === "hold") {
    cause = "Model confidence or a borderline measurement triggered hold, not a hard fail.";
    process = "Second-eye the frame. If gold, teach as gold; if not, fail it.";
    operator = "Do not pack. Park on the hold rail.";
    capa = "Raise the confidence threshold only after the teach set is balanced.";
  }

  return [
    `Cause  ${cause}`,
    `Process  ${process}`,
    `Operator  ${operator}`,
    `CAPA  ${capa}`,
    `Note  On-device policy (Grok quota unavailable on this key).`,
  ].join("\n");
}
