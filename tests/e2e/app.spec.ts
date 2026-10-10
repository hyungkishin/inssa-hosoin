import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("검색과 분야 필터는 함께 적용되고 빈 결과를 초기화한다", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "밈·캐릭터 둘러보기" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "짤·표현", exact: true }).click();
  await expect(page.getByTestId("topic-card")).toHaveCount(1);
  await page.getByRole("searchbox").fill("This is fine");
  await expect(page.getByTestId("topic-card")).toHaveCount(1);
  await page.getByRole("searchbox").fill("없는검색어");
  await expect(page.getByText("조건에 맞는 밈이 없어요")).toBeVisible();
  await page.getByRole("button", { name: "필터 초기화" }).click();
  await expect(page.getByTestId("topic-card")).toHaveCount(6);
});

test("저장 상태는 새로고침 뒤 복원되고 저장함에서 해제할 수 있다", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "치이카와, 대체 누구야? 저장", exact: true })
    .click();
  await page.reload();
  await page
    .getByRole("button", { name: /저장한 밈/ })
    .first()
    .click();
  await expect(page.getByTestId("topic-card")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "치이카와, 대체 누구야? 저장 해제",
      exact: true,
    })
    .click();
  await expect(page.getByText("아직 저장한 밈이 없어요")).toBeVisible();
});

test("브리핑을 끝내면 읽음 상태와 완료 화면이 표시된다", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "치이카와 입문하기" }).click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "치이카와, 대체 누구야?" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "다음 소재" }).click();
  await dialog.getByRole("button", { name: "다음 소재" }).click();
  await dialog.getByRole("button", { name: "브리핑 마치기" }).click();
  await expect(dialog.getByText("세 캐릭터, 이제 구분돼요")).toBeVisible();
  await dialog.getByRole("button", { name: "닫기", exact: true }).click();
  await expect(page.getByTestId("read-count")).toHaveText("3 / 3");
  await page.reload();
  await expect(page.getByTestId("read-count")).toHaveText("3 / 3");
  await page.getByRole("checkbox", { name: "안 읽은 카드만" }).check();
  await expect(page.getByTestId("topic-card")).toHaveCount(3);
});

test("퀴즈는 답변 이유와 결과를 보여주고 다시 시작할 수 있다", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "대화 연습", exact: true }).click();
  await page
    .getByRole("button", { name: "기본 3문항 연습", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("button", { name: "처음 보는데, 어떤 캐릭터야?" })
    .click();
  await expect(dialog.getByText(/처음 본다고 말하고/)).toBeVisible();
  await dialog.getByRole("button", { name: "다음 질문" }).click();
  await dialog
    .getByRole("button", { name: "이름이 왜 이렇게 어려워?" })
    .click();
  await expect(dialog.getByText(/알게 된 특징을 짚고/)).toBeVisible();
  await dialog.getByRole("button", { name: "다음 질문" }).click();
  await dialog
    .getByRole("button", { name: "안 괜찮다는 뜻이지ㅠ 무슨 일 있어?" })
    .click();
  await dialog.getByRole("button", { name: "결과 보기" }).click();
  await expect(dialog.getByText("2 / 3")).toBeVisible();
  await dialog.getByRole("button", { name: "다시 연습하기" }).click();
  await expect(dialog.getByText("1 / 3")).toBeVisible();
});

test("키보드로 다이얼로그를 닫으면 열었던 버튼으로 돌아온다", async ({
  page,
}) => {
  await page.goto("/");
  const start = page.getByRole("button", { name: "치이카와 입문하기" });
  await start.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(start).toBeFocused();
});

test("클립보드로 대화 문장을 복사한다", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "한마디 복사", exact: true }).click();
  await expect(page.getByRole("status", { name: "알림" })).toContainText(
    "한마디를 복사했어요",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "아, 이게 치이카와구나",
  );
});

test("저장소가 차단되어도 화면을 사용할 수 있고 실패를 알린다", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("blocked", "SecurityError");
    };
  });
  await page.goto("/");
  await page
    .getByRole("button", { name: "치이카와, 대체 누구야? 저장", exact: true })
    .click();
  await expect(page.getByRole("status", { name: "알림" })).toContainText(
    "이 브라우저에 저장할 수 없어요",
  );
  await expect(
    page.getByRole("button", {
      name: "치이카와, 대체 누구야? 저장 해제",
      exact: true,
    }),
  ).toBeVisible();
});

test("손상된 저장 데이터는 복구하고 원문 링크를 제공한다", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("inssa-progress-v1", "{broken");
  });
  await page.goto("/");
  await page
    .getByTestId("topic-card")
    .first()
    .getByRole("button", { name: /치이카와, 대체/ })
    .first()
    .click();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: /공식 애니메이션/ }),
  ).toHaveAttribute("href", /anime-chiikawa.jp/);
});

test("데스크톱·모바일 화면과 다이얼로그의 접근성을 점검한다", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "밈·캐릭터 둘러보기" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
  await page.getByRole("button", { name: "치이카와 입문하기" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("브리핑의 다음 소재는 처음부터 읽을 수 있다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "치이카와 입문하기" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "다음 소재" }).click();
  await expect(
    dialog.getByRole("heading", { name: "파란 귀는 하치와레" }),
  ).toBeInViewport();
  expect(await dialog.evaluate((el) => el.scrollTop)).toBe(0);
});

test("복사 권한이 없으면 직접 복사 방법을 안내한다", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new DOMException("denied", "NotAllowedError");
        },
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "한마디 복사", exact: true }).click();
  await expect(page.getByRole("status", { name: "알림" })).toContainText(
    "문장을 선택해 직접 복사해 주세요",
  );
});

