# LineSight

Edge AI quality inspection for MSME production lines.

**HuskyLens 2** (Kendryte K230, 6 TOPS) sees the unit. **RDK X5 8GB** (Bayes BPU, 10 TOPS) owns policy, specs and the reject gate. **LineSight** is the operator console: pass / fail / hold, lots, recipes, self-learn, on-demand diagnosis.

This repository is the LineSight console. The in-browser run uses a simulated HuskyLens feed so you can walk the full six-stage pipeline without hardware.

## Pipeline

1. **Capture** — GC2093 2 MP, 60 fps  
2. **Edge vision** — HuskyLens 2 YOLO / classify / instance seg / OCR / barcode / self-learn  
3. **Transport** — USB 3.0 + Gravity UART (HuskyLens V2 protocol)  
4. **Fusion & policy** — RDK X5 homography, spec limits, SPC, GPIO / CAN reject  
5. **Verdict** — LineSight pass / fail / hold + lot genealogy  
6. **Reasoning** — Grok CAPA on operator request (on-device fallback if quota is down)

Synthesis report: [public/LineSight-Pipeline-Synthesis.pdf](public/LineSight-Pipeline-Synthesis.pdf)

## MSME recipes

| Sector | SKU | Cycle |
| --- | --- | --- |
| Textiles — woven fabric | TX-WOV-240 | 420 ms |
| Food & beverage — bottled FMCG | PK-BTL-500 | 280 ms |
| Metal — stamped bracket | MT-BRK-08 | 360 ms |
| Electronics — SMT board | EL-PCB-12A | 510 ms |
| Ceramics — glazed tile | CR-TIL-300 | 390 ms |
| Packaging print — carton | PR-CTN-A4 | 310 ms |

## Run

```bash
npm install
npm run dev
```

Requires Node 22. The app binds `0.0.0.0:8080`.

`XAI_API_KEY` (server-only) enables Grok diagnosis. Without it, or on a 403 quota, LineSight writes an on-device Cause / Process / Operator / CAPA note.

## Scripts

| Command | What |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |

## Layout

```
src/routes/          Station, pipeline, lots, recipes, teach
src/lib/qc/          Recipes, simulation, hardware telemetry, scene draw
src/lib/ai/          Grok diagnose + on-device fallback
src/components/      Station HMI and chrome
public/              Favicon, share card, synthesis PDF
```

## Hardware (plant)

- DFRobot HuskyLens 2 SEN0638 — 6 TOPS, GC2093, MCP, custom YOLO  
- D-Robotics RDK X5 8GB — 8× A55, 10 TOPS BPU, Ubuntu 22.04, USB 3.0 host, CAN FD  

Wire HuskyLens on USB 3.0 (UART 115200 fallback). Reject solenoid on GPIO; press interlock on CAN for metal.
