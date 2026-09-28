import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { a as Pause, c as BrainCircuit, i as Play, n as SkipForward } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as cn, r as formatPct } from "./router-CL_vgh8J.mjs";
import { c as useQc, l as yieldOf, n as Button, o as measurementStatus, s as recipeOf, t as Badge } from "./store-BD-z6p-a.mjs";
import { i as CardTitle, n as CardHeader, r as CardHint, t as Card } from "./card-BwUk9cRM.mjs";
import { n as algoLabel, r as nextHardware, t as PIPELINE_STAGES } from "./hardware-8AHwtbLj.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-X_SuwEMK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DRAW = {
	bg: "#121511",
	belt: "#1a1e19",
	beltGroove: "#10140f",
	sage: "#c5d0c2",
	sageDim: "rgba(197, 208, 194, 0.45)",
	ink: "#e8ebe4",
	muted: "#8b9288",
	pass: "#6b9a72",
	fail: "#c45c4a",
	hold: "#b08a4a",
	grid: "rgba(232, 235, 228, 0.06)",
	hud: "rgba(14, 16, 15, 0.72)"
};
function roundRect(ctx, x, y, w, h, r) {
	const radius = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.arcTo(x + w, y, x + w, y + h, radius);
	ctx.arcTo(x + w, y + h, x, y + h, radius);
	ctx.arcTo(x, y + h, x, y, radius);
	ctx.arcTo(x, y, x + w, y, radius);
	ctx.closePath();
}
function hash(n) {
	const x = Math.sin(n * 127.1) * 43758.5453;
	return x - Math.floor(x);
}
function productOffset(phase, t) {
	if (phase === "incoming") return 1 - easeOut(t);
	if (phase === "outgoing") return -easeIn(t);
	if (phase === "idle") return 1.15;
	return 0;
}
function easeOut(t) {
	return 1 - (1 - t) * (1 - t);
}
function easeIn(t) {
	return t * t;
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function drawScene(ctx, opts) {
	const { w, h, recipeId, inspection, phase, t, showGrid, now, reduced } = opts;
	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = DRAW.bg;
	ctx.fillRect(0, 0, w, h);
	drawVignette(ctx, w, h);
	drawBelt(ctx, w, h, now, reduced);
	const cx = w * (.5 + productOffset(phase, reduced ? 1 : t) * .72);
	const cy = h * .5;
	const pw = w * .58;
	const ph = h * .56;
	if (phase !== "idle") drawProduct(ctx, recipeId, inspection, cx, cy, pw, ph, now);
	if (showGrid) drawGrid(ctx, w, h);
	if (phase === "inspecting" || phase === "decided") {
		drawDetections(ctx, w, h, cx, cy, pw, ph, inspection, phase === "decided" ? 1 : reduced ? 1 : t);
		if (phase === "inspecting") drawScan(ctx, w, h, t);
	}
	if (phase === "decided" && inspection) drawStamp(ctx, w, h, inspection.verdict, reduced ? 1 : t);
	drawCrosshair(ctx, w, h);
	drawHud(ctx, w, h, recipeId, inspection, phase, now);
}
function drawVignette(ctx, w, h) {
	const g = ctx.createRadialGradient(w * .5, h * .48, h * .15, w * .5, h * .5, h * .78);
	g.addColorStop(0, "rgba(0,0,0,0)");
	g.addColorStop(1, "rgba(0,0,0,0.42)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
}
function drawBelt(ctx, w, h, now, reduced) {
	const y0 = h * .72;
	const y1 = h * .92;
	ctx.fillStyle = DRAW.belt;
	ctx.fillRect(0, y0, w, y1 - y0);
	ctx.fillStyle = DRAW.beltGroove;
	const drift = reduced ? 0 : now / 18 % 28;
	for (let x = -28 + drift; x < w; x += 28) ctx.fillRect(x, y0, 3, y1 - y0);
	ctx.fillStyle = "rgba(197, 208, 194, 0.08)";
	ctx.fillRect(0, y0, w, 1);
}
function drawGrid(ctx, w, h) {
	ctx.strokeStyle = DRAW.grid;
	ctx.lineWidth = 1;
	const step = 32;
	ctx.beginPath();
	for (let x = 0; x <= w; x += step) {
		ctx.moveTo(x + .5, 0);
		ctx.lineTo(x + .5, h);
	}
	for (let y = 0; y <= h; y += step) {
		ctx.moveTo(0, y + .5);
		ctx.lineTo(w, y + .5);
	}
	ctx.stroke();
}
function drawCrosshair(ctx, w, h) {
	const cx = w / 2;
	const cy = h / 2;
	ctx.strokeStyle = "rgba(197, 208, 194, 0.28)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(cx - 18, cy);
	ctx.lineTo(cx - 6, cy);
	ctx.moveTo(cx + 6, cy);
	ctx.lineTo(cx + 18, cy);
	ctx.moveTo(cx, cy - 18);
	ctx.lineTo(cx, cy - 6);
	ctx.moveTo(cx, cy + 6);
	ctx.lineTo(cx, cy + 18);
	ctx.stroke();
	ctx.strokeRect(cx - 4.5, cy - 4.5, 9, 9);
}
function drawScan(ctx, w, h, t) {
	const y = lerp(h * .16, h * .78, t);
	const g = ctx.createLinearGradient(0, y - 18, 0, y + 18);
	g.addColorStop(0, "rgba(197, 208, 194, 0)");
	g.addColorStop(.5, "rgba(197, 208, 194, 0.16)");
	g.addColorStop(1, "rgba(197, 208, 194, 0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, y - 18, w, 36);
	ctx.fillStyle = "rgba(197, 208, 194, 0.45)";
	ctx.fillRect(0, y, w, 1);
}
function drawStamp(ctx, w, h, verdict, t) {
	const label = verdict.toUpperCase();
	const color = verdict === "pass" ? DRAW.pass : verdict === "fail" ? DRAW.fail : DRAW.hold;
	ctx.save();
	ctx.translate(w * .78, h * .22);
	ctx.rotate(-.18);
	ctx.globalAlpha = Math.min(1, t * 1.8);
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 3;
	roundRect(ctx, -52, -22, 104, 44, 4);
	ctx.stroke();
	ctx.font = "600 18px 'IBM Plex Sans', sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(label, 0, 1);
	ctx.restore();
}
function drawHud(ctx, w, h, recipeId, inspection, phase, now) {
	ctx.fillStyle = DRAW.hud;
	ctx.fillRect(0, 0, w, 28);
	ctx.fillRect(0, h - 26, w, 26);
	ctx.fillStyle = DRAW.sage;
	ctx.font = "500 11px 'IBM Plex Mono', monospace";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";
	ctx.fillText("HUSKYLENS 2  ·  GC2093  640×480", 10, 14);
	ctx.textAlign = "right";
	ctx.fillStyle = DRAW.muted;
	const frame = Math.floor(now / 33) % 99999;
	ctx.fillText(`F ${String(frame).padStart(5, "0")}   ${phase.toUpperCase()}`, w - 10, 14);
	ctx.textAlign = "left";
	ctx.fillStyle = DRAW.muted;
	ctx.fillText(`RECIPE  ${recipeId.toUpperCase()}`, 10, h - 13);
	ctx.textAlign = "right";
	if (inspection) {
		ctx.fillStyle = DRAW.ink;
		ctx.fillText(`UNIT ${inspection.unitIndex.toString().padStart(4, "0")}  ${inspection.sku}`, w - 10, h - 13);
	} else ctx.fillText("STANDBY", w - 10, h - 13);
}
function drawDetections(ctx, w, h, cx, cy, pw, ph, inspection, reveal) {
	if (!inspection) return;
	const n = inspection.detections.length;
	inspection.detections.forEach((d, i) => {
		const gate = (i + 1) / Math.max(n, 1);
		if (reveal + .12 < gate) return;
		drawBox(ctx, d, w, h, cx, cy, pw, ph, Math.min(1, (reveal - (gate - .2)) * 4));
	});
}
function drawBox(ctx, d, w, h, cx, cy, pw, ph, alpha) {
	const x = cx - pw / 2 + d.x * pw;
	const y = cy - ph / 2 + d.y * ph;
	const bw = d.w * pw;
	const bh = d.h * ph;
	const color = d.kind === "defect" ? DRAW.fail : d.kind === "object" ? DRAW.sage : DRAW.hold;
	ctx.save();
	ctx.globalAlpha = alpha;
	ctx.strokeStyle = color;
	ctx.lineWidth = d.kind === "defect" ? 2 : 1.25;
	ctx.strokeRect(x, y, bw, bh);
	ctx.fillStyle = color;
	ctx.font = "500 10px 'IBM Plex Mono', monospace";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	const tag = `${d.label}  ${(d.confidence * 100).toFixed(0)}`;
	const tw = ctx.measureText(tag).width + 8;
	ctx.fillRect(x, y - 16, tw, 16);
	ctx.fillStyle = "#0e100f";
	ctx.fillText(tag, x + 4, y - 3);
	ctx.restore();
}
function drawProduct(ctx, recipeId, inspection, cx, cy, pw, ph, now) {
	ctx.save();
	ctx.translate(cx, cy);
	const seed = inspection?.unitIndex ?? 1;
	switch (recipeId) {
		case "textile":
			drawTextile(ctx, pw, ph, seed, inspection);
			break;
		case "packaging":
			drawBottle(ctx, pw, ph, seed, inspection);
			break;
		case "metal":
			drawBracket(ctx, pw, ph, seed, inspection);
			break;
		case "electronics":
			drawPcb(ctx, pw, ph, seed, inspection);
			break;
		case "ceramics":
			drawTile(ctx, pw, ph, seed, inspection);
			break;
		case "print": drawCarton(ctx, pw, ph, seed, inspection);
	}
	ctx.restore();
}
function drawTextile(ctx, pw, ph, seed, inspection) {
	const w = pw * .92;
	const h = ph * .78;
	ctx.fillStyle = "#3a4a3d";
	ctx.fillRect(-w / 2, -h / 2, w, h);
	ctx.strokeStyle = "rgba(232, 235, 228, 0.08)";
	ctx.lineWidth = 1;
	for (let x = -w / 2; x < w / 2; x += 7) {
		ctx.beginPath();
		ctx.moveTo(x, -h / 2);
		ctx.lineTo(x + 4, h / 2);
		ctx.stroke();
	}
	for (let y = -h / 2; y < h / 2; y += 6) {
		ctx.beginPath();
		ctx.moveTo(-w / 2, y);
		ctx.lineTo(w / 2, y);
		ctx.stroke();
	}
	ctx.fillStyle = `rgba(90, ${120 + (hash(seed) - .5) * 10}, 95, 0.18)`;
	ctx.fillRect(-w / 2, -h / 2, w, h);
	if (inspection?.verdict === "fail") {
		const d = inspection.detections.find((x) => x.kind === "defect");
		if (d?.label.includes("stain") || d?.label.includes("Shade") || hash(seed) > .4) {
			ctx.fillStyle = "rgba(70, 50, 30, 0.55)";
			ctx.beginPath();
			ctx.ellipse(-w * .12, h * .08, 18, 12, .4, 0, Math.PI * 2);
			ctx.fill();
		}
		if (d?.label.includes("hole") || hash(seed * 3) > .55) {
			ctx.fillStyle = "#121511";
			ctx.beginPath();
			ctx.arc(w * .16, -h * .12, 7, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	ctx.strokeStyle = "rgba(197, 208, 194, 0.2)";
	ctx.strokeRect(-w / 2, -h / 2, w, h);
}
function drawBottle(ctx, pw, ph, seed, inspection) {
	const underfill = inspection?.detections.some((d) => d.label === "Underfill");
	const noCap = inspection?.detections.some((d) => d.label === "Missing cap");
	const skew = inspection?.detections.some((d) => d.label === "Label skew") ? .12 : 0;
	ctx.fillStyle = "#2a332c";
	roundRect(ctx, -pw * .16, -ph * .08, pw * .32, ph * .42, 16);
	ctx.fill();
	const fillH = underfill ? ph * .18 : ph * .3;
	ctx.fillStyle = "rgba(90, 140, 110, 0.55)";
	roundRect(ctx, -pw * .14, ph * .3 - fillH, pw * .28, fillH, 12);
	ctx.fill();
	ctx.fillStyle = "#cfc8b4";
	ctx.save();
	ctx.translate(0, ph * .06);
	ctx.rotate(skew);
	ctx.fillRect(-pw * .13, -ph * .06, pw * .26, ph * .16);
	ctx.fillStyle = "#3d453c";
	ctx.font = "600 11px 'IBM Plex Sans', sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("500 ml", 0, 4);
	ctx.restore();
	ctx.fillStyle = "#8a9086";
	ctx.fillRect(-pw * .06, -ph * .28, pw * .12, ph * .2);
	if (!noCap) {
		ctx.fillStyle = hash(seed) > .5 ? "#6b9a72" : "#4a6b52";
		roundRect(ctx, -pw * .07, -ph * .38, pw * .14, ph * .11, 4);
		ctx.fill();
	}
}
function drawBracket(ctx, pw, ph, seed, inspection) {
	const missing = inspection?.detections.some((d) => d.label === "Missing hole");
	ctx.fillStyle = "#8d9388";
	ctx.beginPath();
	ctx.moveTo(-pw * .36, -ph * .12);
	ctx.lineTo(pw * .36, -ph * .12);
	ctx.lineTo(pw * .36, ph * .08);
	ctx.lineTo(pw * .12, ph * .08);
	ctx.lineTo(pw * .12, ph * .28);
	ctx.lineTo(-pw * .12, ph * .28);
	ctx.lineTo(-pw * .12, ph * .08);
	ctx.lineTo(-pw * .36, ph * .08);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#6f756c";
	ctx.fill();
	[
		[-.26, -.02],
		[.26, -.02],
		[-0, .18],
		[0, -.02]
	].forEach((pt, i) => {
		if (missing && i === 2) return;
		ctx.beginPath();
		ctx.fillStyle = "#121511";
		ctx.arc(pt[0] * pw, pt[1] * ph, 9, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#b7bdb4";
		ctx.lineWidth = 1.5;
		ctx.stroke();
	});
	if (inspection?.detections.some((d) => d.label.includes("burr"))) {
		ctx.strokeStyle = "#c45c4a";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(pw * .36, -ph * .04);
		ctx.lineTo(pw * .4, 0);
		ctx.lineTo(pw * .36, ph * .04);
		ctx.stroke();
	}
}
function drawPcb(ctx, pw, ph, seed, inspection) {
	const w = pw * .78;
	const h = ph * .62;
	ctx.fillStyle = "#1d3a2a";
	ctx.fillRect(-w / 2, -h / 2, w, h);
	ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
	ctx.lineWidth = 1.2;
	for (let i = 0; i < 8; i++) {
		const y = -h / 2 + 10 + i * (h / 9);
		ctx.beginPath();
		ctx.moveTo(-w / 2 + 8, y);
		ctx.lineTo(w / 2 - 8, y + (hash(seed + i) - .5) * 8);
		ctx.stroke();
	}
	const missing = inspection?.detections.some((d) => d.label.includes("Missing"));
	for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
		if (missing && r === 1 && c === 2) continue;
		const x = -w / 2 + 22 + c * (w / 6.4);
		const y = -h / 2 + 18 + r * (h / 3.4);
		ctx.fillStyle = r === 0 && c === 0 ? "#1a1c1a" : "#2a2e2a";
		ctx.fillRect(x, y, 22, 12);
		ctx.fillStyle = "#d4af37";
		ctx.fillRect(x + 2, y + 3, 3, 6);
		ctx.fillRect(x + 17, y + 3, 3, 6);
	}
	ctx.fillStyle = "#111";
	ctx.fillRect(-18, -12, 36, 28);
	ctx.fillStyle = "#c5d0c2";
	ctx.font = "500 8px 'IBM Plex Mono', monospace";
	ctx.textAlign = "center";
	ctx.fillText("U1", 0, 4);
	if (inspection?.detections.some((d) => d.label.includes("bridge"))) {
		ctx.strokeStyle = "#c9a227";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(10, 18);
		ctx.lineTo(28, 18);
		ctx.stroke();
	}
}
function drawTile(ctx, pw, ph, seed, inspection) {
	const s = Math.min(pw, ph) * .72;
	ctx.fillStyle = "#d8d2c4";
	ctx.fillRect(-s / 2, -s / 2, s, s);
	for (let i = 0; i < 40; i++) {
		const x = -s / 2 + hash(seed + i) * s;
		const y = -s / 2 + hash(seed + i * 9) * s;
		ctx.fillStyle = `rgba(120, 110, 95, ${.04 + hash(i) * .08})`;
		ctx.beginPath();
		ctx.arc(x, y, 8 + hash(i * 3) * 14, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.strokeStyle = "rgba(14,16,15,0.18)";
	ctx.strokeRect(-s / 2, -s / 2, s, s);
	if (inspection?.detections.some((d) => d.label.includes("crack"))) {
		ctx.strokeStyle = "rgba(40, 36, 32, 0.7)";
		ctx.lineWidth = 1.4;
		ctx.beginPath();
		ctx.moveTo(-s * .1, -s * .3);
		ctx.lineTo(0, -s * .02);
		ctx.lineTo(s * .22, s * .18);
		ctx.stroke();
	}
	if (inspection?.detections.some((d) => d.label.includes("chip"))) {
		ctx.fillStyle = "#121511";
		ctx.beginPath();
		ctx.moveTo(s / 2, -s / 2);
		ctx.lineTo(s / 2 - 16, -s / 2);
		ctx.lineTo(s / 2, -s / 2 + 14);
		ctx.fill();
	}
}
function drawCarton(ctx, pw, ph, seed, inspection) {
	const w = pw * .8;
	const h = ph * .56;
	ctx.fillStyle = "#c4a574";
	ctx.fillRect(-w / 2, -h / 2, w, h);
	ctx.fillStyle = "#efe7d6";
	ctx.fillRect(-w / 2 + 10, -h / 2 + 10, w * .42, h * .38);
	ctx.fillStyle = "#3d453c";
	ctx.font = "600 12px 'IBM Plex Sans', sans-serif";
	ctx.textAlign = "left";
	ctx.fillText("LOT A4", -w / 2 + 16, -h / 2 + 28);
	const badCode = inspection?.detections.some((d) => d.label.includes("barcode"));
	const x0 = w / 2 - 88;
	const y0 = h / 2 - 36;
	for (let i = 0; i < 28; i++) {
		const bw = 1 + hash(seed + i) * 2.4;
		ctx.fillStyle = badCode && i % 7 === 0 ? "rgba(40,40,40,0.2)" : "#1a1c1a";
		ctx.fillRect(x0 + i * 2.6, y0, bw, 22);
	}
	if (inspection?.detections.some((d) => d.label.includes("register"))) {
		ctx.strokeStyle = "#c45c4a";
		ctx.strokeRect(-w / 2 + 14, -h / 2 + 14, w * .42, h * .38);
	}
}
var DUR = {
	idle: 0,
	incoming: 700,
	inspecting: 1100,
	decided: 900,
	outgoing: 550
};
function LiveCamera({ recipeId, inspection, phase, onPhaseEnd, showGrid }) {
	const canvasRef = (0, import_react.useRef)(null);
	const phaseRef = (0, import_react.useRef)(phase);
	const inspectionRef = (0, import_react.useRef)(inspection);
	const recipeRef = (0, import_react.useRef)(recipeId);
	const gridRef = (0, import_react.useRef)(showGrid);
	const onEndRef = (0, import_react.useRef)(onPhaseEnd);
	const startedAt = (0, import_react.useRef)(performance.now());
	const firedKey = (0, import_react.useRef)("");
	phaseRef.current = phase;
	inspectionRef.current = inspection;
	recipeRef.current = recipeId;
	gridRef.current = showGrid;
	onEndRef.current = onPhaseEnd;
	(0, import_react.useEffect)(() => {
		startedAt.current = performance.now();
		firedKey.current = "";
	}, [phase, inspection?.id]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const loop = () => {
			const cssW = canvas.parentElement?.clientWidth ?? 640;
			const cssH = Math.round(cssW * .75);
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
				reduced
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-lg bg-elevated shadow-[0_0_0_1px_rgb(232_235_228_/_8%)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block w-full",
			"aria-label": "HuskyLens 2 live view"
		})
	});
}
var ACTIVE = {
	idle: [],
	incoming: ["capture"],
	inspecting: [
		"capture",
		"edge",
		"link"
	],
	decided: [
		"capture",
		"edge",
		"link",
		"fusion",
		"verdict"
	],
	outgoing: ["verdict"]
};
function PipelineRail({ phase }) {
	const lit = new Set(ACTIVE[phase]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6",
		children: PIPELINE_STAGES.map((stage, i) => {
			const on = lit.has(stage.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("rounded-md bg-surface px-3 py-2.5 shadow-[0_0_0_1px_rgb(232_235_228_/_8%)] transition-colors duration-200", on && "shadow-[0_0_0_1px_rgb(197_208_194_/_35%)]"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-wider text-subtle",
						children: String(i + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("text-sm font-medium", on ? "text-fg" : "text-muted"),
						children: stage.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-[11px] text-subtle",
						children: stage.device
					})
				]
			}, stage.id);
		})
	});
}
var TONE = {
	pass: "pass",
	fail: "fail",
	hold: "hold"
};
function VerdictPanel({ inspection, onOverride, onDiagnose, diagnosing }) {
	if (!inspection) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Verdict" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Run a unit to fill this pane." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "HuskyLens 2 holds the frame. RDK X5 applies specs, then LineSight stamps pass, fail or hold."
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: ["Unit ", String(inspection.unitIndex).padStart(4, "0")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
			className: "font-mono",
			children: inspection.sku
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: TONE[inspection.verdict],
			className: "uppercase",
			children: inspection.verdict
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Quality score"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-3xl font-medium tracking-tight tabular-nums",
				children: formatPct(inspection.score, 1)
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs text-muted tabular-nums",
				children: [inspection.cycleMs, " ms"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mb-4 space-y-2",
			children: inspection.measurements.map((m) => {
				const st = measurementStatus(m);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-baseline justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: m.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: st === "fail" ? "font-mono text-fail tabular-nums" : "font-mono tabular-nums",
						children: [
							m.value,
							" ",
							m.unit
						]
					})]
				}, m.name);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "pass",
					size: "sm",
					onClick: () => onOverride("pass"),
					children: "Pass"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "hold",
					size: "sm",
					onClick: () => onOverride("hold"),
					children: "Hold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "fail",
					size: "sm",
					onClick: () => onOverride("fail"),
					children: "Fail"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			className: "mt-3 w-full",
			onClick: onDiagnose,
			disabled: diagnosing,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-4" }), diagnosing ? "Diagnosing…" : "Diagnose with Grok"]
		}),
		inspection.grokNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 whitespace-pre-wrap text-xs leading-relaxed text-muted",
			children: inspection.grokNote
		}) : null
	] });
}
function DetectionList({ inspection }) {
	if (!inspection) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Detections" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Blocks from HuskyLens 2" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Waiting for a frame."
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Detections" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHint, { children: [inspection.detections.length, " blocks this cycle"] })] }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: inspection.detections.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate",
						children: d.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] text-subtle",
						children: d.kind
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [d.severity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: d.severity === "critical" ? "fail" : d.severity === "major" ? "hold" : "muted",
						children: d.severity
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tabular-nums text-muted",
						children: (d.confidence * 100).toFixed(0)
					})]
				})]
			}, d.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-[11px] text-subtle",
			children: ["Algos: ", inspection.huskyAlgos.map(algoLabel).join(" · ")]
		})
	] });
}
function HardwarePills({ inspecting, algo }) {
	const [hw, setHw] = (0, import_react.useState)(() => nextHardware({
		inspecting,
		algo,
		t: 0
	}));
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			setHw(nextHardware({
				inspecting,
				algo,
				t: Date.now()
			}));
		}, 800);
		return () => window.clearInterval(id);
	}, [inspecting, algo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
		className: "grid grid-cols-2 gap-2 lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "HuskyLens 2",
				value: `${hw.husky.fps.toFixed(0)} fps`,
				hint: `${hw.husky.tempC}°C · ${hw.husky.tops} TOPS`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "RDK X5 BPU",
				value: `${hw.rdk.bpuLoad}%`,
				hint: `${hw.rdk.bpuTops} TOPS · ${hw.rdk.memUsedGb} GB`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "CPU load",
				value: `${hw.rdk.cpuLoad}%`,
				hint: hw.rdk.cpu
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Link",
				value: `${hw.link.latencyMs} ms`,
				hint: hw.link.medium
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface px-3 py-2.5 shadow-[0_0_0_1px_rgb(232_235_228_/_8%)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-[11px] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "font-mono text-lg tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-[11px] text-subtle",
				children: hint
			})
		]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:bg-accent data-[state=unchecked]:bg-elevated", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-fg shadow transition-transform data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-accent-fg" })
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var diagnoseInspection = createServerFn({ method: "POST" }).validator((data) => Input.parse(data)).handler(createSsrRpc("59a2fcc0e31cd48435923d36a45d57aaf12c3fa775a2e96b5eecd6b958fd7b9a"));
function StationView() {
	const recipeId = useQc((s) => s.recipeId);
	const current = useQc((s) => s.current);
	const auto = useQc((s) => s.auto);
	const grid = useQc((s) => s.grid);
	const history = useQc((s) => s.history);
	const lot = useQc((s) => s.lot);
	const inspectNext = useQc((s) => s.inspectNext);
	const setAuto = useQc((s) => s.setAuto);
	const setGrid = useQc((s) => s.setGrid);
	const overrideVerdict = useQc((s) => s.overrideVerdict);
	const attachGrok = useQc((s) => s.attachGrok);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [diagnosing, setDiagnosing] = (0, import_react.useState)(false);
	const recipe = recipeOf(recipeId);
	const lotRows = (0, import_react.useMemo)(() => history.filter((r) => r.lotId === lot.id), [history, lot.id]);
	const stats = yieldOf(lotRows);
	const busy = phase === "incoming" || phase === "inspecting" || phase === "outgoing";
	const startUnit = (0, import_react.useCallback)(() => {
		inspectNext();
		setPhase("incoming");
	}, [inspectNext]);
	const onPhaseEnd = (0, import_react.useCallback)((ended) => {
		if (ended === "incoming") setPhase("inspecting");
		else if (ended === "inspecting") setPhase("decided");
		else if (ended === "decided") {
			if (useQc.getState().auto) setPhase("outgoing");
		} else if (ended === "outgoing") {
			setPhase("idle");
			if (useQc.getState().auto) window.setTimeout(() => {
				if (!useQc.getState().auto) return;
				useQc.getState().inspectNext();
				setPhase("incoming");
			}, 160);
		}
	}, []);
	const advance = (0, import_react.useCallback)(() => {
		if (busy) return;
		if (phase === "idle") startUnit();
		else if (phase === "decided") setPhase("outgoing");
	}, [
		busy,
		phase,
		startUnit
	]);
	const toggleAuto = (0, import_react.useCallback)((on) => {
		setAuto(on);
		if (!on) return;
		if (phase === "idle") startUnit();
		if (phase === "decided") setPhase("outgoing");
	}, [
		phase,
		setAuto,
		startUnit
	]);
	const onOverride = (v) => {
		if (!current) return;
		overrideVerdict(current.id, v);
		toast.message(`Marked ${v}`);
	};
	const onDiagnose = async () => {
		if (!current) return;
		setDiagnosing(true);
		try {
			const result = await diagnoseInspection({ data: {
				recipeName: recipe.name,
				sku: current.sku,
				sector: recipe.sector,
				verdict: current.verdict,
				score: current.score,
				detections: current.detections.map((d) => ({
					label: d.label,
					confidence: d.confidence,
					kind: d.kind,
					severity: d.severity
				})),
				measurements: current.measurements
			} });
			if (!result.ok) {
				toast.error(result.error);
				return;
			}
			attachGrok(current.id, result.text);
		} catch {
			toast.error("Diagnosis failed.");
		} finally {
			setDiagnosing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted uppercase",
						children: recipe.sector
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium tracking-tight",
						children: recipe.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted",
						children: recipe.summary
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-11 items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: auto,
							onCheckedChange: toggleAuto
						}), "Auto line"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-11 items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: grid,
							onCheckedChange: setGrid
						}), "Grid"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardwarePills, {
				inspecting: busy,
				algo: recipe.huskyAlgos[0] ?? "object_recognition"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCamera, {
						recipeId,
						inspection: current,
						phase,
						onPhaseEnd,
						showGrid: grid
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: advance,
								disabled: busy,
								children: phase === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, {}), " Inspect unit"] }) : phase === "decided" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, {}), " Next unit"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}), " Inspecting"] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => toggleAuto(!auto),
								children: [auto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), auto ? "Stop line" : "Start line"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ml-auto self-center font-mono text-xs text-muted tabular-nums",
								children: [
									"Lot ",
									stats.n,
									"/",
									lot.targetQty,
									" · ",
									stats.yieldPct.toFixed(1),
									"% yield"
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerdictPanel, {
						inspection: current,
						onOverride,
						onDiagnose,
						diagnosing
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetectionList, { inspection: current })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineRail, { phase })
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationView, {});
}
//#endregion
export { Home as component };
