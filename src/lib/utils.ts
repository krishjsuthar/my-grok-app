import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPct(n: number, digits = 1) {
  return `${n.toFixed(digits)}%`;
}

export function formatMs(n: number) {
  return `${Math.round(n)} ms`;
}

export function shortId(id: string) {
  return id.slice(-6).toUpperCase();
}
