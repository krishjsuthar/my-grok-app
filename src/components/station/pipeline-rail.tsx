import { PIPELINE_STAGES } from "@/lib/qc/hardware";
import type { CameraPhase } from "./live-camera";
import { cn } from "@/lib/utils";

const ACTIVE: Record<CameraPhase, string[]> = {
  idle: [],
  incoming: ["capture"],
  inspecting: ["capture", "edge", "link"],
  decided: ["capture", "edge", "link", "fusion", "verdict"],
  outgoing: ["verdict"],
};

export function PipelineRail({ phase }: { phase: CameraPhase }) {
  const lit = new Set(ACTIVE[phase]);
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {PIPELINE_STAGES.map((stage, i) => {
        const on = lit.has(stage.id);
        return (
          <li
            key={stage.id}
            className={cn(
              "rounded-md bg-surface px-3 py-2.5 shadow-[0_0_0_1px_rgb(232_235_228_/_8%)] transition-colors duration-200",
              on && "shadow-[0_0_0_1px_rgb(197_208_194_/_35%)]",
            )}
          >
            <p className="font-mono text-[10px] tracking-wider text-subtle">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className={cn("text-sm font-medium", on ? "text-fg" : "text-muted")}>
              {stage.title}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-subtle">{stage.device}</p>
          </li>
        );
      })}
    </ol>
  );
}
