import type { HuskyAlgo, RecipeId } from "./types";

export type Recipe = {
  id: RecipeId;
  name: string;
  sector: string;
  sku: string;
  summary: string;
  inspectMs: number;
  failRate: number;
  huskyAlgos: HuskyAlgo[];
  rdkRole: string;
  specs: { name: string; unit: string; specMin?: number; specMax?: number; target?: number }[];
  defects: { name: string; severity: "minor" | "major" | "critical"; weight: number }[];
  sampling: string;
};

export const RECIPES: Record<RecipeId, Recipe> = {
  textile: {
    id: "textile",
    name: "Woven fabric",
    sector: "Textiles",
    sku: "TX-WOV-240",
    summary:
      "Grey-cloth inspection for holes, stains, slubs and shade drift on a 1.2 m loom-end table.",
    inspectMs: 420,
    failRate: 0.09,
    huskyAlgos: ["instance_segmentation", "color_recognition", "object_classification"],
    rdkRole: "Shade ΔE vs master, defect area vs GSM, sampling skip-lot.",
    specs: [
      { name: "Shade ΔE", unit: "ΔE", specMax: 1.8, target: 0.4 },
      { name: "Defect area", unit: "mm²", specMax: 12, target: 0 },
      { name: "Ends/inch", unit: "epi", specMin: 58, specMax: 62, target: 60 },
    ],
    defects: [
      { name: "Weft stain", severity: "major", weight: 0.35 },
      { name: "Pin hole", severity: "critical", weight: 0.2 },
      { name: "Slub", severity: "minor", weight: 0.25 },
      { name: "Shade band", severity: "major", weight: 0.2 },
    ],
    sampling: "100% visual, AQL 1.5 on shade",
  },
  packaging: {
    id: "packaging",
    name: "Bottled FMCG",
    sector: "Food & beverage",
    sku: "PK-BTL-500",
    summary: "Fill level, cap presence, label skew and seal integrity on a 500 ml PET line.",
    inspectMs: 280,
    failRate: 0.06,
    huskyAlgos: ["object_recognition", "ocr", "color_recognition", "barcode"],
    rdkRole: "Fill pixel-to-ml calibration, reject-gate GPIO, lot genealogy.",
    specs: [
      { name: "Fill volume", unit: "ml", specMin: 495, specMax: 510, target: 500 },
      { name: "Label skew", unit: "°", specMax: 1.5, target: 0 },
      { name: "Cap torque proxy", unit: "px gap", specMax: 4, target: 1 },
    ],
    defects: [
      { name: "Underfill", severity: "critical", weight: 0.3 },
      { name: "Missing cap", severity: "critical", weight: 0.15 },
      { name: "Label skew", severity: "major", weight: 0.35 },
      { name: "Seal wrinkle", severity: "minor", weight: 0.2 },
    ],
    sampling: "100% fill + cap, 1/10 OCR audit",
  },
  metal: {
    id: "metal",
    name: "Stamped bracket",
    sector: "Metal fabrication",
    sku: "MT-BRK-08",
    summary: "Hole presence, burrs, dent and overall length on a progressive-die bracket.",
    inspectMs: 360,
    failRate: 0.07,
    huskyAlgos: ["object_recognition", "instance_segmentation", "object_classification"],
    rdkRole: "Pixel-to-mm homography, hole-count policy, CAN reject to press.",
    specs: [
      { name: "Overall length", unit: "mm", specMin: 79.6, specMax: 80.4, target: 80 },
      { name: "Hole count", unit: "ea", specMin: 4, specMax: 4, target: 4 },
      { name: "Burr height proxy", unit: "px", specMax: 6, target: 1 },
    ],
    defects: [
      { name: "Missing hole", severity: "critical", weight: 0.25 },
      { name: "Edge burr", severity: "major", weight: 0.3 },
      { name: "Face dent", severity: "major", weight: 0.25 },
      { name: "Length OOS", severity: "critical", weight: 0.2 },
    ],
    sampling: "100% holes, 5-pc/hr CMM audit",
  },
  electronics: {
    id: "electronics",
    name: "SMT board",
    sector: "Electronics",
    sku: "EL-PCB-12A",
    summary: "Missing parts, polarity, solder bridges on a 2-layer MSME control board.",
    inspectMs: 510,
    failRate: 0.05,
    huskyAlgos: ["object_classification", "object_recognition", "self_learning"],
    rdkRole: "BOM overlay, polarity map, SPI/AOI fusion, hold for rework.",
    specs: [
      { name: "Placed parts", unit: "ea", specMin: 18, specMax: 18, target: 18 },
      { name: "Solder bridge count", unit: "ea", specMax: 0, target: 0 },
      { name: "Polarity errors", unit: "ea", specMax: 0, target: 0 },
    ],
    defects: [
      { name: "Missing 0805", severity: "critical", weight: 0.3 },
      { name: "IC polarity", severity: "critical", weight: 0.2 },
      { name: "Solder bridge", severity: "major", weight: 0.3 },
      { name: "Tombstone", severity: "major", weight: 0.2 },
    ],
    sampling: "100% first-article, then 100% AOI",
  },
  ceramics: {
    id: "ceramics",
    name: "Glazed tile",
    sector: "Ceramics",
    sku: "CR-TIL-300",
    summary: "Cracks, glaze pinholes, edge chips and shade on 300 mm wall tile.",
    inspectMs: 390,
    failRate: 0.1,
    huskyAlgos: ["instance_segmentation", "color_recognition", "object_classification"],
    rdkRole: "Crack length vs class, shade lot grouping, kiln feedback.",
    specs: [
      { name: "Crack length", unit: "mm", specMax: 0, target: 0 },
      { name: "Shade ΔE", unit: "ΔE", specMax: 1.2, target: 0.3 },
      { name: "Edge chip area", unit: "mm²", specMax: 4, target: 0 },
    ],
    defects: [
      { name: "Hairline crack", severity: "critical", weight: 0.3 },
      { name: "Glaze pinhole", severity: "minor", weight: 0.25 },
      { name: "Edge chip", severity: "major", weight: 0.25 },
      { name: "Shade drift", severity: "major", weight: 0.2 },
    ],
    sampling: "100% face, 10% edge gauge",
  },
  print: {
    id: "print",
    name: "Carton print",
    sector: "Packaging print",
    sku: "PR-CTN-A4",
    summary: "Registration, barcode grade, missing print on corrugated shipper.",
    inspectMs: 310,
    failRate: 0.08,
    huskyAlgos: ["ocr", "barcode", "qr", "object_recognition"],
    rdkRole: "GS1 grade, colour-to-colour register, reprint ticket.",
    specs: [
      { name: "Register error", unit: "mm", specMax: 0.4, target: 0.1 },
      { name: "Barcode grade", unit: "ISO", specMin: 3, specMax: 4, target: 3.5 },
      { name: "OCR match", unit: "%", specMin: 98, specMax: 100, target: 100 },
    ],
    defects: [
      { name: "Misregister", severity: "major", weight: 0.3 },
      { name: "Unreadable barcode", severity: "critical", weight: 0.25 },
      { name: "Ink void", severity: "major", weight: 0.25 },
      { name: "Wrong batch text", severity: "critical", weight: 0.2 },
    ],
    sampling: "100% barcode, 1/20 register",
  },
};

export const RECIPE_LIST = Object.values(RECIPES);

export function recipeOf(id: RecipeId) {
  return RECIPES[id];
}
