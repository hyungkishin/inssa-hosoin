import test from "node:test";
import assert from "node:assert/strict";
import {
  filterTopics,
  parseProgress,
  toggleId,
  scoreAnswers,
  type Topic,
} from "../src/lib/domain.ts";
const topics = [
  {
    id: "run",
    category: "라이프",
    title: "러닝크루",
    subtitle: "함께 달리기",
    summary: "초보도 가볍게",
    opener: "달려본 적 있어요?",
  },
  {
    id: "tea",
    category: "먹거리",
    title: "말차",
    subtitle: "차 한 잔",
    summary: "쌉싸름한 맛",
    opener: "말차 좋아해요?",
  },
  {
    id: "camera",
    category: "라이프",
    title: "디지털카메라",
    subtitle: "사진",
    summary: "일상 기록",
    opener: "사진 찍어요?",
  },
] as Topic[];
const base = { category: "전체", query: "", unreadOnly: false, readIds: [] };
test("검색은 공백을 정리하고 분야 조건과 함께 적용한다", () => {
  assert.deepEqual(
    filterTopics(topics, {
      ...base,
      category: "라이프",
      query: "  초보  ",
    }).map((t) => t.id),
    ["run"],
  );
  assert.deepEqual(
    filterTopics(topics, { ...base, category: "먹거리", query: "러닝" }),
    [],
  );
});
test("읽지 않은 저장 주제만 조회한다", () => {
  assert.deepEqual(
    filterTopics(topics, {
      ...base,
      savedOnly: true,
      savedIds: ["run", "tea"],
      unreadOnly: true,
      readIds: ["run"],
    }).map((t) => t.id),
    ["tea"],
  );
});
test("일반 탐색은 저장 목록이 비어 있어도 전체 주제를 보여준다", () => {
  assert.equal(filterTopics(topics, { ...base, savedIds: [] }).length, 3);
});
test("저장 데이터는 중복과 알 수 없는 ID를 제거한다", () => {
  assert.deepEqual(
    parseProgress('{"saved":["run","run","unknown",3],"read":["tea"]}', [
      "run",
      "tea",
    ]),
    { saved: ["run"], read: ["tea"] },
  );
});
test("손상된 JSON이나 잘못된 타입은 빈 상태로 복구한다", () => {
  for (const raw of [
    null,
    "{broken",
    "null",
    "[]",
    '{"saved":"run","read":42}',
  ]) {
    assert.deepEqual(parseProgress(raw, ["run"]), { saved: [], read: [] });
  }
});
test("저장 버튼은 기존 항목을 해제하고 새 항목을 추가한다", () => {
  const ids = ["run"];
  assert.deepEqual(toggleId(ids, "run"), []);
  assert.deepEqual(toggleId(ids, "tea"), ["run", "tea"]);
  assert.deepEqual(ids, ["run"]);
});
test("답변이 없는 문항과 오답은 점수에 포함하지 않는다", () => {
  assert.equal(scoreAnswers([1, 0], [1, 2, 0]), 1);
  assert.equal(scoreAnswers([1, 2, 0], [1, 2, 0]), 3);
});
