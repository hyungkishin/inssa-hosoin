"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowCounterClockwise,
  BookmarkSimple,
  Check,
  Copy,
  ChatsCircle,
  BookOpen,
} from "@phosphor-icons/react";
import {
  memoOutcomes as outcomes,
  scenarios,
  type ConversationMemo,
} from "@/lib/conversations";

export function ScenarioChoices({
  onChoose,
}: {
  onChoose: (id: string) => void;
}) {
  return (
    <div className="scenario-choices">
      {scenarios.map((s, index) => (
        <button
          key={s.id}
          className="scenario-choice"
          onClick={() => onChoose(s.id)}
        >
          <span
            className={`scenario-icon scenario-icon-${index}`}
            aria-hidden="true"
          >
            {index === 0 ? (
              <BookmarkSimple size={24} />
            ) : index === 1 ? (
              <BookOpen size={24} />
            ) : (
              <ChatsCircle size={24} />
            )}
          </span>
          <span>
            <small>{s.label}</small>
            <strong>{s.title}</strong>
          </span>
          <ArrowRight size={18} />
        </button>
      ))}
    </div>
  );
}

export function Conversation({
  initialId,
  memo,
  onSave,
  onRead,
  onBasic,
}: {
  initialId?: string;
  memo?: ConversationMemo;
  onSave: (memo: ConversationMemo) => boolean;
  onRead: (id: string) => void;
  onBasic: () => void;
}) {
  const [scenarioId, setScenarioId] = useState(initialId);
  const [stage, setStage] = useState<"opening" | "followup" | "memo">(
    memo ? "memo" : "opening",
  );
  const [openingIndex, setOpeningIndex] = useState<number>();
  const [followUpIndex, setFollowUpIndex] = useState<number>();
  const [opener, setOpener] = useState(memo?.opener ?? "");
  const [followUp, setFollowUp] = useState(memo?.followUp ?? "");
  const [notice, setNotice] = useState("");
  const [contextOpen, setContextOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const scenario = scenarios.find((s) => s.id === scenarioId);
  const opening =
    openingIndex === undefined ? undefined : scenario?.openings[openingIndex];
  const chosenFollowUp =
    followUpIndex === undefined ? undefined : opening?.followUps[followUpIndex];
  useEffect(() => {
    heading.current?.closest("dialog")?.scrollTo({ top: 0 });
    heading.current?.focus({ preventScroll: true });
  }, [scenarioId, stage]);
  const choose = (id?: string) => {
    setScenarioId(id);
    setStage("opening");
    setOpeningIndex(undefined);
    setFollowUpIndex(undefined);
    setOpener("");
    setFollowUp("");
    setNotice("");
    setContextOpen(false);
  };
  const status = (
    <p
      className="memo-notice"
      role="status"
      aria-label="대화 메모 알림"
      aria-live="polite"
    >
      {notice}
    </p>
  );
  if (!scenario)
    return (
      <div className="conversation-flow">
        <p className="section-kicker">상황별 대화 연습</p>
        <h2 ref={heading} tabIndex={-1}>
          지금 어떤 상황인가요?
        </h2>
        <p className="flow-description">
          모르는 걸 물어보고, 들은 말에 이어서 답해 봐요.
        </p>
        <ScenarioChoices onChoose={choose} />
        <div className="flow-bottom">
          <span>선택에 따라 이어지는 예시 대화예요.</span>
          <button className="text-button" onClick={onBasic}>
            기본 3문항 연습 <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  return (
    <div className="conversation-flow">
      <div className="flow-top">
        <span className="section-kicker">{scenario.title}</span>
        <button className="text-button" onClick={() => choose()}>
          상황 다시 고르기
        </button>
      </div>
      <h2 ref={heading} tabIndex={-1}>
        {stage === "memo"
          ? "내 말로 정리해 두세요"
          : stage === "opening"
            ? "첫마디를 골라보세요"
            : "들은 말에 이어서 답해봐요"}
      </h2>
      <p className="flow-description">
        {stage === "memo"
          ? "정해진 대본은 아니에요. 내 말투에 맞게 고쳐도 돼요."
          : scenario.situation}
      </p>
      <div className="flow-steps" aria-label="연습 진행">
        <span className={stage === "opening" ? "current" : ""}>1 첫마디</span>
        <i />
        <span className={stage === "followup" ? "current" : ""}>
          2 이어가기
        </span>
        <i />
        <span className={stage === "memo" ? "current" : ""}>3 내 메모</span>
      </div>
      {stage !== "memo" ? (
        <>
          <div className="chat-transcript" aria-label="예시 대화">
            <div className="chat-line">
              <span>친구</span>
              <p>{scenario.message}</p>
            </div>
            {opening && (
              <>
                <div className="chat-line mine">
                  <span>내 선택</span>
                  <p>{opening.text}</p>
                </div>
                <div className="chat-line">
                  <span>친구 · 예시 답변</span>
                  <p>{opening.reply}</p>
                </div>
              </>
            )}
            {chosenFollowUp && (
              <>
                <div className="chat-line mine">
                  <span>내 선택</span>
                  <p>{chosenFollowUp.text}</p>
                </div>
                <div className="chat-line">
                  <span>친구 · 예시 답변</span>
                  <p>{chosenFollowUp.reply}</p>
                </div>
              </>
            )}
          </div>
          {stage === "opening" && (
            <>
              <details
                className="flow-context"
                open={contextOpen}
                onToggle={(event) => setContextOpen(event.currentTarget.open)}
              >
                <summary>잘 몰라도 괜찮아요 · 상황 도움말</summary>
                <p>{scenario.context}</p>
                {scenario.topicId && (
                  <button
                    className="text-button"
                    onClick={() => onRead(scenario.topicId!)}
                  >
                    관련 도감 읽기 <ArrowRight size={16} />
                  </button>
                )}
              </details>
              {openingIndex === undefined && (
                <p className="flow-hint">{scenario.hint}</p>
              )}
            </>
          )}
          {(stage === "opening"
            ? openingIndex === undefined
            : followUpIndex === undefined) && (
            <div
              className="flow-options"
              role="group"
              aria-label={stage === "opening" ? "첫마디 선택" : "후속질문 선택"}
            >
              {(stage === "opening"
                ? scenario.openings
                : (opening?.followUps ?? [])
              ).map((option, index) => (
                <button
                  key={option.text}
                  onClick={() => {
                    if (stage === "opening") {
                      setOpeningIndex(index);
                      setOpener(option.text);
                    } else {
                      setFollowUpIndex(index);
                      setFollowUp(option.text);
                    }
                  }}
                >
                  {option.text}
                  <ArrowRight size={17} />
                </button>
              ))}
            </div>
          )}
          {(stage === "opening" ? opening : chosenFollowUp) && (
            <>
              <div
                className="flow-feedback"
                role="status"
                aria-label="대화 피드백"
              >
                <Check size={18} />
                <p>{(stage === "opening" ? opening : chosenFollowUp)?.note}</p>
              </div>
              <button
                className="button primary flow-next"
                onClick={() => {
                  setNotice("");
                  setStage(stage === "opening" ? "followup" : "memo");
                }}
              >
                {stage === "opening" ? "이어서 답하기" : "대화 메모 만들기"}
                <ArrowRight size={18} />
              </button>
              <button
                className="text-button flow-retry"
                onClick={() => {
                  if (stage === "opening") setOpeningIndex(undefined);
                  else setFollowUpIndex(undefined);
                }}
              >
                다른 답변 골라보기
              </button>
            </>
          )}
          <p className="flow-disclaimer">
            미리 작성한 예시예요. 실제 상대의 반응은 다를 수 있어요.
          </p>
        </>
      ) : (
        <>
          <div className="memo-editor">
            <label>
              내 첫마디
              <textarea
                maxLength={180}
                value={opener}
                onChange={(event) => {
                  setOpener(event.target.value);
                  setNotice("");
                }}
                rows={2}
              />
            </label>
            <label>
              내 후속질문·반응
              <textarea
                maxLength={180}
                value={followUp}
                onChange={(event) => {
                  setFollowUp(event.target.value);
                  setNotice("");
                }}
                rows={2}
              />
            </label>
          </div>
          <p className="memo-caution">{scenario.caution}</p>
          <div className="memo-actions">
            <button
              className="button primary"
              disabled={!opener.trim() || !followUp.trim()}
              onClick={() => {
                const saved = onSave({
                  scenarioId: scenario.id,
                  opener: opener.trim(),
                  followUp: followUp.trim(),
                  outcome: "untried",
                });
                setNotice(
                  saved
                    ? "이 브라우저에 저장했어요. 실제로 써본 뒤 메모에서 기록해 보세요."
                    : "저장할 수 없어요. 문장을 복사해 따로 보관해 주세요.",
                );
              }}
            >
              <BookmarkSimple size={18} />
              대화 메모 저장
            </button>
            <button
              className="button secondary"
              disabled={!opener.trim() || !followUp.trim()}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    `${scenario.title}\n첫마디: ${opener.trim()}\n이어서: ${followUp.trim()}`,
                  );
                  setNotice("대화 메모를 복사했어요.");
                } catch {
                  setNotice(
                    "복사할 수 없어요. 위 문장을 선택해 직접 복사해 주세요.",
                  );
                }
              }}
            >
              <Copy size={18} />
              대화 메모 복사
            </button>
          </div>
          {status}
          <p className="flow-disclaimer">
            저장과 사용 기록은 이 브라우저에만 남아요. 다른 사람에게 공개되지
            않아요.
          </p>
          <button
            className="text-button flow-retry"
            onClick={() => choose(scenario.id)}
          >
            <ArrowCounterClockwise size={16} />
            다른 답변으로 다시 연습
          </button>
        </>
      )}
    </div>
  );
}

