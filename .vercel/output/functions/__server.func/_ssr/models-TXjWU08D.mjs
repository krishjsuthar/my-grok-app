import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as makeTeachSample, c as useQc, n as Button, s as recipeOf, t as Badge } from "./store-BD-z6p-a.mjs";
import { i as CardTitle, n as CardHeader, r as CardHint, t as Card } from "./card-BwUk9cRM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/models-TXjWU08D.js
var import_jsx_runtime = require_jsx_runtime();
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
	const teach = (label) => {
		if (!last) {
			toast.error("Inspect a unit on the station first.");
			return;
		}
		addSample(makeTeachSample(last, label, last.id));
		toast.message(label === "gold" ? "Gold sample stored" : "Defect sample stored");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted uppercase",
					children: "HuskyLens 2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Self-learning classifier"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm text-muted",
					children: "Teach gold vs defect from live units. Samples stay on the RDK X5 and deploy to the K230 self-learning head — no GPU workstation required."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Active recipe"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium",
							children: recipe.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-subtle",
							children: recipe.sku
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Gold"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-2xl tabular-nums",
						children: gold.length
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Defect"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-2xl tabular-nums",
						children: defects.length
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Last captured unit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: last ? `${last.sku} · unit ${String(last.unitIndex).padStart(4, "0")}` : "Nothing captured yet" })] }), last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: last.verdict === "pass" ? "pass" : last.verdict === "fail" ? "fail" : "hold",
				children: last.verdict
			}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => teach("gold"),
					disabled: !last,
					children: "Teach as gold"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => teach("defect"),
					disabled: !last,
					children: "Teach as defect"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Sample set" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Minimum 8 gold + 8 defect before a deploy is trustworthy" })] }) }),
				samples.filter((s) => s.recipeId === recipeId).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No samples for this recipe. Run the station, then teach."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: samples.filter((s) => s.recipeId === recipeId).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "capitalize",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: [
								s.defectName ?? "master",
								" · ",
								s.thumb
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => removeSample(s.id),
							children: "Remove"
						})]
					}, s.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-4",
					disabled: gold.length < 4 || defects.length < 4,
					onClick: () => toast.message("Deploy queued to HuskyLens 2 (demo)."),
					children: "Deploy to K230"
				})
			] })
		]
	});
}
//#endregion
export { ModelsPage as component };
