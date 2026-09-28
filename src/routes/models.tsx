import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { recipeOf } from "@/lib/qc/recipes";
import { makeTeachSample } from "@/lib/qc/simulate";
import { useQc } from "@/lib/qc/store";
import { toast } from "sonner";

export const Route = createFileRoute("/models")({ component: ModelsPage });

function ModelsPage() {
  const recipeId = useQc((s) => s.recipeId);
  const current = useQc((s) => s.current);
  const history = useQc((s) => s.history);
  const samples = useQc((s) => s.samples);
  const addSample = useQc((s) => s.addSample);
  const removeSample = useQc((s) => s.removeSample);
  const recipe = recipeOf(recipeId);
  const last = current ?? history.filter((h) => h.recipeId === recipeId).at(-1);
  const gold = samples.filter((s) => s.label === "gold" && s.recipeId === recipeId);
  const defects = samples.filter((s) => s.label === "defect" && s.recipeId === recipeId);

  const teach = (label: "gold" | "defect") => {
    if (!last) {
      toast.error("Inspect a unit on the station first.");
      return;
    }
    addSample(makeTeachSample(last, label, last.id));
    toast.message(label === "gold" ? "Gold sample stored" : "Defect sample stored");
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs tracking-wide text-muted uppercase">HuskyLens 2</p>
        <h1 className="text-2xl font-medium tracking-tight">Self-learning classifier</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Teach gold vs defect from live units. Samples stay on the RDK X5 and deploy to the
          K230 self-learning head — no GPU workstation required.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <p className="text-xs text-muted">Active recipe</p>
          <p className="mt-1 font-medium">{recipe.name}</p>
          <p className="font-mono text-xs text-subtle">{recipe.sku}</p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Gold</p>
          <p className="mt-1 font-mono text-2xl tabular-nums">{gold.length}</p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Defect</p>
          <p className="mt-1 font-mono text-2xl tabular-nums">{defects.length}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Last captured unit</CardTitle>
            <CardHint>
              {last
                ? `${last.sku} · unit ${String(last.unitIndex).padStart(4, "0")}`
                : "Nothing captured yet"}
            </CardHint>
          </div>
          {last ? (
            <Badge tone={last.verdict === "pass" ? "pass" : last.verdict === "fail" ? "fail" : "hold"}>
              {last.verdict}
            </Badge>
          ) : null}
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => teach("gold")} disabled={!last}>
            Teach as gold
          </Button>
          <Button variant="outline" onClick={() => teach("defect")} disabled={!last}>
            Teach as defect
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Sample set</CardTitle>
            <CardHint>Minimum 8 gold + 8 defect before a deploy is trustworthy</CardHint>
          </div>
        </CardHeader>
        {samples.filter((s) => s.recipeId === recipeId).length === 0 ? (
          <p className="text-sm text-muted">No samples for this recipe. Run the station, then teach.</p>
        ) : (
          <ul className="space-y-2">
            {samples
              .filter((s) => s.recipeId === recipeId)
              .map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 text-sm">
                  <div>
                    <p className="capitalize">{s.label}</p>
                    <p className="font-mono text-[11px] text-subtle">
                      {s.defectName ?? "master"} · {s.thumb}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeSample(s.id)}>
                    Remove
                  </Button>
                </li>
              ))}
          </ul>
        )}
        <Button
          variant="outline"
          className="mt-4"
          disabled={gold.length < 4 || defects.length < 4}
          onClick={() => toast.message("Deploy queued to HuskyLens 2 (demo).")}
        >
          Deploy to K230
        </Button>
      </Card>
    </div>
  );
}