export function MemoList({
  memos,
  ready,
  onOpen,
  onOutcome,
  onDelete,
}: {
  memos: ConversationMemo[];
  ready: boolean;
  onOpen: (memo: ConversationMemo) => void;
  onOutcome: (id: string, outcome: ConversationMemo["outcome"]) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <section className="memo-section" aria-label="내 대화 메모">
      <div className="section-title">
        <div>
          <h2>
            내 대화 메모 <span>{memos.length}</span>
          </h2>
          <p>실제로 써본 뒤 어땠는지 남겨보세요. 내 기기에만 기록해요.</p>
        </div>
      </div>
      {!memos.length ? (
        <div className="memo-empty">
          <BookmarkSimple size={23} />
          <div>
            <strong>저장한 대화 메모가 없어요</strong>
            <p>연습에서 고른 말을 내 말투로 고쳐 저장할 수 있어요.</p>
          </div>
        </div>
      ) : (
        <div className="memo-grid">
          {memos.map((memo) => {
            const scenario = scenarios.find((s) => s.id === memo.scenarioId)!;
            return (
              <article key={memo.scenarioId} className="memo-card">
                <div className="memo-card-top">
                  <h3>{scenario.title}</h3>
                  <button
                    className="text-button"
                    aria-label={`${scenario.title} 메모 삭제`}
                    onClick={() => onDelete(memo.scenarioId)}
                  >
                    삭제
                  </button>
                </div>
                <dl>
                  <dt>첫마디</dt>
                  <dd>{memo.opener}</dd>
                  <dt>이어서</dt>
                  <dd>{memo.followUp}</dd>
                </dl>
                <fieldset className="memo-outcomes" disabled={!ready}>
                  <legend>실제로 써봤나요?</legend>
                  {outcomes.map((outcome) => (
                    <button
                      key={outcome.id}
                      aria-pressed={memo.outcome === outcome.id}
                      onClick={() => onOutcome(memo.scenarioId, outcome.id)}
                    >
                      {outcome.label}
                    </button>
                  ))}
                </fieldset>
                <button
                  className="text-button"
                  aria-label={`${scenario.title} 메모 열기`}
                  onClick={() => onOpen(memo)}
                >
                  메모 열기 <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
