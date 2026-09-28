import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { localDiagnose } from "./local-diagnose";

const Input = z.object({
  recipeName: z.string(),
  sku: z.string(),
  sector: z.string(),
  verdict: z.enum(["pass", "fail", "hold"]),
  score: z.number(),
  detections: z.array(
    z.object({
      label: z.string(),
      confidence: z.number(),
      kind: z.string(),
      severity: z.string().optional(),
    }),
  ),
  measurements: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
      unit: z.string(),
      specMin: z.number().optional(),
      specMax: z.number().optional(),
      target: z.number().optional(),
    }),
  ),
});

export const diagnoseInspection = createServerFn({ method: "POST" })
  .validator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: true as const, text: localDiagnose(data), source: "local" as const };
    }

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 500,
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content:
                "You are a shop-floor quality engineer for Indian/global MSME factories. Hardware: DFRobot HuskyLens 2 (Kendryte K230, 6 TOPS) on a D-Robotics RDK X5 8GB (8×A55, 10 TOPS BPU). Give concise, practical diagnosis. No markdown headings. Use short labeled lines: Cause, Process, Operator, CAPA. Assume limited metrology, mixed SKUs, and operator-run lines. Do not invent measurements that were not provided.",
            },
            {
              role: "user",
              content: JSON.stringify(data),
            },
          ],
        }),
      });

      if (res.ok) {
        const body = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = body.choices?.[0]?.message?.content?.trim() ?? "";
        if (text) return { ok: true as const, text, source: "grok" as const };
      }
    } catch {
      /* fall through to on-device note */
    }

    return { ok: true as const, text: localDiagnose(data), source: "local" as const };
  });
