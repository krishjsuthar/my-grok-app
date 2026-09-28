import { create } from "zustand";
import type { Inspection, Lot, RecipeId, TeachSample, Verdict } from "./types";
import { simulateInspection } from "./simulate";
import { recipeOf } from "./recipes";
import { newLotId, seedDemoLot } from "./seed";

const demo = seedDemoLot();

type QcState = {
  recipeId: RecipeId;
  lot: Lot;
  lots: Lot[];
  history: Inspection[];
  current: Inspection | null;
  auto: boolean;
  grid: boolean;
  samples: TeachSample[];
  unitCursor: number;
  inspectNext: () => Inspection;
  setRecipe: (id: RecipeId) => void;
  setAuto: (v: boolean) => void;
  setGrid: (v: boolean) => void;
  overrideVerdict: (id: string, verdict: Verdict) => void;
  attachGrok: (id: string, note: string) => void;
  addSample: (sample: TeachSample) => void;
  removeSample: (id: string) => void;
  startLot: () => void;
};

function openLot(recipeId: RecipeId, openedAt = 0): Lot {
  const recipe = recipeOf(recipeId);
  return {
    id: openedAt ? newLotId() : "lot-live",
    sku: recipe.sku,
    recipeId,
    name: `${recipe.name} · live`,
    openedAt,
    targetQty: 50,
  };
}

export const useQc = create<QcState>()((set, get) => ({
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
      timestamp: Date.now(),
    });
    set((s) => ({
      unitCursor: nextIndex,
      current: inspection,
      history: [...s.history, inspection].slice(-800),
    }));
    return inspection;
  },
  setRecipe: (id) => {
    set({
      recipeId: id,
      lot: openLot(id, 0),
      unitCursor: 0,
      current: null,
      auto: false,
    });
  },
  setAuto: (v) => set({ auto: v }),
  setGrid: (v) => set({ grid: v }),
  overrideVerdict: (id, verdict) =>
    set((s) => ({
      history: s.history.map((row) => (row.id === id ? { ...row, verdict } : row)),
      current: s.current?.id === id ? { ...s.current, verdict } : s.current,
    })),
  attachGrok: (id, note) =>
    set((s) => ({
      history: s.history.map((row) => (row.id === id ? { ...row, grokNote: note } : row)),
      current: s.current?.id === id ? { ...s.current, grokNote: note } : s.current,
    })),
  addSample: (sample) => set((s) => ({ samples: [sample, ...s.samples].slice(0, 40) })),
  removeSample: (id) => set((s) => ({ samples: s.samples.filter((x) => x.id !== id) })),
  startLot: () => {
    const { recipeId, lot, lots } = get();
    const closed = { ...lot, closedAt: Date.now() };
    set({
      lots: [closed, ...lots.filter((l) => l.id !== closed.id)],
      lot: openLot(recipeId, Date.now()),
      unitCursor: 0,
      current: null,
    });
  },
}));
