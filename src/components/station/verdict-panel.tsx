import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { measurementStatus } from "@/lib/qc/simulate";
import type { Inspection, Verdict } from "@/lib/qc/types";
import { formatPct } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";

const TONE: Record<Verdict, "pass" | "fail" | "hold"> = {
  pass: "pass",
  fail: "fail",
  hold: "hold",
};

export function VerdictPanel({
  inspection,
  onOverride,
  onDiagnose,
  diagnosing,
  error,
}: {
  inspection: Inspection | null;
  onOverride: (v: Verdict) => void;
  onDiagnose: () => void;
  diagnosing: boolean;
  error?: string | null;
}) {
  if (!inspection) {
    return (
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Verdict</CardTitle>
            <CardHint>Run a unit to fill this pane.</CardHint>
          </div>
        </CardHeader>
        <p className="text-sm text-muted">
          HuskyLens 2 holds the frame. RDK X5 applies specs, then LineSight stamps pass, fail or
          hold.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Unit {String(inspection.unitIndex).padStart(4, "0")}</CardTitle>
          <CardHint className="font-mono">{inspection.sku}</CardHint>
        </div>
        <Badge tone={TONE[inspection.verdict]} className="uppercase">
          {inspection.verdict}
        </Badge>
      </CardHeader>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted">Quality score</p>
          <p className="font-mono text-3xl font-medium tracking-tight tabular-nums">
            {formatPct(inspection.score, 1)}
          </p>
        </div>
        <p className="font-mono text-xs text-muted tabular-nums">{inspection.cycleMs} ms</p>
      </div>

      <ul className="mb-4 space-y-2">
        {inspection.measurements.map((m) => {
          const st = measurementStatus(m);
          return (
            <li key={m.name} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-muted">{m.name}</span>
              <span
                className={
                  st === "fail" ? "font-mono text-fail tabular-nums" : "font-mono tabular-nums"
                }
              >
                {m.value} {m.unit}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="grid grid-cols-3 gap-2">
        <Button variant="pass" size="sm" onClick={() => onOverride("pass")}>
          Pass
        </Button>
        <Button variant="hold" size="sm" onClick={() => onOverride("hold")}>
          Hold
        </Button>
        <Button variant="fail" size="sm" onClick={() => onOverride("fail")}>
          Fail
        </Button>
      </div>

      <Button
        variant="outline"
        className="mt-3 w-full"
        onClick={onDiagnose}
        disabled={diagnosing}
        type="button"
      >
        <BrainCircuit className="size-4" />
        {diagnosing ? "Diagnosing…" : "Diagnose with Grok"}
      </Button>

      {error ? <p className="mt-3 text-xs text-fail">{error}</p> : null}

      {inspection.grokNote ? (
        <p className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-muted">
          {inspection.grokNote}
        </p>
      ) : null}
    </Card>
  );
}
