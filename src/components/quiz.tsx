"use client";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChatsCircle,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { questions as practiceQuestions, memeQuestions } from "@/lib/content";
import { scoreAnswers } from "@/lib/domain";
export function Quiz({
  onClose,
  onShare,
  mode = "practice",
}: {
  onClose: () => void;
  onShare: (text: string) => void;
  mode?: "practice" | "knowledge";
}) {
  const knowledge = mode === "knowledge";
  const questions = knowledge ? memeQuestions : practiceQuestions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const current = questions[step];
  const selected = answers[step];
  if (!current)
    return (
      <div className="completion">
        <span className="completion-icon">
          <ChatsCircle size={38} weight="duotone" />
        </span>
        <p className="section-kicker">
          {knowledge ? "밈 퀴즈 완료" : "대화 연습 완료"}
        </p>
        <h2>
          {knowledge ? "얼마나 기억했을까요?" : "대화 연습, 한 번 해봤어요."}
        </h2>
        <p className="quiz-score">
          {scoreAnswers(
            answers,
            questions.map((q) => q.correct),
          )}{" "}
          / {questions.length}
        </p>
        <p>
          {knowledge
            ? "이름과 맥락을 맞힌 문항 수예요."
            : "추천 답변을 고른 문항 수예요."}
          <br />
          {knowledge
            ? "헷갈리는 내용은 도감에서 다시 볼 수 있어요."
            : "실제 대화에는 여러 방식이 있을 수 있어요."}
        </p>
        <button
          className="button share-result"
          onClick={() =>
            onShare(`인싸인척 · ${knowledge ? "밈 퀴즈" : "대화 연습"} ${scoreAnswers(
              answers,
              questions.map((q) => q.correct),
            )}/${questions.length}
${knowledge ? "파란 귀 캐릭터 이름, 너도 알아?" : "모르는 밈 얘기에도 한마디 해보기"}
${window.location.origin}`)
          }
        >
          결과 복사해서 공유
          <ArrowRight size={18} />
        </button>
        <div className="completion-actions">
          <button
            className="button secondary"
            onClick={() => {
              setAnswers([]);
              setStep(0);
            }}
          >
            <ArrowCounterClockwise size={18} />
            다시 연습하기
          </button>
          <button className="button primary" onClick={onClose}>
            마치기
          </button>
        </div>
      </div>
    );
  return (
    <div className="quiz-body">
      <div className="dialog-eyebrow">
        <ChatsCircle size={20} /> {knowledge ? "밈 퀴즈" : "대화 연습"}{" "}
        <span>
          {step + 1} / {questions.length}
        </span>
      </div>
      <p className="quiz-situation">{current.situation}</p>
      <h2>{current.prompt}</h2>
      <p className="muted">
        {knowledge
          ? "이름과 사용 맥락을 떠올려 보세요."
          : "상대가 편하게 답할 수 있는 말을 골라보세요."}
      </p>
      <div className="quiz-options">
        {current.options.map((option, index) => (
          <button
            key={option}
            disabled={selected !== undefined}
            className={`quiz-option ${selected !== undefined && index === current.correct ? "correct" : ""} ${selected === index ? "selected" : ""}`}
            onClick={() => setAnswers([...answers, index])}
          >
            <span className="option-letter">
              {selected !== undefined && index === current.correct ? (
                <Check size={17} />
              ) : (
                String.fromCharCode(65 + index)
              )}
            </span>
            {option}
          </button>
        ))}
      </div>
      {selected !== undefined && (
        <div className="answer-explanation" role="status">
          <strong>
            {selected === current.correct
              ? knowledge
                ? "맞았어요!"
                : "이렇게 이어가면 좋아요"
              : knowledge
                ? "해설을 확인해 보세요"
                : "이런 답변도 생각해 보세요"}
          </strong>
          <p>{current.explanation}</p>
        </div>
      )}
      <button
        className="button primary quiz-next"
        disabled={selected === undefined}
        onClick={() => setStep(step + 1)}
      >
        {step === questions.length - 1 ? "결과 보기" : "다음 질문"}
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
