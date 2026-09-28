import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { LiveCamera, type CameraPhase } from "./live-camera";
import { PipelineRail } from "./pipeline-rail";
import { VerdictPanel } from "./verdict-panel";
import { DetectionList } from "./detection-list";
import { HardwarePills } from "./hardware-pills";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { recipeOf } from "@/lib/qc/recipes";
import { yieldOf } from "@/lib/qc/simulate";
import { useQc } from "@/lib/qc/store";
import { diagnoseInspection } from "@/lib/ai/diagnose";
import type { Verdict } from "@/lib/qc/types";
import { Pause, Play, SkipForward } from "lucide-react";

export function StationView() {
  const recipeId = useQc((s) => s.recipeId);
  const current = useQc((s) => s.current);
  const auto = useQc((s) => s.auto);
  const grid = useQc((s) => s.grid);
  const history = useQc((s) => s.history);
  const lot = useQc((s) => s.lot);
  const inspectNext = useQc((s) => s.inspectNext);
  const setAuto = useQc((s) => s.setAuto);
  const setGrid = useQc((s) => s.setGrid);
  const overrideVerdict = useQc((s) => s.overrideVerdict);
  const attachGrok = useQc((s) => s.attachGrok);

  const [phase, setPhase] = useState<CameraPhase>("idle");
  const [diagnosing, setDiagnosing] = useState(false);
  const [diagError, setDiagError] = useState<string | null>(null);
  const recipe = recipeOf(recipeId);

  const lotRows = useMemo(
    () => history.filter((r) => r.lotId === lot.id),
    [history, lot.id],
  );
  const stats = yieldOf(lotRows);
  const busy = phase === "incoming" || phase === "inspecting" || phase === "outgoing";

  const startUnit = useCallback(() => {
    inspectNext();
    setPhase("incoming");
  }, [inspectNext]);

  const onPhaseEnd = useCallback((ended: CameraPhase) => {
    if (ended === "incoming") setPhase("inspecting");
    else if (ended === "inspecting") setPhase("decided");
    else if (ended === "decided") {
      if (useQc.getState().auto) setPhase("outgoing");
    } else if (ended === "outgoing") {
      setPhase("idle");
      if (useQc.getState().auto) {
        window.setTimeout(() => {
          if (!useQc.getState().auto) return;
          useQc.getState().inspectNext();
          setPhase("incoming");
        }, 160);
      }
    }
  }, []);

  const advance = useCallback(() => {
    if (busy) return;
    if (phase === "idle") startUnit();
    else if (phase === "decided") setPhase("outgoing");
  }, [busy, phase, startUnit]);

  const toggleAuto = useCallback(
    (on: boolean) => {
      setAuto(on);
      if (!on) return;
      if (phase === "idle") startUnit();
      if (phase === "decided") setPhase("outgoing");
    },
    [phase, setAuto, startUnit],
  );

  const onOverride = (v: Verdict) => {
    if (!current) return;
    overrideVerdict(current.id, v);
    toast.message(`Marked ${v}`);
  };

  const onDiagnose = async () => {
    if (!current) return;
    setDiagnosing(true);
    setDiagError(null);
    try {
      const result = await diagnoseInspection({
        data: {
          recipeName: recipe.name,
          sku: current.sku,
          sector: recipe.sector,
          verdict: current.verdict,
          score: current.score,
          detections: current.detections.map((d) => ({
            label: d.label,
            confidence: d.confidence,
            kind: d.kind,
            severity: d.severity,
          })),
          measurements: current.measurements,
        },
      });
      attachGrok(current.id, result.text);
      if (result.source === "local") {
        toast.message("On-device diagnosis");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Diagnosis failed.";
      setDiagError(message);
      toast.error(message);
    } finally {
      setDiagnosing(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-wide text-muted uppercase">{recipe.sector}</p>
          <h1 className="text-2xl font-medium tracking-tight">{recipe.name}</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">{recipe.summary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex h-11 items-center gap-2 text-sm text-muted">
            <Switch checked={auto} onCheckedChange={toggleAuto} />
            Auto line
          </label>
          <label className="flex h-11 items-center gap-2 text-sm text-muted">
            <Switch checked={grid} onCheckedChange={setGrid} />
            Grid
          </label>
        </div>
      </div>

      <HardwarePills inspecting={busy} algo={recipe.huskyAlgos[0] ?? "object_recognition"} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
        <div className="space-y-3">
          <LiveCamera
            recipeId={recipeId}
            inspection={current}
            phase={phase}
            onPhaseEnd={onPhaseEnd}
            showGrid={grid}
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={advance} disabled={busy}>
              {phase === "idle" ? (
                <>
                  <SkipForward /> Inspect unit
                </>
              ) : phase === "decided" ? (
                <>
                  <SkipForward /> Next unit
                </>
              ) : (
                <>
                  <Pause /> Inspecting
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => toggleAuto(!auto)}>
              {auto ? <Pause /> : <Play />}
              {auto ? "Stop line" : "Start line"}
            </Button>
            <p className="ml-auto self-center font-mono text-xs text-muted tabular-nums">
              Lot {stats.n}/{lot.targetQty} · {stats.yieldPct.toFixed(1)}% yield
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <VerdictPanel
            inspection={current}
            onOverride={onOverride}
            onDiagnose={onDiagnose}
            diagnosing={diagnosing}
            error={diagError}
          />
          <DetectionList inspection={current} />
        </div>
      </div>

      <PipelineRail phase={phase} />
    </div>
  );
}
