import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { algoLabel } from "@/lib/qc/hardware";
import type { Inspection } from "@/lib/qc/types";

export function DetectionList({ inspection }: { inspection: Inspection | null }) {
  if (!inspection) {
    return (
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Detections</CardTitle>
            <CardHint>Blocks from HuskyLens 2</CardHint>
          </div>
        </CardHeader>
        <p className="text-sm text-muted">Waiting for a frame.</p>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Detections</CardTitle>
          <CardHint>
            {inspection.detections.length} block
            {inspection.detections.length === 1 ? "" : "s"} this cycle
          </CardHint>
        </div>
      </CardHeader>
      <ul className="space-y-2">
        {inspection.detections.map((d) => (
          <li key={d.id} className="flex items-center justify-between gap-3 text-sm">
            <div className="min-w-0">
              <p className="truncate">{d.label}</p>
              <p className="font-mono text-[11px] text-subtle">{d.kind}</p>
            </div>
            <div className="flex items-center gap-2">
              {d.severity ? (
                <Badge tone={d.severity === "critical" ? "fail" : d.severity === "major" ? "hold" : "muted"}>
                  {d.severity}
                </Badge>
              ) : null}
              <span className="font-mono text-xs tabular-nums text-muted">
                {(d.confidence * 100).toFixed(0)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-subtle">
        Algos: {inspection.huskyAlgos.map(algoLabel).join(" · ")}
      </p>
    </Card>
  );
}
