import { useEffect, useRef } from "react";
import { drawScene } from "@/lib/qc/draw-scene";
import type { Inspection, RecipeId } from "@/lib/qc/types";

export type CameraPhase = "idle" | "incoming" | "inspecting" | "decided" | "outgoing";

const DUR: Record<CameraPhase, number> = {
  idle: 0,
  incoming: 700,
  inspecting: 1100,
  decided: 900,
  outgoing: 550,
};

export function LiveCamera({
  recipeId,
  inspection,
  phase,
  onPhaseEnd,
  showGrid,
}: {
  recipeId: RecipeId;
  inspection: Inspection | null;
  phase: CameraPhase;
  onPhaseEnd: (phase: CameraPhase) => void;
  showGrid: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(phase);
  const inspectionRef = useRef(inspection);
  const recipeRef = useRef(recipeId);
  const gridRef = useRef(showGrid);
  const onEndRef = useRef(onPhaseEnd);
  const startedAt = useRef(performance.now());
  const firedKey = useRef("");

  phaseRef.current = phase;
  inspectionRef.current = inspection;
  recipeRef.current = recipeId;
  gridRef.current = showGrid;
  onEndRef.current = onPhaseEnd;

  useEffect(() => {
    startedAt.current = performance.now();
    firedKey.current = "";
  }, [phase, inspection?.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = () => {
      const parent = canvas.parentElement;
      const cssW = parent?.clientWidth ?? 640;
      const cssH = Math.round(cssW * 0.75);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const now = performance.now();
      const p = phaseRef.current;
      const dur = reduced ? 80 : DUR[p];
      const t = dur === 0 ? 1 : Math.min(1, (now - startedAt.current) / dur);

      drawScene(ctx, {
        w: cssW,
        h: cssH,
        recipeId: recipeRef.current,
        inspection: inspectionRef.current,
        phase: p,
        t,
        showGrid: gridRef.current,
        now,
        reduced,
      });

      if (p !== "idle" && t >= 1) {
        const key = `${p}:${inspectionRef.current?.id ?? "none"}`;
        if (firedKey.current !== key) {
          firedKey.current = key;
          onEndRef.current(p);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="overflow-hidden rounded-lg bg-elevated shadow-[0_0_0_1px_rgb(232_235_228_/_8%)]">
      <canvas ref={canvasRef} className="block w-full" aria-label="HuskyLens 2 live view" />
    </div>
  );
}
