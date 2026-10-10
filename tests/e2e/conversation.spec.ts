import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function start(page: Page) {
  await page.goto("/");
  await page
    .getByRole("button", { name: "상황 고르고 연습하기", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /친구의 캐릭터 굿즈/ })
    .click();
}
async function finish(page: Page) {
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("button", { name: "처음 보는데, 어떤 캐릭터야?", exact: true })
    .click();
  await expect(
    dialog.getByText("하치와레야. 겁이 나도 해보는 모습이 좋아.", {
      exact: true,
    }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "이어서 답하기", exact: true })
    .click();
  await dialog
    .getByRole("button", {
      name: "그런 모습이 나오는 장면 하나 보여줄래?",
      exact: true,
    })
    .click();
  await dialog
    .getByRole("button", { name: "대화 메모 만들기", exact: true })
    .click();
}

test("선택한 대화를 내 말로 고쳐 저장하고 실제 사용 상태를 복원한다", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await start(page);
  await finish(page);
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("textbox", { name: "내 첫마디", exact: true })
    .fill("그 키링 처음 보는데, 누구야?");
  await dialog
    .getByRole("button", { name: "대화 메모 복사", exact: true })
    .click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "그 키링 처음 보는데, 누구야?",
  );
  await dialog
    .getByRole("button", { name: "대화 메모 저장", exact: true })
    .click();
  await expect(
    dialog.getByRole("status", { name: "대화 메모 알림" }),
  ).toContainText("이 브라우저에 저장했어요");
  await page.keyboard.press("Escape");
  await page.reload();
  const memo = page.getByRole("region", { name: "내 대화 메모", exact: true });
  await expect(
    memo.getByText("그 키링 처음 보는데, 누구야?", { exact: true }),
  ).toBeVisible();
  await memo.getByRole("button", { name: "도움 됐어요", exact: true }).click();
  await page.reload();
  await expect(
    memo.getByRole("button", { name: "도움 됐어요", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await memo
    .getByRole("button", { name: "친구의 캐릭터 굿즈 메모 열기", exact: true })
    .click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("textbox", { name: "내 첫마디", exact: true }),
  ).toHaveValue("그 키링 처음 보는데, 누구야?");
  await page.keyboard.press("Escape");
  await memo
    .getByRole("button", { name: "친구의 캐릭터 굿즈 메모 삭제", exact: true })
    .click();
  await page.reload();
  await expect(
    memo.getByText("저장한 대화 메모가 없어요", { exact: true }),
  ).toBeVisible();
});

test("첫마디가 달라지면 상대 답변과 후속 선택지도 달라진다", async ({
  page,
}) => {
  await start(page);
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("button", { name: "요즘 다 그거 달고 다니더라.", exact: true })
    .click();
  await expect(
    dialog.getByText("응. 근데 난 유행하기 전부터 좋아했어.", { exact: true }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "이어서 답하기", exact: true })
    .click();
  await expect(
    dialog.getByRole("button", {
      name: "어떤 점 때문에 좋아하게 됐어?",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("button", {
      name: "그런 모습이 나오는 장면 하나 보여줄래?",
      exact: true,
    }),
  ).toHaveCount(0);
  await dialog
    .getByRole("button", { name: "상황 다시 고르기", exact: true })
    .click();
  await dialog.getByRole("button", { name: /처음 듣는 작품/ }).click();
  await expect(
    dialog.getByText("친구가 요즘 푹 빠진 작품 이야기를 해요.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    dialog.getByText("응. 근데 난 유행하기 전부터 좋아했어.", { exact: true }),
  ).toHaveCount(0);
});

test("저장 실패를 성공으로 표시하지 않고 빈 문장은 저장하지 않는다", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("blocked", "SecurityError");
    };
  });
  await start(page);
  await finish(page);
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("textbox", { name: "내 첫마디", exact: true })
    .fill("   ");
  await expect(
    dialog.getByRole("button", { name: "대화 메모 저장", exact: true }),
  ).toBeDisabled();
  await dialog
    .getByRole("textbox", { name: "내 첫마디", exact: true })
    .fill("어떤 캐릭터야?");
  await dialog
    .getByRole("button", { name: "대화 메모 저장", exact: true })
    .click();
  await expect(
    dialog.getByRole("status", { name: "대화 메모 알림" }),
  ).toContainText("저장할 수 없어요");
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(
    page
      .getByRole("region", { name: "내 대화 메모", exact: true })
      .getByText("저장한 대화 메모가 없어요"),
  ).toBeVisible();
});

