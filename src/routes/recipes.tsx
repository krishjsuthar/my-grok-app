import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RECIPE_LIST } from "@/lib/qc/recipes";
import { algoLabel } from "@/lib/qc/hardware";
import { useQc } from "@/lib/qc/store";
import type { RecipeId } from "@/lib/qc/types";

export const Route = createFileRoute("/recipes")({ component: RecipesPage });

function RecipesPage() {
  const active = useQc((s) => s.recipeId);
  const setRecipe = useQc((s) => s.setRecipe);
  const navigate = useNavigate();

  const load = (id: RecipeId) => {
    setRecipe(id);
    void navigate({ to: "/" });
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs tracking-wide text-muted uppercase">MSME sectors</p>
        <h1 className="text-2xl font-medium tracking-tight">Inspection recipes</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Each recipe maps HuskyLens 2 models and RDK X5 spec limits to a shop-floor SKU. Load one
          to run it on the station.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {RECIPE_LIST.map((recipe) => {
          const on = recipe.id === active;
          return (
            <Card key={recipe.id} className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted">{recipe.sector}</p>
                  <h2 className="text-lg font-medium">{recipe.name}</h2>
                  <p className="font-mono text-[11px] text-subtle">{recipe.sku}</p>
                </div>
                {on ? <Badge tone="accent">On station</Badge> : null}
              </div>
              <p className="text-sm text-muted">{recipe.summary}</p>
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <dt className="text-subtle">Cycle</dt>
                  <dd className="font-mono">{recipe.inspectMs} ms</dd>
                </div>
                <div>
                  <dt className="text-subtle">Sampling</dt>
                  <dd>{recipe.sampling}</dd>
                </div>
              </dl>
              <p className="text-xs text-muted">
                {recipe.huskyAlgos.map(algoLabel).join(" · ")}
              </p>
              <p className="text-xs text-subtle">{recipe.rdkRole}</p>
              <ul className="flex flex-wrap gap-1.5">
                {recipe.defects.map((d) => (
                  <li key={d.name}>
                    <Badge tone={d.severity === "critical" ? "fail" : d.severity === "major" ? "hold" : "muted"}>
                      {d.name}
                    </Badge>
                  </li>
                ))}
              </ul>
              <Button
                variant={on ? "outline" : "default"}
                className="mt-auto w-full"
                onClick={() => load(recipe.id)}
              >
                {on ? "Open station" : "Load on station"}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
