import { nextHardware } from "@/lib/qc/hardware";
import { useEffect, useState } from "react";

export function HardwarePills({ inspecting, algo }: { inspecting: boolean; algo: string }) {
  const [hw, setHw] = useState(() => nextHardware({ inspecting, algo, t: 0 }));

  useEffect(() => {
    const id = window.setInterval(() => {
      setHw(nextHardware({ inspecting, algo, t: Date.now() }));
    }, 800);
    return () => window.clearInterval(id);
  }, [inspecting, algo]);

  return (
    <dl className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      <Stat label="HuskyLens 2" value={`${hw.husky.fps.toFixed(0)} fps`} hint={`${hw.husky.tempC}°C · ${hw.husky.tops} TOPS`} />
      <Stat label="RDK X5 BPU" value={`${hw.rdk.bpuLoad}%`} hint={`${hw.rdk.bpuTops} TOPS · ${hw.rdk.memUsedGb} GB`} />
      <Stat label="CPU load" value={`${hw.rdk.cpuLoad}%`} hint={hw.rdk.cpu} />
      <Stat label="Link" value={`${hw.link.latencyMs} ms`} hint={hw.link.medium} />
    </dl>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-md bg-surface px-3 py-2.5 shadow-[0_0_0_1px_rgb(232_235_228_/_8%)]">
      <dt className="text-[11px] text-muted">{label}</dt>
      <dd className="font-mono text-lg tabular-nums">{value}</dd>
      <p className="truncate text-[11px] text-subtle">{hint}</p>
    </div>
  );
}
