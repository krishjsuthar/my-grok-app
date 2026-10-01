import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { PIPELINE_STAGES } from "@/lib/qc/hardware";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/pipeline")({ component: PipelinePage });

function PipelinePage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-wide text-muted uppercase">Architecture</p>
          <h1 className="text-2xl font-medium tracking-tight">Edge pipeline</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            HuskyLens 2 sees the unit. RDK X5 8GB owns policy, specs and the reject gate. LineSight
            is the operator console — this preview runs a faithful demo of that chain.
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/LineSight-Pipeline-Synthesis.pdf" download>
            <Download />
            Synthesis report
          </a>
        </Button>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="p-5">
          <p className="font-mono text-[11px] tracking-wider text-subtle">SENSOR</p>
          <h2 className="mt-1 text-lg font-medium">HuskyLens 2</h2>
          <p className="mt-1 text-sm text-muted">
            DFRobot SEN0638. Kendryte K230, 6 TOPS, 1 GB LPDDR4, GC2093 2 MP at 60 fps, 2.4 in
            640×480 touch panel.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            <li>20+ onboard models, custom YOLO deploy</li>
            <li>Self-learning classifier for gold vs defect</li>
            <li>MCP server for semantic frames to an LLM</li>
            <li>UART / I2C Gravity plus USB-C</li>
          </ul>
        </Card>
        <Card className="p-5">
          <p className="font-mono text-[11px] tracking-wider text-subtle">ORCHESTRATOR</p>
          <h2 className="mt-1 text-lg font-medium">RDK X5 8GB</h2>
          <p className="mt-1 text-sm text-muted">
            D-Robotics Sunrise 5. 8× Cortex-A55, Bayes BPU 10 TOPS, 8 GB LPDDR4, Ubuntu 22.04.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            <li>USB 3.0 host for HuskyLens frames</li>
            <li>Pixel-to-mm homography and spec limits</li>
            <li>GPIO / CAN FD reject solenoid</li>
            <li>Optional second MIPI CSI for top + side</li>
          </ul>
        </Card>
      </div>

      <ol className="space-y-3">
        {PIPELINE_STAGES.map((stage, i) => (
          <li key={stage.id}>
            <Card className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-6">
              <span className="font-mono text-xs text-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{stage.title}</p>
                <p className="text-sm text-muted">{stage.detail}</p>
              </div>
              <p className="text-xs text-subtle sm:text-right">{stage.device}</p>
            </Card>
          </li>
        ))}
      </ol>

      <Card className="p-5">
        <CardHeader>
          <div>
            <CardTitle>Why this split for MSME</CardTitle>
            <CardHint>Cost, mix and operators — not a six-figure AOI cell</CardHint>
          </div>
        </CardHeader>
        <Separator className="mb-4" />
        <div className="grid gap-4 md:grid-cols-3">
          <Note
            title="On-device first"
            body="Classification and OCR stay on the K230. No cloud round-trip on every bottle or bracket."
          />
          <Note
            title="Board does policy"
            body="RDK X5 keeps recipes, AQL sampling and the reject pulse. One image, many SKUs."
          />
          <Note
            title="LLM on demand"
            body="Grok reads a fail packet — cause and CAPA — only when an operator asks. Quota stays bounded."
          />
        </div>
      </Card>
    </div>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}
