import test from "node:test";
import assert from "node:assert/strict";
import {
  topics,
  briefingIds,
  questions,
  memeQuestions,
} from "../src/lib/content.ts";
import { filterTopics } from "../src/lib/domain.ts";
const base = { category: "전체", query: "", unreadOnly: false, readIds: [] };
test("입문 코스는 치이카와 세 캐릭터를 구분한다", () => {
  assert.deepEqual(briefingIds, ["chiikawa", "hachiware", "usagi"]);
  for (const id of briefingIds) {
    const topic = topics.find((t) => t.id === id);
    assert.ok(topic?.recognition);
    assert.ok(topic?.usage);
  }
});
test("별명과 원어로도 같은 콘텐츠를 찾는다", () => {
  for (const [query, id] of [
    ["먼작귀", "chiikawa"],
    ["망곰", "mangom"],
    ["ハチワレ", "hachiware"],
    [" CHIIKAWA ", "chiikawa"],
  ]) {
    assert.ok(
      filterTopics(topics, { ...base, query }).some((t) => t.id === id),
      query,
    );
  }
});
test("대화 연습과 지식 퀴즈는 각각 완결된 세 문항이다", () => {
  for (const set of [questions, memeQuestions]) {
    assert.equal(set.length, 3);
    for (const q of set) {
      assert.ok(q.options[q.correct]);
      assert.ok(q.explanation);
    }
  }
  assert.notDeepEqual(questions, memeQuestions);
});
