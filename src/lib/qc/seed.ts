import type { Inspection, Lot } from "./types";
import { RECIPE_LIST } from "./recipes";
import { simulateInspection } from "./simulate";

export const DEMO_LOT_ID = "lot-demo-a";
const DEMO_OPENED = 1_746_000_000_000;

export function seedDemoLot(): { lot: Lot; inspections: Inspection[] } {
  const recipe = RECIPE_LIST[2]!;
  const lot: Lot = {
    id: DEMO_LOT_ID,
    sku: recipe.sku,
    recipeId: recipe.id,
    name: "Bracket 08 · Shift A",
    openedAt: DEMO_OPENED,
    closedAt: DEMO_OPENED + 1000 * 60 * 60 * 5,
    targetQty: 48,
  };
  const inspections = Array.from({ length: 48 }, (_, i) =>
    simulateInspection({
      recipeId: recipe.id,
      lotId: lot.id,
      unitIndex: i + 1,
      seed: 24000 + i * 17,
    }),
  ).map((row, i) => ({
    ...row,
    timestamp: lot.openedAt + i * 6 * 60 * 1000,
  }));
  return { lot, inspections };
}

export function newLotId() {
  return `lot-${Date.now().toString(36)}`;
}
