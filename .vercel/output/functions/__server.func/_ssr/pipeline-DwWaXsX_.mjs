import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn } from "./router-CL_vgh8J.mjs";
import { i as CardTitle, n as CardHeader, r as CardHint, t as Card } from "./card-BwUk9cRM.mjs";
import { t as PIPELINE_STAGES } from "./hardware-8AHwtbLj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pipeline-DwWaXsX_.js
var import_jsx_runtime = require_jsx_runtime();
function Separator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-px w-full bg-border", className),
		role: "separator",
		...props
	});
}
function PipelinePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted uppercase",
					children: "Architecture"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Edge pipeline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm text-muted",
					children: "HuskyLens 2 sees the unit. RDK X5 8GB owns policy, specs and the reject gate. LineSight is the operator console — this preview runs a faithful demo of that chain."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-wider text-subtle",
							children: "SENSOR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-lg font-medium",
							children: "HuskyLens 2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "DFRobot SEN0638. Kendryte K230, 6 TOPS, 1 GB LPDDR4, GC2093 2 MP at 60 fps, 2.4 in 640×480 touch panel."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-1.5 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "20+ onboard models, custom YOLO deploy" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Self-learning classifier for gold vs defect" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "MCP server for semantic frames to an LLM" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "UART / I2C Gravity plus USB-C" })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-wider text-subtle",
							children: "ORCHESTRATOR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-lg font-medium",
							children: "RDK X5 8GB"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "D-Robotics Sunrise 5. 8× Cortex-A55, Bayes BPU 10 TOPS, 8 GB LPDDR4, Ubuntu 22.04."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-1.5 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "USB 3.0 host for HuskyLens frames" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pixel-to-mm homography and spec limits" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "GPIO / CAN FD reject solenoid" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Optional second MIPI CSI for top + side" })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-3",
				children: PIPELINE_STAGES.map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-subtle",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: stage.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: stage.detail
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle sm:text-right",
							children: stage.device
						})
					]
				}) }, stage.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Why this split for MSME" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Cost, mix and operators — not a six-figure AOI cell" })] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
								title: "On-device first",
								body: "Classification and OCR stay on the K230. No cloud round-trip on every bottle or bracket."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
								title: "Board does policy",
								body: "RDK X5 keeps recipes, AQL sampling and the reject pulse. One image, many SKUs."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
								title: "LLM on demand",
								body: "Grok reads a fail packet — cause and CAPA — only when an operator asks. Quota stays bounded."
							})
						]
					})
				]
			})
		]
	});
}
function Note({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-sm font-medium",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-sm text-muted",
		children: body
	})] });
}
//#endregion
export { PipelinePage as component };