test("손상되거나 알 수 없는 메모를 제외하고 정상 메모를 표시한다", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "inssa-conversations-v1",
      JSON.stringify([
        { scenarioId: "unknown", opener: "invalid", followUp: "invalid" },
        {
          scenarioId: "goods",
          opener: "이 캐릭터 좋아해?",
          followUp: "어떤 점이 좋아?",
          outcome: "helped",
        },
        { scenarioId: "show", opener: {}, followUp: "invalid" },
      ]),
    );
  });
  await page.goto("/");
  const memo = page.getByRole("region", { name: "내 대화 메모", exact: true });
  await expect(
    memo.getByText("이 캐릭터 좋아해?", { exact: true }),
  ).toBeVisible();
  await expect(memo.getByText("invalid", { exact: true })).toHaveCount(0);
  await expect(
    memo.getByRole("button", { name: "도움 됐어요", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("대화 메모 복사가 거부되면 직접 복사할 수 있도록 안내한다", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new DOMException("denied", "NotAllowedError");
        },
      },
    });
  });
  await start(page);
  await finish(page);
  await page
    .getByRole("button", { name: "대화 메모 복사", exact: true })
    .click();
  await expect(
    page.getByRole("status", { name: "대화 메모 알림" }),
  ).toContainText("직접 복사해 주세요");
});

test("320px에서 상황·대화·메모 화면에 넘침과 자동 접근성 위반이 없다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "상황 고르고 연습하기", exact: true })
    .click();
  const scan = async () => {
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(
      await page
        .getByRole("dialog")
        .evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
  };
  await scan();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /친구의 캐릭터 굿즈/ })
    .click();
  await scan();
  await finish(page);
  await scan();
  await page
    .getByRole("button", { name: "대화 메모 저장", exact: true })
    .click();
  await page.keyboard.press("Escape");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("다른 상황의 메모를 각각 보관하고 기존 사용 기록을 유지한다", async ({
  page,
}) => {
  await page.goto("/");
  for (const flow of [
    {
      title: "처음 듣는 작품",
      first: "난 아직 안 봤는데, 어떤 점이 재밌어?",
      reply: "둘이 맨날 싸우는데 정작 서로 제일 챙겨ㅋㅋ",
      next: "티격태격하는 관계 좋아하는구나ㅋㅋ",
    },
    {
      title: "뜻을 모르는 짤",
      first: "이 짤 처음 보는데, 괜찮다는 거야 아닌 거야?",
      reply: "안 괜찮다는 거ㅋㅋ 불났는데 괜찮다고 하는 짤이야.",
      next: "아ㅋㅋ 그럼 지금은 어떤 상황인데?",
    },
  ]) {
    await page
      .getByRole("main")
      .getByRole("button", { name: new RegExp(flow.title) })
      .click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: flow.first, exact: true }).click();
    await expect(dialog.getByText(flow.reply, { exact: true })).toBeVisible();
    await dialog
      .getByRole("button", { name: "이어서 답하기", exact: true })
      .click();
    await dialog.getByRole("button", { name: flow.next, exact: true }).click();
    await dialog
      .getByRole("button", { name: "대화 메모 만들기", exact: true })
      .click();
    await expect(
      dialog.getByRole("textbox", { name: "내 후속질문·반응", exact: true }),
    ).toHaveValue(flow.next);
    await dialog
      .getByRole("button", { name: "대화 메모 저장", exact: true })
      .click();
    await page.keyboard.press("Escape");
  }
  await page.reload();
  const memos = page.getByRole("region", { name: "내 대화 메모", exact: true });
  await expect(memos.getByRole("article")).toHaveCount(2);
  const showMemo = memos
    .getByRole("article")
    .filter({
      has: page.getByRole("heading", { name: "처음 듣는 작품", exact: true }),
    });
  await showMemo
    .getByRole("button", { name: "쓸 상황이 없었어요", exact: true })
    .click();
  await showMemo
    .getByRole("button", { name: "처음 듣는 작품 메모 열기", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "대화 메모 저장", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(
    showMemo.getByRole("button", { name: "쓸 상황이 없었어요", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(memos.getByRole("article")).toHaveCount(2);
});

test("대화 연습을 키보드로 닫으면 시작 버튼으로 돌아온다", async ({ page }) => {
  await page.goto("/");
  const startButton = page.getByRole("button", {
    name: "상황 고르고 연습하기",
    exact: true,
  });
  await startButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(startButton).toBeFocused();
});
