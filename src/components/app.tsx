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
  Sparkle,
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
const STORAGE_KEY = "inssa-progress-v1";
type Modal =
  | { kind: "briefing"; items: Topic[]; sequence: boolean }
  | { kind: "quiz" }
  | null;
export default function App() {
  const [view, setView] = useState<"all" | "saved">("all");
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [progress, setProgress] = useState<Progress>({ saved: [], read: [] });
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [spotlight, setSpotlight] = useState(0);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const briefing = briefingIds.map((id) =>
    topics.find((topic) => topic.id === id)!,
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
    setReady(true);
    const sync = (event: StorageEvent) => {
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
      progress.saved.includes(id) ? "저장을 해제했어요" : "소재를 저장했어요",
    );
  const markRead = (id: string) => {
    if (!progress.read.includes(id))
      persist({ ...progress, read: [...progress.read, id] });
  };
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notify("한마디를 복사했어요");
    } catch {
      notify("복사할 수 없어요. 문장을 선택해 직접 복사해 주세요.");
    }
  };
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
              오늘의 브리핑
            </button>
            <button onClick={() => setModal({ kind: "quiz" })}>
              대화 연습
            </button>
            <button
              className={view === "saved" ? "active" : ""}
              aria-current={view === "saved" ? "page" : undefined}
              onClick={() => changeView("saved")}
            >
              저장한 소재{" "}
              {progress.saved.length > 0 && (
                <span className="nav-count">{progress.saved.length}</span>
              )}
            </button>
          </nav>
          <span className="header-note">
            <Clock size={16} />
            대화에 필요한 만큼만
          </span>
        </div>
      </header>
      <main className="main-container">
        <div className="edition-line">
          <p>
            <span className="edition-label">
              가볍게 읽고, 편하게 이야기하기
            </span>
          </p>
          <span className="sample-label">
            <Info size={14} />
            샘플 에디션
          </span>
        </div>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="hero-label">
              <Clock size={16} />
              모임 전, 딱 3분
            </span>
            <h1 id="hero-title">
              요즘 이야기,
              <br />
              가볍게 따라잡기.
            </h1>
            <p>
              다 알 필요 없어요.
              <br className="mobile-break" /> 말문이 트일 만큼만 챙겨가세요.
            </p>
            <button
              className="button primary hero-cta"
              onClick={startBriefing}
              disabled={!ready}
            >
              3분 브리핑 시작
              <ArrowRight size={20} />
            </button>
            <span className="hero-footnote">로그인 없이 바로 읽어요</span>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="photo-print print-run">
              <Image
                src="/images/run.jpg"
                alt=""
                fill
                sizes="260px"
                loading="eager"
                priority
              />
              <span>함께 달리는 재미</span>
            </div>
            <div className="photo-print print-matcha">
              <Image
                src="/images/matcha.jpg"
                alt=""
                fill
                sizes="190px"
                loading="eager"
                priority
              />
              <span>요즘의 한 잔</span>
            </div>
            <div className="hero-bubble">
              아, 그 얘기!
              <Sparkle size={28} weight="fill" />
            </div>
            <div className="small-bubble">
              <ChatsCircle size={20} />
              대화 소재 +1
            </div>
            <span className="art-spark spark-one">✳</span>
            <span className="art-spark spark-two">✦</span>
          </div>
        </section>
        <div className="briefing-progress">
          <div className="progress-label">
            <span className="progress-icon">
              <BookOpen size={19} />
            </span>
            <strong>이번 브리핑</strong>
            <span className="progress-topics">
              러닝크루<span>/</span>말차<span>/</span>디지털카메라
            </span>
          </div>
          <div className="progress-status">
            <span>읽은 소재</span>
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
                  {view === "saved" ? "저장한 대화 소재" : "오늘의 대화 소재"}
                  <span>
                    {view === "saved" ? progress.saved.length : topics.length}
                  </span>
                </h2>
                <p>
                  {view === "saved"
                    ? "다시 꺼내보고 싶은 이야기를 모아뒀어요."
                    : "새로운 이야기가 필요할 때, 하나만 골라보세요."}
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
                소재만
              </label>
            </div>
            <label className="search-field">
              <MagnifyingGlass size={19} />
              <span className="sr-only">대화 소재 검색</span>
              <input
                type="search"
                placeholder="궁금한 소재를 검색해 보세요"
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
              소재 {filtered.length}개
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
                              읽은 소재
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
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <BookmarkSimple size={36} weight="duotone" />
                <h3>
                  {view === "saved" && progress.saved.length === 0
                    ? "아직 저장한 소재가 없어요"
                    : "조건에 맞는 소재가 없어요"}
                </h3>
                <p>
                  {view === "saved" && progress.saved.length === 0
                    ? "마음에 드는 소재의 저장 버튼을 눌러보세요."
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
                    ? "소재 둘러보기"
                    : "필터 초기화"}
                </button>
              </div>
            )}
            <p className="content-note">
              <Info size={14} />
              편집한 샘플 콘텐츠예요. 실시간 인기 순위와는 달라요.
            </p>
          </section>
          <aside className="sidebar" aria-label="대화에 활용하기">
            <section className="conversation-card">
              <span className="aside-icon">
                <ChatsCircle size={23} weight="duotone" />
              </span>
              <h2>
                말문이 막힐 땐,
                <br />이 한마디.
              </h2>
              <p className="aside-description">
                질문 하나로 가볍게 시작해 보세요.
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
                짧은 상황 3개로
                <br />
                대화를 이어가는 연습을 해봐요.
              </p>
              <button
                className="text-button"
                onClick={() => setModal({ kind: "quiz" })}
              >
                1분 대화 연습
                <ArrowRight size={17} />
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
            <p>하나의 이야기로도, 충분히 대화를 시작할 수 있어요.</p>
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
          <p>대화에 필요한 만큼만.</p>
        </div>
        <span>샘플 콘텐츠 · 저장한 소재는 이 브라우저에만 보관돼요.</span>
      </footer>
      {!modal && notification}
      {modal && (
        <Dialog
          label={modal.kind === "quiz" ? "대화 연습" : "대화 소재 브리핑"}
          onClose={() => setModal(null)}
        >
          {modal.kind === "quiz" ? (
            <Quiz onClose={() => setModal(null)} />
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
              onPractice={() => setModal({ kind: "quiz" })}
            />
          )}
          {notification}
        </Dialog>
      )}
    </>
  );
}
