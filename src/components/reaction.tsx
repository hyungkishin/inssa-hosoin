"use client";
import { useEffect, useState } from "react";
import { Lightbulb, CheckCircle } from "@phosphor-icons/react";
const key = "inssa-reactions-v1";
type Reaction = "known" | "new";
function load(id: string): Reaction | null {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    return data?.[id] === "known" || data?.[id] === "new" ? data[id] : null;
  } catch {
    return null;
  }
}
export function Reaction({ id }: { id: string }) {
  const [selected, setSelected] = useState<Reaction | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const sync = () => setSelected(load(id));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("inssa-reaction", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("inssa-reaction", sync);
    };
  }, [id]);
  const choose = (value: Reaction) => {
    const next = selected === value ? null : value;
    setSelected(next);
    try {
      let data: unknown;
      try {
        data = JSON.parse(localStorage.getItem(key) || "{}");
      } catch {
        data = {};
      }
      const entries =
        data && typeof data === "object" && !Array.isArray(data) ? data : {};
      localStorage.setItem(key, JSON.stringify({ ...entries, [id]: next }));
      window.dispatchEvent(new Event("inssa-reaction"));
      setMessage(
        next === "new"
          ? "새로 알게 된 밈으로 표시했어요"
          : next === "known"
            ? "알고 있는 밈으로 표시했어요"
            : "반응을 취소했어요",
      );
    } catch {
      setMessage("반응을 저장할 수 없어 현재 화면에서만 유지돼요");
    }
  };
  return (
    <div className="reaction-area">
      <div className="reaction-buttons" role="group" aria-label="내 반응">
        <button
          aria-pressed={selected === "known"}
          onClick={() => choose("known")}
        >
          <CheckCircle
            size={15}
            weight={selected === "known" ? "fill" : "regular"}
          />
          알고 있었어요
        </button>
        <button aria-pressed={selected === "new"} onClick={() => choose("new")}>
          <Lightbulb
            size={15}
            weight={selected === "new" ? "fill" : "regular"}
          />
          처음 알았어요
        </button>
      </div>
      <span className="sr-only" role="status">
        {message}
      </span>
    </div>
  );
}
