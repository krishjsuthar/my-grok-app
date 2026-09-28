import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as useQc, n as Button, r as RECIPE_LIST, t as Badge } from "./store-BD-z6p-a.mjs";
import { t as Card } from "./card-BwUk9cRM.mjs";
import { n as algoLabel } from "./hardware-8AHwtbLj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recipes-DjhNwyW9.js
var import_jsx_runtime = require_jsx_runtime();
function RecipesPage() {
	const active = useQc((s) => s.recipeId);
	const setRecipe = useQc((s) => s.setRecipe);
	const navigate = useNavigate();
	const load = (id) => {
		setRecipe(id);
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted uppercase",
				children: "MSME sectors"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: "Inspection recipes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Each recipe maps HuskyLens 2 models and RDK X5 spec limits to a shop-floor SKU. Load one to run it on the station."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: RECIPE_LIST.map((recipe) => {
				const on = recipe.id === active;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col gap-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: recipe.sector
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-medium",
									children: recipe.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] text-subtle",
									children: recipe.sku
								})
							] }), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "accent",
								children: "On station"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: recipe.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-subtle",
								children: "Cycle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-mono",
								children: [recipe.inspectMs, " ms"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-subtle",
								children: "Sampling"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: recipe.sampling })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: recipe.huskyAlgos.map(algoLabel).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: recipe.rdkRole
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-wrap gap-1.5",
							children: recipe.defects.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: d.severity === "critical" ? "fail" : d.severity === "major" ? "hold" : "muted",
								children: d.name
							}) }, d.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: on ? "outline" : "default",
							className: "mt-auto w-full",
							onClick: () => load(recipe.id),
							children: on ? "Open station" : "Load on station"
						})
					]
				}, recipe.id);
			})
		})]
	});
}
//#endregion
export { RecipesPage as component };
