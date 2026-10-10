import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-kr";
import "./globals.css";
export const metadata: Metadata = {
  title: "인싸인척 | 대화에 필요한 만큼만",
  description:
    "모임 전에 가볍게 읽는 3분 브리핑. 새로운 대화 소재를 읽고, 저장하고, 연습해 보세요.",
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
