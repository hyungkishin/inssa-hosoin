import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-kr";
import "./globals.css";
export const metadata: Metadata = {
  title: "인싸인척 | 잘 몰라도, 대화는 이어지게",
  description:
    "친구가 좋아하는 캐릭터와 작품, 뜻을 모르는 짤. 상황별 대화를 연습하고 내 말투로 정리해 보세요.",
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
