"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowClockwise,
  BookmarkSimple,
  ChatTeardropDots,
  Check,
  Clock,
  Copy,
  MagnifyingGlass,
  X,
  ChatsCircle,
  BookOpen,
  Info,
} from "@phosphor-icons/react";
import { categories, topics, briefingIds } from "@/lib/content";
import {
  filterTopics,
  parseProgress,
  toggleId,
  type Progress,
  type Topic,
} from "@/lib/domain";
import { Dialog } from "./dialog";
import { Briefing } from "./briefing";
import { Quiz } from "./quiz";
import { Reaction } from "./reaction";
import { Premium } from "./premium";
import { Conversation, ScenarioChoices, MemoList } from "./conversation";
import {
  MEMO_KEY,
  parseMemos,
  type ConversationMemo,
  type MemoOutcome,
} from "@/lib/conversations";
const STORAGE_KEY = "inssa-progress-v1";
type Modal =
  | { kind: "briefing"; items: Topic[]; sequence: boolean }
  | { kind: "conversation"; id?: string; memo?: ConversationMemo }
  | { kind: "quiz" }
  | { kind: "knowledge" }
  | { kind: "premium" }
  | null;
export default function App() {
  const [view, setView] = useState<"all" | "saved">("all");
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [progress, setProgress] = useState<Progress>({ saved: [], read: [] });
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [memos, setMemos] = useState<ConversationMemo[]>([]);
  const [spotlight, setSpotlight] = useState(0);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const briefing = briefingIds.map(
    (id) => topics.find((topic) => topic.id === id)!,
  );
  const readCount = briefing.filter((topic) =>
    progress.read.includes(topic.id),
  ).length;
  const filtered = filterTopics(topics, {
    category,
    query,
    unreadOnly,
    readIds: progress.read,
    savedOnly: view === "saved",
    savedIds: progress.saved,
  });
  const picked = topics[spotlight];
  useEffect(() => {
    try {
      setProgress(
        parseProgress(
          localStorage.getItem(STORAGE_KEY),
          topics.map((t) => t.id),
        ),
      );
    } catch {
      /* Storage can be unavailable in restricted browsers. */
    }
    try {
      setMemos(parseMemos(localStorage.getItem(MEMO_KEY)));
    } catch {
      /* Storage may be unavailable. */
    }
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key === MEMO_KEY || event.key === null)
        setMemos(parseMemos(event.key === null ? null : event.newValue));
      if (event.key === STORAGE_KEY || event.key === null)
        setProgress(
          parseProgress(
            event.newValue,
            topics.map((t) => t.id),
          ),
        );
    };
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("storage", sync);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);
  const notify = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 6000);
  };
  const persist = (next: Progress, success?: string) => {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      if (success) notify(success);
    } catch {
      notify("이 브라우저에 저장할 수 없어요. 현재 화면에서만 유지돼요.");
    }
  };
  const save = (id: string) =>
    persist(
      { ...progress, saved: toggleId(progress.saved, id) },
      progress.saved.includes(id) ? "저장을 해제했어요" : "밈을 저장했어요",
    );
  const markRead = (id: string) => {
    if (!progress.read.includes(id))
      persist({ ...progress, read: [...progress.read, id] });
  };
  const copy = async (text: string, success = "한마디를 복사했어요") => {
    try {
      await navigator.clipboard.writeText(text);
      notify(success);
    } catch {
      notify("복사할 수 없어요. 문장을 선택해 직접 복사해 주세요.");
    }
  };
  const persistMemos = (next: ConversationMemo[]) => {
    try {
      localStorage.setItem(MEMO_KEY, JSON.stringify(next));
      setMemos(next);
      return true;
    } catch {
      return false;
    }
  };
  const saveMemo = (memo: ConversationMemo) => {
    const existing = memos.find((m) => m.scenarioId === memo.scenarioId);
    const next =
      existing &&
      existing.opener === memo.opener &&
      existing.followUp === memo.followUp
        ? { ...memo, outcome: existing.outcome }
        : memo;
    return persistMemos([
      next,
      ...memos.filter((m) => m.scenarioId !== memo.scenarioId),
    ]);
  };
  const changeOutcome = (id: string, outcome: MemoOutcome) => {
    if (
      persistMemos(
        memos.map((m) => (m.scenarioId === id ? { ...m, outcome } : m)),
      )
    )
      notify("내 사용 기록을 저장했어요. 다른 사람에게 공개되지 않아요.");
    else
      notify("기록을 저장할 수 없어요. 브라우저의 저장 설정을 확인해 주세요.");
  };
  const startConversation = (id?: string) =>
    setModal({ kind: "conversation", id });
  const reset = () => {
    setCategory("전체");
    setQuery("");
    setUnreadOnly(false);
  };
  const changeView = (next: "all" | "saved") => {
    setView(next);
    reset();
  };
  const startBriefing = () =>
    setModal({ kind: "briefing", items: briefing, sequence: true });
  const notification = (
    <div
      className={`toast ${toast ? "visible" : ""}`}
      role="status"
      aria-label="알림"
      aria-live="polite"
    >
      {toast && (
        <>
          <Info size={18} />
          <span>{toast}</span>
          <button aria-label="알림 닫기" onClick={() => setToast("")}>
            <X size={17} />
          </button>
        </>
      )}
    </div>
  );
  return (
    <>
      <a className="skip-link" href="#topics">
        본문으로 건너뛰기
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="인싸인척 홈">
            <span className="brand-symbol">
              <ChatTeardropDots size={29} weight="fill" />
            </span>
            인싸인척<span className="brand-dot">.</span>
          </a>
          <nav className="navigation" aria-label="주 메뉴">
            <button
              className={view === "all" ? "active" : ""}
              aria-current={view === "all" ? "page" : undefined}
              onClick={() => changeView("all")}
            >
              밈 도감
            </button>
            <button onClick={() => startConversation()}>대화 연습</button>
            <button
              className={view === "saved" ? "active" : ""}
              aria-current={view === "saved" ? "page" : undefined}
              onClick={() => changeView("saved")}
            >
              저장한 밈{" "}
              {progress.saved.length > 0 && (
                <span className="nav-count">{progress.saved.length}</span>
              )}
            </button>
          </nav>
          <span className="header-note">
            <Clock size={16} />
            취향은 달라도 대화는 이어지게
          </span>
        </div>
      </header>
      <main className="main-container">
        <div className="edition-line">
          <p>
            <span className="edition-label">
              상대의 취향이 궁금할 때, 한마디부터
            </span>
          </p>
          <span className="sample-label">
            <Info size={14} />
            입문 에디션
          </span>
        </div>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="hero-label">
              <Clock size={16} />
              첫마디부터 후속질문까지
            </span>
            <h1 id="hero-title">
              잘 몰라도,
              <br />
              대화는 이어지게.
            </h1>
            <p>
              친구가 좋아하는 것, 나는 처음 들어도.
              <br className="mobile-break" /> 물어보고 반응하는 말을 연습해
              보세요.
            </p>
            <button
              className="button primary hero-cta"
              onClick={() => startConversation()}
              disabled={!ready}
            >
              상황 고르고 연습하기
              <ArrowRight size={20} />
            </button>
            <span className="hero-footnote">로그인 없이 바로 연습해요</span>
          </div>
          <div className="hero-chat" aria-label="대화 연습 미리보기">
            <span className="preview-label">
              <ChatsCircle size={18} /> 이런 상황, 있죠?
            </span>
            <div className="preview-message">
              <span>친구</span>
              <p>이거 봐. 드디어 구했어!</p>
            </div>
            <div className="preview-message mine">
              <span>나</span>
              <p>처음 보는데, 어떤 캐릭터야?</p>
            </div>
            <div className="preview-message">
              <span>친구</span>
              <p>하치와레야. 겁이 나도 해보는 모습이 좋아.</p>
            </div>
            <div className="preview-next">
              <ArrowRight size={17} /> 이름 다음엔, 좋아하는 이유를 물어봐요.
            </div>
          </div>
        </section>
        <section
          className="scenario-section"
          aria-labelledby="scenario-heading"
        >
          <div className="section-title">
            <div>
              <h2 id="scenario-heading">지금 어떤 상황인가요?</h2>
              <p>선택에 따라 이어지는 예시 대화로 연습해요.</p>
            </div>
            <span className="scenario-duration">
              <Clock size={15} /> 상황당 약 1분
            </span>
          </div>
          <ScenarioChoices onChoose={startConversation} />
        </section>
        <MemoList
          memos={memos}
          ready={ready}
          onOpen={(memo) =>
            setModal({ kind: "conversation", id: memo.scenarioId, memo })
          }
          onOutcome={changeOutcome}
          onDelete={(id) => {
            if (persistMemos(memos.filter((m) => m.scenarioId !== id)))
              notify("대화 메모를 삭제했어요.");
            else
              notify(
                "메모를 삭제할 수 없어요. 브라우저의 저장 설정을 확인해 주세요.",
              );
          }}
        />
        <div className="briefing-progress">
          <div className="progress-label">
            <span className="progress-icon">
              <BookOpen size={19} />
            </span>
            <button
              className="text-button"
              onClick={startBriefing}
              disabled={!ready}
            >
              치이카와 입문하기 <ArrowRight size={16} />
            </button>
            <span className="progress-topics">
              치이카와<span>/</span>하치와레<span>/</span>우사기
            </span>
          </div>
          <div className="progress-status">
            <span>읽은 카드</span>
            <strong data-testid="read-count">{readCount} / 3</strong>
            <div className="progress-dots" aria-hidden="true">
              {briefing.map((topic) => (
                <span
                  className={progress.read.includes(topic.id) ? "done" : ""}
                  key={topic.id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="content-layout">
          <section
            className="topics-section"
            id="topics"
            aria-labelledby="topics-heading"
          >
            <div className="section-title">
              <div>
                <h2 id="topics-heading">
                  {view === "saved" ? "저장한 밈" : "밈·캐릭터 둘러보기"}
                  <span>
                    {view === "saved" ? progress.saved.length : topics.length}
                  </span>
                </h2>
                <p>
                  {view === "saved"
                    ? "다시 보고 싶은 밈을 모아뒀어요."
                    : "이름을 몰라도, 별명으로 검색해 보세요."}
                </p>
              </div>
            </div>
            <div className="topic-tools">
              <div
                className="category-filters"
                role="group"
                aria-label="분야 필터"
              >
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? "selected" : ""}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="unread-toggle">
                <input
                  type="checkbox"
                  checked={unreadOnly}
                  onChange={(event) => setUnreadOnly(event.target.checked)}
                />
                <span className="toggle-track" aria-hidden="true" />안 읽은
                카드만
              </label>
            </div>
            <label className="search-field">
              <MagnifyingGlass size={19} />
              <span className="sr-only">밈·캐릭터 검색</span>
              <input
                type="search"
                placeholder="치이카와, 먼작귀, 망곰…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  aria-label="검색어 지우기"
                  className="icon-button"
                  onClick={() => setQuery("")}
                >
                  <X size={17} />
                </button>
              )}
            </label>
            <p className="sr-only" aria-live="polite">
              카드 {filtered.length}개
            </p>
            {filtered.length > 0 ? (
              <div className="topic-grid">
                {filtered.map((topic, index) => {
                  const saved = progress.saved.includes(topic.id);
                  const read = progress.read.includes(topic.id);
                  return (
                    <article
                      className="topic-card"
                      key={topic.id}
                      data-testid="topic-card"
                    >
                      <button
                        className="card-open"
                        aria-label={`${topic.title} 읽기`}
                        onClick={() =>
                          setModal({
                            kind: "briefing",
                            items: [topic],
                            sequence: false,
                          })
                        }
                      >
                        <span className="card-photo">
                          <Image
                            src={topic.image}
                            alt={topic.imageAlt}
                            loading={index < 3 ? "eager" : "lazy"}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 45vw, 280px"
                          />
                        </span>
                        <span className="card-body">
                          <span className="card-meta">
                            <span
                              className={`category-label category-${topic.category}`}
                            >
                              {topic.category}
                            </span>
                            <span>
                              <Clock size={12} />약 {topic.minutes}분
                            </span>
                          </span>
                          <span className="card-title">{topic.title}</span>
                          <span className="card-subtitle">
                            {topic.subtitle}
                          </span>
                        </span>
                      </button>
                      <div className="card-bottom">
                        <button
                          className={read ? "read-label" : "card-read-link"}
                          aria-label={`${topic.title} ${read ? "다시 읽기" : "가볍게 읽기"}`}
                          onClick={() =>
                            setModal({
                              kind: "briefing",
                              items: [topic],
                              sequence: false,
                            })
                          }
                        >
                          {read ? (
                            <>
                              <Check size={14} />
                              읽은 카드
                            </>
                          ) : (
                            <>
                              가볍게 읽기
                              <ArrowUpRight size={14} />
                            </>
                          )}
                        </button>
                        <button
                          disabled={!ready}
                          className={`icon-button save-button ${saved ? "is-saved" : ""}`}
                          aria-label={`${topic.title} ${saved ? "저장 해제" : "저장"}`}
                          aria-pressed={saved}
                          onClick={() => save(topic.id)}
                        >
                          <BookmarkSimple
                            size={20}
                            weight={saved ? "fill" : "regular"}
                          />
                        </button>
                      </div>
                      <Reaction id={topic.id} />
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <BookmarkSimple size={36} weight="duotone" />
                <h3>
                  {view === "saved" && progress.saved.length === 0
                    ? "아직 저장한 밈이 없어요"
                    : "조건에 맞는 밈이 없어요"}
                </h3>
                <p>
                  {view === "saved" && progress.saved.length === 0
                    ? "마음에 드는 카드의 저장 버튼을 눌러보세요."
                    : "검색어나 분야를 바꿔서 다시 찾아보세요."}
                </p>
                <button
                  className="button secondary"
                  onClick={
                    view === "saved" && progress.saved.length === 0
                      ? () => changeView("all")
                      : reset
                  }
                >
                  {view === "saved" && progress.saved.length === 0
                    ? "밈 둘러보기"
                    : "필터 초기화"}
                </button>
              </div>
            )}
            <p className="content-note">
              <Info size={14} />
              공식 출처를 참고한 입문 콘텐츠예요. 실시간 인기 순위는 아니에요.
            </p>
          </section>
          <aside className="sidebar" aria-label="밈 활용하기">
            <section className="conversation-card">
              <span className="aside-icon">
                <ChatsCircle size={23} weight="duotone" />
              </span>
              <h2>
                알아봤다면,
                <br />
                이렇게 한마디.
              </h2>
              <p className="aside-description">
                설명에서 끝내지 말고, 말로도 써보세요.
              </p>
              <div className="conversation-example">
                <span>{picked.category} 이야기</span>
                <blockquote>“{picked.opener}”</blockquote>
              </div>
              <button
                className="button copy-button"
                onClick={() => copy(picked.opener)}
              >
                <Copy size={17} />
                한마디 복사
              </button>
              <button
                className="text-button another-opener"
                onClick={() => setSpotlight((spotlight + 1) % topics.length)}
              >
                <ArrowClockwise size={15} />
                다른 한마디
              </button>
            </section>
            <section className="practice-card">
              <span className="practice-symbol">
                <ChatTeardropDots size={26} weight="duotone" />
              </span>
              <h2>
                아는 것에서
                <br />
                말하는 것으로.
              </h2>
              <p>
                상대가 한 말을 듣고
                <br />
                다음 말을 직접 골라보세요.
              </p>
              <button
                className="text-button"
                onClick={() => startConversation()}
              >
                1분 대화 연습
                <ArrowRight size={17} />
              </button>
            </section>
            <section className="knowledge-card">
              <span className="section-kicker">PLUS 01 · 밈 퀴즈</span>
              <h2>파란 귀, 이름이 뭐였지?</h2>
              <p>방금 알게 된 이름과 뜻을 3문항으로 확인해요.</p>
              <button
                className="text-button"
                onClick={() => setModal({ kind: "knowledge" })}
              >
                밈 퀴즈 풀기
                <ArrowRight size={17} />
              </button>
            </section>
            <section className="premium-card">
              <span className="section-kicker">PLUS 02 · 출시 예정</span>
              <h2>상황별 연습팩을 검토 중이에요</h2>
              <p>
                먼저 무료 연습을 써보세요. 유료 제공 범위와 가격은 가안이에요.
              </p>
              <button
                className="text-button"
                onClick={() => setModal({ kind: "premium" })}
              >
                프리미엄 구성 보기
                <ArrowUpRight size={17} />
              </button>
            </section>
            <div className="sidebar-note">
              <Check size={17} />
              <p>
                모르는 건 물어봐도 괜찮아요.
                <br />
                관심을 보이는 것부터 시작해요.
              </p>
            </div>
          </aside>
        </div>
        <section className="closing-note">
          <span className="closing-symbol">
            <ChatTeardropDots size={30} weight="duotone" />
          </span>
          <div>
            <h2>모든 유행을 알 필요는 없으니까.</h2>
            <p>모르면 물어보고, 좋아하는 이유부터 들어보세요.</p>
          </div>
          <button
            className="text-button"
            onClick={() => {
              changeView("saved");
              document
                .getElementById("topics")
                ?.scrollIntoView({ behavior: "instant" });
            }}
          >
            저장함 열기
            <ArrowUpRight size={19} />
          </button>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <span className="footer-brand">인싸인척.</span>
          <p>취향은 달라도 대화는 이어지게.</p>
        </div>
        <span>입문 콘텐츠 · 저장한 밈은 이 브라우저에만 보관돼요.</span>
      </footer>
      {!modal && notification}
      {modal && (
        <Dialog
          label={
            modal.kind === "conversation" || modal.kind === "quiz"
              ? "대화 연습"
              : modal.kind === "knowledge"
                ? "밈 퀴즈"
                : modal.kind === "premium"
                  ? "프리미엄 구성"
                  : "밈·캐릭터 입문"
          }
          onClose={() => setModal(null)}
        >
          {modal.kind === "conversation" ? (
            <Conversation
              initialId={modal.id}
              memo={modal.memo}
              onSave={saveMemo}
              onBasic={() => setModal({ kind: "quiz" })}
              onRead={(id) => {
                const topic = topics.find((t) => t.id === id);
                if (topic)
                  setModal({
                    kind: "briefing",
                    items: [topic],
                    sequence: false,
                  });
              }}
            />
          ) : modal.kind === "premium" ? (
            <Premium />
          ) : modal.kind === "quiz" || modal.kind === "knowledge" ? (
            <Quiz
              mode={modal.kind === "knowledge" ? "knowledge" : "practice"}
              onClose={() => setModal(null)}
              onShare={(text) =>
                copy(text, "결과를 복사했어요. 친구에게 붙여넣어 보세요.")
              }
            />
          ) : (
            <Briefing
              items={modal.items}
              sequence={modal.sequence}
              saved={progress.saved}
              read={progress.read}
              onSave={save}
              onRead={markRead}
              onCopy={copy}
              onClose={() => setModal(null)}
              onPractice={() => startConversation()}
            />
          )}
          {notification}
        </Dialog>
      )}
    </>
  );
}
