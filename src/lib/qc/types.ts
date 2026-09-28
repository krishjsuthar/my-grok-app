export const RECIPE_IDS = [
  "textile",
  "packaging",
  "metal",
  "electronics",
  "ceramics",
  "print",
] as const;

export type RecipeId = (typeof RECIPE_IDS)[number];

export type Verdict = "pass" | "fail" | "hold";

export type DefectSeverity = "minor" | "major" | "critical";

export type DetectionKind = "object" | "defect" | "ocr" | "color" | "barcode" | "dimension";

export type HuskyAlgo =
  | "object_recognition"
  | "object_classification"
  | "self_learning"
  | "instance_segmentation"
  | "color_recognition"
  | "ocr"
  | "barcode"
  | "qr"
  | "object_tracking";

export type Detection = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  confidence: number;
  kind: DetectionKind;
  severity?: DefectSeverity;
};

export type Measurement = {
  name: string;
  value: number;
  unit: string;
  specMin?: number;
  specMax?: number;
  target?: number;
};

export type Inspection = {
  id: string;
  lotId: string;
  recipeId: RecipeId;
  sku: string;
  unitIndex: number;
  timestamp: number;
  verdict: Verdict;
  score: number;
  detections: Detection[];
  measurements: Measurement[];
  cycleMs: number;
  huskyAlgos: HuskyAlgo[];
  notes?: string;
  grokNote?: string;
};

export type Lot = {
  id: string;
  sku: string;
  recipeId: RecipeId;
  name: string;
  openedAt: number;
  closedAt?: number;
  targetQty: number;
};

export type TeachSample = {
  id: string;
  recipeId: RecipeId;
  label: "gold" | "defect";
  defectName?: string;
  capturedAt: number;
  thumb: string;
};

export type DiagnosePayload = {
  recipeName: string;
  sku: string;
  verdict: Verdict;
  score: number;
  detections: { label: string; confidence: number; kind: string; severity?: string }[];
  measurements: Measurement[];
  sector: string;
};
