"use client";
import { useEffect, useState } from "react";
import { Check, Sparkle } from "@phosphor-icons/react";
export function Premium() {
  const [interested, setInterested] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      setInterested(localStorage.getItem("inssa-premium-interest") === "yes");
    } catch {}
  }, []);
  function toggle() {
    const next = !interested;
    setInterested(next);
    try {
      localStorage.setItem("inssa-premium-interest", next ? "yes" : "no");
      setMessage(
        next
          ? "이 브라우저에 관심을 표시했어요. 결제와 알림 신청은 진행되지 않아요."
          : "관심 표시를 취소했어요.",
      );
    } catch {
      setMessage(
        "현재 화면에만 관심을 표시했어요. 결제와 알림 신청은 진행되지 않아요.",
      );
    }
  }
  return (
    <section className="premium-detail">
      <p className="section-kicker">
        <Sparkle size={18} />
        프리미엄 · 출시 예정
      </p>
      <h2>
        밈을 알아보는 데서,
        <br />
        써보는 것까지.
      </h2>
      <p className="muted">입문 도감과 기본 대화 연습은 계속 무료예요.</p>
      <div className="plan-comparison">
        <div>
          <h3>무료 입문</h3>
          <strong>0원</strong>
          <ul>
            <li>밈·캐릭터 6개</li>
            <li>기본 대화 연습 3문항</li>
            <li>밈 퀴즈·저장·반응</li>
          </ul>
          <span>지금 이용 가능</span>
        </div>
        <div className="premium-plan">
          <h3>프리미엄</h3>
          <strong>월 3,900원</strong>
          <p>예상 가격 · 아직 판매하지 않아요</p>
          <ul>
            <li>
              <Check size={15} />
              주간 밈 업데이트
            </li>
            <li>
              <Check size={15} />
              상황별 대화 연습팩
            </li>
            <li>
              <Check size={15} />
              캐릭터·표현별 심화 해설
            </li>
          </ul>
          <span>위 기능은 준비 중이에요</span>
        </div>
      </div>
      <button
        className="button primary"
        aria-pressed={interested}
        onClick={toggle}
      >
        {interested ? "관심 표시 취소" : "관심 있어요"}
      </button>
      <p className="source-note">
        관심 표시는 이 브라우저에만 저장해요. 결제와 알림 신청은 진행되지
        않아요.
      </p>
      <p
        className="premium-status"
        role="status"
        aria-label="관심 표시 결과"
        aria-live="polite"
      >
        {message}
      </p>
    </section>
  );
}
