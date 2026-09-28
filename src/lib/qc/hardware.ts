export type HardwareSnapshot = {
  husky: {
    connected: boolean;
    model: string;
    soc: string;
    tops: number;
    fps: number;
    tempC: number;
    algo: string;
    resolution: string;
  };
  rdk: {
    connected: boolean;
    board: string;
    cpu: string;
    ramGb: number;
    bpuTops: number;
    cpuLoad: number;
    bpuLoad: number;
    memUsedGb: number;
    os: string;
  };
  link: {
    medium: string;
    bitrate: string;
    latencyMs: number;
    drops: number;
  };
};

const ALGO_LABEL: Record<string, string> = {
  object_recognition: "Object recognition",
  object_classification: "Classification",
  self_learning: "Self-learning",
  instance_segmentation: "Instance seg.",
  color_recognition: "Color",
  ocr: "OCR",
  barcode: "Barcode",
  qr: "QR",
  object_tracking: "Tracking",
};

export function algoLabel(id: string) {
  return ALGO_LABEL[id] ?? id;
}

export function nextHardware(opts: {
  inspecting: boolean;
  algo: string;
  t: number;
}): HardwareSnapshot {
  const wave = (amp: number, period: number, offset = 0) =>
    amp * Math.sin((opts.t / period) * Math.PI * 2 + offset);
  const inspecting = opts.inspecting;
  return {
    husky: {
      connected: true,
      model: "HUSKYLENS 2",
      soc: "Kendryte K230",
      tops: 6,
      fps: Number((29.4 + wave(1.6, 1800)).toFixed(1)),
      tempC: Number((44.2 + wave(1.8, 9000) + (inspecting ? 1.4 : 0)).toFixed(1)),
      algo: algoLabel(opts.algo),
      resolution: "640×480 @ 60",
    },
    rdk: {
      connected: true,
      board: "RDK X5 8GB",
      cpu: "8× Cortex-A55 1.5 GHz",
      ramGb: 8,
      bpuTops: 10,
      cpuLoad: Number((18 + wave(6, 3200) + (inspecting ? 22 : 0)).toFixed(0)),
      bpuLoad: Number((12 + wave(8, 2400) + (inspecting ? 48 : 4)).toFixed(0)),
      memUsedGb: Number((2.4 + wave(0.15, 7000) + (inspecting ? 0.4 : 0)).toFixed(2)),
      os: "Ubuntu 22.04",
    },
    link: {
      medium: "USB 3.0 + UART 115200",
      bitrate: inspecting ? "18.4 MB/s" : "2.1 MB/s",
      latencyMs: Number((6.2 + wave(1.1, 1400) + (inspecting ? 1.8 : 0)).toFixed(1)),
      drops: 0,
    },
  };
}

export const PIPELINE_STAGES = [
  {
    id: "capture",
    title: "Capture",
    device: "GC2093 2 MP",
    detail: "60 fps, fill lights, optional microscope lens",
  },
  {
    id: "edge",
    title: "Edge vision",
    device: "HuskyLens 2 · 6 TOPS",
    detail: "YOLO, classify, instance seg, OCR, barcode, self-learn",
  },
  {
    id: "link",
    title: "Transport",
    device: "USB 3.0 / Gravity UART",
    detail: "Blocks, arrows, MCP semantic frames",
  },
  {
    id: "fusion",
    title: "Fusion & policy",
    device: "RDK X5 BPU · 10 TOPS",
    detail: "Homography, specs, SPC, GPIO / CAN reject",
  },
  {
    id: "verdict",
    title: "Verdict",
    device: "LineSight",
    detail: "Pass / fail / hold, lot genealogy, operator",
  },
  {
    id: "reason",
    title: "Reasoning",
    device: "Grok MCP",
    detail: "Cause, CAPA, MSME-scale process note",
  },
] as const;
