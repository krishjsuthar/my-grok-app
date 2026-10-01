import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const html = path.resolve("scripts/pipeline-report.html");
const dests = [
  path.resolve("public/LineSight-Pipeline-Synthesis.pdf"),
  path.resolve("artifacts/LineSight-Pipeline-Synthesis.pdf"),
];

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto(`file://${html}`, { waitUntil: "load" });
await mkdir(path.dirname(dests[1]), { recursive: true });
const buf = await page.pdf({
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
for (const dest of dests) {
  await mkdir(path.dirname(dest), { recursive: true });
  const { writeFile } = await import("node:fs/promises");
  await writeFile(dest, buf);
  console.log("wrote", dest, buf.length);
}