test("다른 탭의 저장 상태를 열린 화면에 반영한다", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const other = await context.newPage();
  await other.goto("/");
  await other
    .getByRole("button", { name: "치이카와, 대체 누구야? 저장", exact: true })
    .click();
  await expect(
    page.getByRole("button", {
      name: "치이카와, 대체 누구야? 저장 해제",
      exact: true,
    }),
  ).toBeVisible();
});

test("소재 상세에서도 복사 결과를 읽을 수 있다", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "치이카와 입문하기" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "대화 문장 복사" })
    .click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText(
    "한마디를 복사했어요",
  );
});

test("대화 연습의 질문과 답변 이유도 접근성 기준을 충족한다", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "대화 연습", exact: true }).click();
  await page
    .getByRole("button", { name: "기본 3문항 연습", exact: true })
    .click();
  await page
    .getByRole("button", { name: "처음 보는데, 어떤 캐릭터야?" })
    .click();
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    scan.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});

test("카드 하단의 읽기 버튼으로도 상세를 연다", async ({ page }) => {
  await page.goto("/");
  await page.getByText("가볍게 읽기", { exact: true }).first().click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "치이카와, 대체 누구야?" }),
  ).toBeVisible();
});

test("밈 반응은 새로고침 뒤 유지되고 다른 반응으로 바꿀 수 있다", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.getByTestId("topic-card").first();
  await card
    .getByRole("button", { name: "처음 알았어요", exact: true })
    .click();
  await page.reload();
  await expect(
    page
      .getByTestId("topic-card")
      .first()
      .getByRole("button", { name: "처음 알았어요", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByTestId("topic-card")
    .first()
    .getByRole("button", { name: "알고 있었어요", exact: true })
    .click();
  await expect(
    page
      .getByTestId("topic-card")
      .first()
      .getByRole("button", { name: "처음 알았어요", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("결제 미연결 상태는 관심 표시로 안내하고 결제로 오인시키지 않는다", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "프리미엄 구성 보기" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("월 3,900원", { exact: true })).toBeVisible();
  await dialog
    .getByRole("button", { name: "관심 있어요", exact: true })
    .click();
  await expect(
    dialog.getByRole("status", { name: "관심 표시 결과" }),
  ).toContainText("이 브라우저에 관심을 표시했어요");
  await expect(
    dialog.getByText(/관심 표시는 이 브라우저에만 저장해요/),
  ).toBeVisible();
});

test("별명 검색으로 입문 내용을 찾고 대화 연습과 밈 퀴즈를 각각 사용한다", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("searchbox").fill("먼작귀");
  await expect(page.getByTestId("topic-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "치이카와, 대체 누구야? 읽기", exact: true })
    .click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "이렇게 구분해요" }),
  ).toBeVisible();
  await expect(
    page.getByRole("dialog").getByText(/파란 귀는 하치와레/),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "밈 퀴즈 풀기", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "하치와레", exact: false }).click();
  await expect(dialog.getByText("맞았어요!", { exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "다음 질문" }).click();
  await dialog
    .getByRole("button", { name: "망그러진 곰", exact: false })
    .click();
  await dialog.getByRole("button", { name: "다음 질문" }).click();
  await dialog
    .getByRole("button", { name: "안 괜찮지만 애써 태연한 상태", exact: false })
    .click();
  await dialog.getByRole("button", { name: "결과 보기" }).click();
  await expect(dialog.getByText("3 / 3", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "대화 연습", exact: true }).click();
  await page
    .getByRole("button", { name: "기본 3문항 연습", exact: true })
    .click();
  await expect(
    page.getByRole("dialog").getByText(/친구가 치이카와 키링/),
  ).toBeVisible();
});

test("퀴즈 결과를 복사해 친구에게 공유할 수 있다", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "밈 퀴즈 풀기", exact: true }).click();
  const dialog = page.getByRole("dialog");
  for (const [answer, next] of [
    ["하치와레", "다음 질문"],
    ["망그러진 곰", "다음 질문"],
    ["안 괜찮지만 애써 태연한 상태", "결과 보기"],
  ]) {
    await dialog.getByRole("button", { name: answer, exact: false }).click();
    await dialog.getByRole("button", { name: next, exact: true }).click();
  }
  await dialog.getByRole("button", { name: "결과 복사해서 공유" }).click();
  await expect(dialog.getByRole("status", { name: "알림" })).toContainText(
    "결과를 복사했어요",
  );
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toContain("밈 퀴즈 3/3");
  expect(text).toContain(new URL(page.url()).origin);
});

test("프리미엄 안내와 밈 퀴즈의 접근성을 점검한다", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  for (const label of ["프리미엄 구성 보기", "밈 퀴즈 풀기"]) {
    await page.getByRole("button", { name: label }).click();
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    expect(
      await page
        .getByRole("dialog")
        .evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
    await page.keyboard.press("Escape");
  }
});
