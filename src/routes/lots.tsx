import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { recipeOf } from "@/lib/qc/recipes";
import { defectPareto, yieldOf } from "@/lib/qc/simulate";
import { useQc } from "@/lib/qc/store";
import { formatPct } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/lots")({ component: LotsPage });

function LotsPage() {
  const history = useQc((s) => s.history);
  const lots = useQc((s) => s.lots);
  const live = useQc((s) => s.lot);
  const startLot = useQc((s) => s.startLot);

  const allLots = [live, ...lots.filter((l) => l.id !== live.id)];
  const selected = allLots[0];
  const stats = yieldOf(history);
  const pareto = defectPareto(history).slice(0, 6);

  const trend = history.slice(-48).map((r, i) => ({
    i: i + 1,
    score: r.score,
    fail: r.verdict === "fail" ? 1 : 0,
  }));

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-wide text-muted uppercase">Genealogy</p>
          <h1 className="text-2xl font-medium tracking-tight">Lots & yield</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Closed lots stay on this board. Live units from the station append as you run.
          </p>
        </div>
        <Button variant="outline" onClick={startLot}>
          Close lot & open next
        </Button>
      </header>

      <dl className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Kpi label="Inspected" value={String(stats.n)} />
        <Kpi label="Yield" value={formatPct(stats.yieldPct, 1)} />
        <Kpi label="Fail" value={String(stats.fail)} />
        <Kpi label="Hold" value={String(stats.hold)} />
      </dl>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <CardHeader>
            <div>
              <CardTitle>Score by unit</CardTitle>
              <CardHint>Last 48 units across lots</CardHint>
            </div>
          </CardHeader>
          <div className="h-56">
            {trend.length === 0 ? (
              <p className="text-sm text-muted">No units in this lot yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(232,235,228,0.08)" vertical={false} />
                  <XAxis dataKey="i" stroke="#8b9288" fontSize={11} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#8b9288" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#1e221f",
                      border: "1px solid rgba(232,235,228,0.12)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#c5d0c2"
                    dot={false}
                    strokeWidth={1.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
        <Card className="p-4">
          <CardHeader>
            <div>
              <CardTitle>Defect Pareto</CardTitle>
              <CardHint>Counts from HuskyLens defect blocks</CardHint>
            </div>
          </CardHeader>
          <div className="h-56">
            {pareto.length === 0 ? (
              <p className="text-sm text-muted">No defects recorded.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pareto}
                  layout="vertical"
                  margin={{ top: 8, right: 12, left: 8, bottom: 0 }}
                >
                  <CartesianGrid stroke="rgba(232,235,228,0.08)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} stroke="#8b9288" fontSize={11} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={108}
                    stroke="#8b9288"
                    fontSize={11}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1e221f",
                      border: "1px solid rgba(232,235,228,0.12)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="count" fill="#c45c4a" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-xl text-left text-sm">
            <thead className="border-b border-border text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Lot</th>
                <th className="px-4 py-3 font-medium">Recipe</th>
                <th className="px-4 py-3 font-medium">Units</th>
                <th className="px-4 py-3 font-medium">Yield</th>
                <th className="px-4 py-3 font-medium">State</th>
              </tr>
            </thead>
            <tbody>
              {allLots.map((lot) => {
                const r = yieldOf(history.filter((x) => x.lotId === lot.id));
                const recipe = recipeOf(lot.recipeId);
                return (
                  <tr key={lot.id} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-3">
                      <p>{lot.name}</p>
                      <p className="font-mono text-[11px] text-subtle">{lot.sku}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{recipe.name}</td>
                    <td className="px-4 py-3 font-mono tabular-nums">{r.n}</td>
                    <td className="px-4 py-3 font-mono tabular-nums">{formatPct(r.yieldPct, 1)}</td>
                    <td className="px-4 py-3">
                      <Badge tone={lot.closedAt ? "muted" : "pass"}>
                        {lot.closedAt ? "Closed" : "Open"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface px-3 py-3 shadow-[0_0_0_1px_rgb(232_235_228_/_8%)]">
      <dt className="text-[11px] text-muted">{label}</dt>
      <dd className="font-mono text-xl tabular-nums">{value}</dd>
    </div>
  );
}
