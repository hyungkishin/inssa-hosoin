import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-kr";
import "./globals.css";
export const metadata: Metadata = {
  title: "인싸인척 | 밈·캐릭터, 아는 만큼 재밌게",
  description:
    "치이카와부터 망곰까지. 밈·캐릭터의 이름과 맥락을 알아보고, 짧은 퀴즈와 대화 연습으로 써보세요.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
