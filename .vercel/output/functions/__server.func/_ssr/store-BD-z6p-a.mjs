import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Slot } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./router-CL_vgh8J.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BD-z6p-a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { tone: {
		muted: "bg-elevated text-muted",
		accent: "bg-accent text-accent-fg",
		pass: "bg-pass-dim text-pass",
		fail: "bg-fail-dim text-fail",
		hold: "bg-hold-dim text-hold"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			outline: "bg-transparent text-fg shadow-[0_0_0_1px_rgb(232_235_228_/_18%)] hover:bg-elevated",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-elevated",
			pass: "bg-pass text-bg hover:opacity-90",
			fail: "bg-fail text-fg hover:opacity-90",
			hold: "bg-hold text-bg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var RECIPES = {
	textile: {
		id: "textile",
		name: "Woven fabric",
		sector: "Textiles",
		sku: "TX-WOV-240",
		summary: "Grey-cloth inspection for holes, stains, slubs and shade drift on a 1.2 m loom-end table.",
		inspectMs: 420,
		failRate: .09,
		huskyAlgos: [
			"instance_segmentation",
			"color_recognition",
			"object_classification"
		],
		rdkRole: "Shade ΔE vs master, defect area vs GSM, sampling skip-lot.",
		specs: [
			{
				name: "Shade ΔE",
				unit: "ΔE",
				specMax: 1.8,
				target: .4
			},
			{
				name: "Defect area",
				unit: "mm²",
				specMax: 12,
				target: 0
			},
			{
				name: "Ends/inch",
				unit: "epi",
				specMin: 58,
				specMax: 62,
				target: 60
			}
		],
		defects: [
			{
				name: "Weft stain",
				severity: "major",
				weight: .35
			},
			{
				name: "Pin hole",
				severity: "critical",
				weight: .2
			},
			{
				name: "Slub",
				severity: "minor",
				weight: .25
			},
			{
				name: "Shade band",
				severity: "major",
				weight: .2
			}
		],
		sampling: "100% visual, AQL 1.5 on shade"
	},
	packaging: {
		id: "packaging",
		name: "Bottled FMCG",
		sector: "Food & beverage",
		sku: "PK-BTL-500",
		summary: "Fill level, cap presence, label skew and seal integrity on a 500 ml PET line.",
		inspectMs: 280,
		failRate: .06,
		huskyAlgos: [
			"object_recognition",
			"ocr",
			"color_recognition",
			"barcode"
		],
		rdkRole: "Fill pixel-to-ml calibration, reject-gate GPIO, lot genealogy.",
		specs: [
			{
				name: "Fill volume",
				unit: "ml",
				specMin: 495,
				specMax: 510,
				target: 500
			},
			{
				name: "Label skew",
				unit: "°",
				specMax: 1.5,
				target: 0
			},
			{
				name: "Cap torque proxy",
				unit: "px gap",
				specMax: 4,
				target: 1
			}
		],
		defects: [
			{
				name: "Underfill",
				severity: "critical",
				weight: .3
			},
			{
				name: "Missing cap",
				severity: "critical",
				weight: .15
			},
			{
				name: "Label skew",
				severity: "major",
				weight: .35
			},
			{
				name: "Seal wrinkle",
				severity: "minor",
				weight: .2
			}
		],
		sampling: "100% fill + cap, 1/10 OCR audit"
	},
	metal: {
		id: "metal",
		name: "Stamped bracket",
		sector: "Metal fabrication",
		sku: "MT-BRK-08",
		summary: "Hole presence, burrs, dent and overall length on a progressive-die bracket.",
		inspectMs: 360,
		failRate: .07,
		huskyAlgos: [
			"object_recognition",
			"instance_segmentation",
			"object_classification"
		],
		rdkRole: "Pixel-to-mm homography, hole-count policy, CAN reject to press.",
		specs: [
			{
				name: "Overall length",
				unit: "mm",
				specMin: 79.6,
				specMax: 80.4,
				target: 80
			},
			{
				name: "Hole count",
				unit: "ea",
				specMin: 4,
				specMax: 4,
				target: 4
			},
			{
				name: "Burr height proxy",
				unit: "px",
				specMax: 6,
				target: 1
			}
		],
		defects: [
			{
				name: "Missing hole",
				severity: "critical",
				weight: .25
			},
			{
				name: "Edge burr",
				severity: "major",
				weight: .3
			},
			{
				name: "Face dent",
				severity: "major",
				weight: .25
			},
			{
				name: "Length OOS",
				severity: "critical",
				weight: .2
			}
		],
		sampling: "100% holes, 5-pc/hr CMM audit"
	},
	electronics: {
		id: "electronics",
		name: "SMT board",
		sector: "Electronics",
		sku: "EL-PCB-12A",
		summary: "Missing parts, polarity, solder bridges on a 2-layer MSME control board.",
		inspectMs: 510,
		failRate: .05,
		huskyAlgos: [
			"object_classification",
			"object_recognition",
			"self_learning"
		],
		rdkRole: "BOM overlay, polarity map, SPI/AOI fusion, hold for rework.",
		specs: [
			{
				name: "Placed parts",
				unit: "ea",
				specMin: 18,
				specMax: 18,
				target: 18
			},
			{
				name: "Solder bridge count",
				unit: "ea",
				specMax: 0,
				target: 0
			},
			{
				name: "Polarity errors",
				unit: "ea",
				specMax: 0,
				target: 0
			}
		],
		defects: [
			{
				name: "Missing 0805",
				severity: "critical",
				weight: .3
			},
			{
				name: "IC polarity",
				severity: "critical",
				weight: .2
			},
			{
				name: "Solder bridge",
				severity: "major",
				weight: .3
			},
			{
				name: "Tombstone",
				severity: "major",
				weight: .2
			}
		],
		sampling: "100% first-article, then 100% AOI"
	},
	ceramics: {
		id: "ceramics",
		name: "Glazed tile",
		sector: "Ceramics",
		sku: "CR-TIL-300",
		summary: "Cracks, glaze pinholes, edge chips and shade on 300 mm wall tile.",
		inspectMs: 390,
		failRate: .1,
		huskyAlgos: [
			"instance_segmentation",
			"color_recognition",
			"object_classification"
		],
		rdkRole: "Crack length vs class, shade lot grouping, kiln feedback.",
		specs: [
			{
				name: "Crack length",
				unit: "mm",
				specMax: 0,
				target: 0
			},
			{
				name: "Shade ΔE",
				unit: "ΔE",
				specMax: 1.2,
				target: .3
			},
			{
				name: "Edge chip area",
				unit: "mm²",
				specMax: 4,
				target: 0
			}
		],
		defects: [
			{
				name: "Hairline crack",
				severity: "critical",
				weight: .3
			},
			{
				name: "Glaze pinhole",
				severity: "minor",
				weight: .25
			},
			{
				name: "Edge chip",
				severity: "major",
				weight: .25
			},
			{
				name: "Shade drift",
				severity: "major",
				weight: .2
			}
		],
		sampling: "100% face, 10% edge gauge"
	},
	print: {
		id: "print",
		name: "Carton print",
		sector: "Packaging print",
		sku: "PR-CTN-A4",
		summary: "Registration, barcode grade, missing print on corrugated shipper.",
		inspectMs: 310,
		failRate: .08,
		huskyAlgos: [
			"ocr",
			"barcode",
			"qr",
			"object_recognition"
		],
		rdkRole: "GS1 grade, colour-to-colour register, reprint ticket.",
		specs: [
			{
				name: "Register error",
				unit: "mm",
				specMax: .4,
				target: .1
			},
			{
				name: "Barcode grade",
				unit: "ISO",
				specMin: 3,
				specMax: 4,
				target: 3.5
			},
			{
				name: "OCR match",
				unit: "%",
				specMin: 98,
				specMax: 100,
				target: 100
			}
		],
		defects: [
			{
				name: "Misregister",
				severity: "major",
				weight: .3
			},
			{
				name: "Unreadable barcode",
				severity: "critical",
				weight: .25
			},
			{
				name: "Ink void",
				severity: "major",
				weight: .25
			},
			{
				name: "Wrong batch text",
				severity: "critical",
				weight: .2
			}
		],
		sampling: "100% barcode, 1/20 register"
	}
};
var RECIPE_LIST = Object.values(RECIPES);
function recipeOf(id) {
	return RECIPES[id];
}
function mulberry32(seed) {
	let t = seed >>> 0;
	return () => {
		t += 1831565813;
		let r = Math.imul(t ^ t >>> 15, 1 | t);
		r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
		return ((r ^ r >>> 14) >>> 0) / 4294967296;
	};
}
function pickWeighted(rng, items) {
	const total = items.reduce((s, i) => s + i.weight, 0);
	let x = rng() * total;
	for (const item of items) {
		x -= item.weight;
		if (x <= 0) return item;
	}
	return items[items.length - 1];
}
function clamp(n, a, b) {
	return Math.min(b, Math.max(a, n));
}
function jitter(rng, value, span) {
	return value + (rng() - .5) * span;
}
function boxAround(rng, cx, cy, w, h) {
	return {
		x: clamp(cx - w / 2 + (rng() - .5) * .04, .04, .9),
		y: clamp(cy - h / 2 + (rng() - .5) * .04, .08, .86),
		w,
		h
	};
}
function simulateInspection(opts) {
	const recipe = recipeOf(opts.recipeId);
	const rng = mulberry32(opts.seed ?? Date.now() + opts.unitIndex * 9973);
	const fail = rng() < recipe.failRate;
	const hold = !fail && rng() < .03;
	const defectCount = fail ? 1 + Math.floor(rng() * (rng() < .25 ? 3 : 2)) : 0;
	const detections = [];
	detections.push({
		id: `obj-${opts.unitIndex}`,
		label: recipe.name,
		...boxAround(rng, .5, .52, .62, .58),
		confidence: .92 + rng() * .07,
		kind: "object"
	});
	for (let i = 0; i < defectCount; i++) {
		const d = pickWeighted(rng, recipe.defects);
		const cx = .28 + rng() * .44;
		const cy = .3 + rng() * .4;
		detections.push({
			id: `def-${opts.unitIndex}-${i}`,
			label: d.name,
			...boxAround(rng, cx, cy, .1 + rng() * .12, .08 + rng() * .1),
			confidence: .71 + rng() * .24,
			kind: "defect",
			severity: d.severity
		});
	}
	if (recipe.huskyAlgos.includes("ocr") || recipe.huskyAlgos.includes("barcode")) detections.push({
		id: `code-${opts.unitIndex}`,
		label: recipe.huskyAlgos.includes("barcode") ? "GS1 barcode" : "Batch OCR",
		...boxAround(rng, .68, .7, .22, .1),
		confidence: fail && rng() < .4 ? .42 + rng() * .2 : .9 + rng() * .08,
		kind: recipe.huskyAlgos.includes("barcode") ? "barcode" : "ocr",
		severity: fail && rng() < .4 ? "critical" : void 0
	});
	const measurements = recipe.specs.map((spec) => {
		const inSpec = !fail || rng() > .45;
		let value;
		const target = spec.target ?? spec.specMin ?? 0;
		if (inSpec) {
			const span = spec.specMax != null && spec.specMin != null ? (spec.specMax - spec.specMin) * .35 : Math.max(.2, Math.abs(target) * .08);
			value = jitter(rng, target, span);
			if (spec.specMin != null) value = Math.max(spec.specMin, value);
			if (spec.specMax != null) value = Math.min(spec.specMax, value);
		} else if (spec.specMax != null && rng() > .5) value = spec.specMax + (.4 + rng()) * (Math.abs(spec.specMax) * .08 + .5);
		else if (spec.specMin != null) value = spec.specMin - (.4 + rng()) * (Math.abs(spec.specMin) * .06 + .4);
		else value = target * (1.2 + rng() * .3);
		return {
			name: spec.name,
			value: Number(value.toFixed(spec.unit === "ea" ? 0 : 2)),
			unit: spec.unit,
			specMin: spec.specMin,
			specMax: spec.specMax,
			target: spec.target
		};
	});
	const oos = measurements.filter((m) => {
		if (m.specMin != null && m.value < m.specMin) return true;
		if (m.specMax != null && m.value > m.specMax) return true;
		return false;
	}).length;
	const defectDetections = detections.filter((d) => d.kind === "defect");
	let verdict = "pass";
	if (hold) verdict = "hold";
	if (fail || defectDetections.some((d) => d.severity === "critical") || oos > 0) verdict = "fail";
	const score = clamp(100 - defectDetections.length * 18 - oos * 14 - (verdict === "hold" ? 8 : 0) + rng() * 4, 12, 99.4);
	return {
		id: `u${opts.lotId.slice(-4)}${opts.unitIndex.toString(36)}`,
		lotId: opts.lotId,
		recipeId: opts.recipeId,
		sku: recipe.sku,
		unitIndex: opts.unitIndex,
		timestamp: opts.timestamp ?? 0,
		verdict,
		score: Number(score.toFixed(1)),
		detections,
		measurements,
		cycleMs: recipe.inspectMs + Math.round((rng() - .5) * 80),
		huskyAlgos: recipe.huskyAlgos
	};
}
function measurementStatus(m) {
	if (m.specMin != null && m.value < m.specMin) return "fail";
	if (m.specMax != null && m.value > m.specMax) return "fail";
	if (m.target != null && m.specMin != null && m.specMax != null) {
		const band = (m.specMax - m.specMin) * .15;
		if (Math.abs(m.value - m.target) > (m.specMax - m.specMin) / 2 - band) return "warn";
	}
	return "ok";
}
function yieldOf(rows) {
	if (rows.length === 0) return {
		n: 0,
		pass: 0,
		fail: 0,
		hold: 0,
		yieldPct: 0
	};
	const pass = rows.filter((r) => r.verdict === "pass").length;
	const fail = rows.filter((r) => r.verdict === "fail").length;
	const hold = rows.filter((r) => r.verdict === "hold").length;
	return {
		n: rows.length,
		pass,
		fail,
		hold,
		yieldPct: pass / rows.length * 100
	};
}
function defectPareto(rows) {
	const counts = /* @__PURE__ */ new Map();
	for (const row of rows) for (const d of row.detections) {
		if (d.kind !== "defect") continue;
		counts.set(d.label, (counts.get(d.label) ?? 0) + 1);
	}
	return [...counts.entries()].map(([name, count]) => ({
		name,
		count
	})).sort((a, b) => b.count - a.count);
}
function makeTeachSample(inspection, label, thumb) {
	const defect = inspection.detections.find((d) => d.kind === "defect");
	return {
		id: `ts-${inspection.id}-${label}`,
		recipeId: inspection.recipeId,
		label,
		defectName: label === "defect" ? defect?.label : void 0,
		capturedAt: Date.now(),
		thumb
	};
}
var DEMO_LOT_ID = "lot-demo-a";
var DEMO_OPENED = 1746e9;
function seedDemoLot() {
	const recipe = RECIPE_LIST[2];
	const lot = {
		id: DEMO_LOT_ID,
		sku: recipe.sku,
		recipeId: recipe.id,
		name: "Bracket 08 · Shift A",
		openedAt: DEMO_OPENED,
		closedAt: 1746018e6,
		targetQty: 48
	};
	return {
		lot,
		inspections: Array.from({ length: 48 }, (_, i) => simulateInspection({
			recipeId: recipe.id,
			lotId: lot.id,
			unitIndex: i + 1,
			seed: 24e3 + i * 17
		})).map((row, i) => ({
			...row,
			timestamp: lot.openedAt + i * 6 * 60 * 1e3
		}))
	};
}
function newLotId() {
	return `lot-${Date.now().toString(36)}`;
}
var demo = seedDemoLot();
function openLot(recipeId, openedAt = 0) {
	const recipe = recipeOf(recipeId);
	return {
		id: openedAt ? newLotId() : "lot-live",
		sku: recipe.sku,
		recipeId,
		name: `${recipe.name} · live`,
		openedAt,
		targetQty: 50
	};
}
var useQc = create()((set, get) => ({
	recipeId: "metal",
	lot: openLot("metal", 0),
	lots: [demo.lot],
	history: demo.inspections,
	current: null,
	auto: false,
	grid: false,
	samples: [],
	unitCursor: 0,
	inspectNext: () => {
		const { recipeId, lot, unitCursor } = get();
		const nextIndex = unitCursor + 1;
		const inspection = simulateInspection({
			recipeId,
			lotId: lot.id,
			unitIndex: nextIndex,
			timestamp: Date.now()
		});
		set((s) => ({
			unitCursor: nextIndex,
			current: inspection,
			history: [...s.history, inspection].slice(-800)
		}));
		return inspection;
	},
	setRecipe: (id) => {
		set({
			recipeId: id,
			lot: openLot(id, 0),
			unitCursor: 0,
			current: null,
			auto: false
		});
	},
	setAuto: (v) => set({ auto: v }),
	setGrid: (v) => set({ grid: v }),
	overrideVerdict: (id, verdict) => set((s) => ({
		history: s.history.map((row) => row.id === id ? {
			...row,
			verdict
		} : row),
		current: s.current?.id === id ? {
			...s.current,
			verdict
		} : s.current
	})),
	attachGrok: (id, note) => set((s) => ({
		history: s.history.map((row) => row.id === id ? {
			...row,
			grokNote: note
		} : row),
		current: s.current?.id === id ? {
			...s.current,
			grokNote: note
		} : s.current
	})),
	addSample: (sample) => set((s) => ({ samples: [sample, ...s.samples].slice(0, 40) })),
	removeSample: (id) => set((s) => ({ samples: s.samples.filter((x) => x.id !== id) })),
	startLot: () => {
		const { recipeId, lot, lots } = get();
		const closed = {
			...lot,
			closedAt: Date.now()
		};
		set({
			lots: [closed, ...lots.filter((l) => l.id !== closed.id)],
			lot: openLot(recipeId, Date.now()),
			unitCursor: 0,
			current: null
		});
	}
}));
//#endregion
export { makeTeachSample as a, useQc as c, defectPareto as i, yieldOf as l, Button as n, measurementStatus as o, RECIPE_LIST as r, recipeOf as s, Badge as t };
