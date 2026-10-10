"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  BookmarkSimple,
  Copy,
  ArrowUpRight,
  Check,
  Confetti,
} from "@phosphor-icons/react";
import type { Topic } from "@/lib/domain";
export function Briefing({
  items,
  saved,
  read,
  onSave,
  onRead,
  onCopy,
  onClose,
  onPractice,
  sequence,
}: {
  items: Topic[];
  saved: string[];
  read: string[];
  onSave: (id: string) => void;
  onRead: (id: string) => void;
  onCopy: (text: string) => void;
  onClose: () => void;
  onPractice: () => void;
  sequence: boolean;
}) {
  const [step, setStep] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dialog = root.current?.closest("dialog");
    if (dialog) dialog.scrollTop = 0;
    if (step > 0)
      root.current?.querySelector("h2")?.focus({ preventScroll: true });
  }, [step]);
  const topic = items[step];
  if (!topic)
    return (
      <div ref={root} className="completion">
        <span className="completion-icon">
          <Confetti size={38} weight="duotone" />
        </span>
        <p className="section-kicker">입문 완료</p>
        <h2 tabIndex={-1}>세 캐릭터, 이제 구분돼요</h2>
        <p>
          둥근 귀 · 파란 귀 · 긴 귀를 기억해 보세요.
          <br />
          이번엔 가볍게 대화를 이어가 볼까요?
        </p>
        <div className="completion-topics">
          {items.map((item) => (
            <span key={item.id}>
              <Check size={16} />
              {item.subtitle.split(",")[0]}
            </span>
          ))}
        </div>
        <button className="button primary" onClick={onPractice}>
          대화 연습하기
          <ArrowRight size={18} />
        </button>
        <button className="text-button completion-close" onClick={onClose}>
          도감으로 돌아가기
        </button>
      </div>
    );
  const next = () => {
    onRead(topic.id);
    if (sequence) setStep(step + 1);
    else onClose();
  };
  return (
    <div ref={root}>
      <article className="topic-detail">
        <div className="dialog-eyebrow">
          {sequence ? "치이카와 3분 입문" : topic.category}
          {sequence && (
            <span>
              {step + 1} / {items.length}
            </span>
          )}
        </div>
        <div className="detail-photo">
          <Image
            src={topic.image}
            alt={topic.imageAlt}
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, 600px"
          />
        </div>
        <div className="detail-content">
          <div className="card-meta">
            <span className={`category-label category-${topic.category}`}>
              {topic.category}
            </span>
            <span>약 {topic.minutes}분 읽기</span>
            {read.includes(topic.id) && (
              <span className="read-mark">
                <Check size={13} />
                읽음
              </span>
            )}
          </div>
          <h2 tabIndex={-1}>{topic.title}</h2>
          <p className="detail-summary">{topic.summary}</p>
          <h3>이렇게 구분해요</h3>
          <p className="recognition-note">{topic.recognition}</p>
          <h3>어디서 나왔어요?</h3>
          <p>{topic.context}</p>
          <h3>어떤 맥락에서 써요?</h3>
          <p>{topic.usage}</p>
          <div className="opener-box">
            <div>
              <span>이렇게 말해보세요</span>
              <button
                className="icon-button"
                aria-label="대화 문장 복사"
                onClick={() => onCopy(topic.opener)}
              >
                <Copy size={19} />
              </button>
            </div>
            <blockquote>“{topic.opener}”</blockquote>
            <p>함께 알아두기 · {topic.followUp}</p>
          </div>
          <p className="caution">{topic.caution}</p>
          <a
            className="source-link"
            href={topic.source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {topic.source.label}
            <ArrowUpRight size={16} />
          </a>
          <p className="source-note">{topic.source.note}</p>
          <div className="detail-actions">
            {sequence && step > 0 && (
              <button
                className="icon-button"
                aria-label="이전 소재"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <button
              className="button secondary"
              aria-pressed={saved.includes(topic.id)}
              onClick={() => onSave(topic.id)}
            >
              <BookmarkSimple
                weight={saved.includes(topic.id) ? "fill" : "regular"}
                size={18}
              />
              {saved.includes(topic.id) ? "저장 해제" : "저장하기"}
            </button>
            <button className="button primary" onClick={next}>
              {sequence
                ? step === items.length - 1
                  ? "브리핑 마치기"
                  : "다음 소재"
                : "읽음으로 표시"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
