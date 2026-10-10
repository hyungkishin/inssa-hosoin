import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const url = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
const failedResponses = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400)
    failedResponses.push({ url: response.url(), status: response.status() });
});
async function ready() {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images, (image) => {
        image.loading = "eager";
        return image.decode();
      }),
    );
  });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
  );
}
const response = await page.goto(url, { waitUntil: "networkidle" });
assert.equal(response.status(), 200);
await ready();
await page.screenshot({ path: "artifacts/desktop.png", fullPage: true });
await page.getByRole("button", { name: "3분 브리핑 시작" }).click();
await ready();
await page.screenshot({ path: "artifacts/briefing.png" });
await page.keyboard.press("Escape");
await page.getByRole("button", { name: "대화 연습", exact: true }).click();
await page.getByRole("button", { name: "어떤 계기로 시작했어요?" }).click();
await page.screenshot({ path: "artifacts/practice.png" });
await page.keyboard.press("Escape");
await page.setViewportSize({ width: 390, height: 844 });
await page.locator("h1").click();
await ready();
await page.screenshot({ path: "artifacts/mobile.png", fullPage: true });
assert.deepEqual(errors, []);
assert.deepEqual(failedResponses, []);
const result = {
  url,
  httpStatus: response.status(),
  viewportWidths: [1440, 390],
  runtimeErrors: errors,
  failedResponses,
  screenshots: ["desktop.png", "mobile.png", "briefing.png", "practice.png"],
};
await writeFile(
  "artifacts/visual-check.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result));
await browser.close();
