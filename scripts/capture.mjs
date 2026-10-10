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
await page.getByRole("button", { name: "치이카와 입문하기" }).click();
await ready();
await page.screenshot({ path: "artifacts/briefing.png" });
await page.keyboard.press("Escape");
await page.getByRole("button", { name: "대화 연습", exact: true }).click();
await page
  .getByRole("button", { name: "기본 3문항 연습", exact: true })
  .click();
await page.getByRole("button", { name: "처음 보는데, 어떤 캐릭터야?" }).click();
await page.screenshot({ path: "artifacts/practice.png" });
await page.keyboard.press("Escape");
await page.setViewportSize({ width: 390, height: 844 });
await page.locator("h1").click();
await ready();
await page.screenshot({ path: "artifacts/mobile.png", fullPage: true });
await page.getByRole("button", { name: "프리미엄 구성 보기" }).click();
await ready();
await page.screenshot({ path: "artifacts/premium.png" });
await page.keyboard.press("Escape");
await page.getByRole("button", { name: "밈 퀴즈 풀기" }).click();
await page
  .getByRole("dialog")
  .getByRole("button", { name: "하치와레", exact: false })
  .click();
await page.screenshot({ path: "artifacts/meme-quiz.png" });
await page.keyboard.press("Escape");
await page
  .getByRole("button", { name: "상황 고르고 연습하기", exact: true })
  .click();
await page.screenshot({ path: "artifacts/conversation-picker.png" });
const conversation = page.getByRole("dialog");
await conversation.getByRole("button", { name: /친구의 캐릭터 굿즈/ }).click();
await conversation
  .getByRole("button", { name: "처음 보는데, 어떤 캐릭터야?", exact: true })
  .click();
await page.screenshot({ path: "artifacts/conversation-branch.png" });
await conversation
  .getByRole("button", { name: "이어서 답하기", exact: true })
  .click();
await conversation
  .getByRole("button", {
    name: "그런 모습이 나오는 장면 하나 보여줄래?",
    exact: true,
  })
  .click();
await conversation
  .getByRole("button", { name: "대화 메모 만들기", exact: true })
  .click();
await page.screenshot({ path: "artifacts/conversation-memo.png" });
await conversation
  .getByRole("button", { name: "대화 메모 저장", exact: true })
  .click();
await page.keyboard.press("Escape");
await page
  .getByRole("region", { name: "내 대화 메모", exact: true })
  .scrollIntoViewIfNeeded();
await page.screenshot({ path: "artifacts/conversation-saved.png" });
assert.deepEqual(errors, []);
assert.deepEqual(failedResponses, []);
const result = {
  url,
  httpStatus: response.status(),
  viewportWidths: [1440, 390],
  runtimeErrors: errors,
  failedResponses,
  screenshots: [
    "desktop.png",
    "mobile.png",
    "briefing.png",
    "practice.png",
    "premium.png",
    "meme-quiz.png",
    "conversation-picker.png",
    "conversation-branch.png",
    "conversation-memo.png",
    "conversation-saved.png",
  ],
};
await writeFile(
  "artifacts/visual-check.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result));
await browser.close();
