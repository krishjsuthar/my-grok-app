import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnose-NNTp5RWi.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = object({
	recipeName: string(),
	sku: string(),
	sector: string(),
	verdict: _enum([
		"pass",
		"fail",
		"hold"
	]),
	score: number(),
	detections: array(object({
		label: string(),
		confidence: number(),
		kind: string(),
		severity: string().optional()
	})),
	measurements: array(object({
		name: string(),
		value: number(),
		unit: string(),
		specMin: number().optional(),
		specMax: number().optional(),
		target: number().optional()
	}))
});
var diagnoseInspection_createServerFn_handler = createServerRpc({
	id: "59a2fcc0e31cd48435923d36a45d57aaf12c3fa775a2e96b5eecd6b958fd7b9a",
	name: "diagnoseInspection",
	filename: "src/lib/ai/diagnose.ts"
}, (opts) => diagnoseInspection.__executeServer(opts));
var diagnoseInspection = createServerFn({ method: "POST" }).validator((data) => Input.parse(data)).handler(diagnoseInspection_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI diagnosis is not available in this environment."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 500,
			temperature: .3,
			messages: [{
				role: "system",
				content: "You are a shop-floor quality engineer for Indian/global MSME factories. Hardware: DFRobot HuskyLens 2 (Kendryte K230, 6 TOPS) on a D-Robotics RDK X5 8GB (8×A55, 10 TOPS BPU). Give concise, practical diagnosis. No markdown headings. Use short labeled lines: Cause, Process, Operator, CAPA. Assume limited metrology, mixed SKUs, and operator-run lines. Do not invent measurements that were not provided."
			}, {
				role: "user",
				content: JSON.stringify(data)
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Diagnosis failed (${res.status}). Try again.`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Empty diagnosis."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { diagnoseInspection_createServerFn_handler };
