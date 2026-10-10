# Phase 2. 개발

Next.js 16 App Router, React 19, TypeScript를 사용한다. 로그인 없이 정적 콘텐츠를 읽는다.

| 파일 | 역할 |
| --- | --- |
| `lib/content.ts` | 입문 6개, 대화 연습 3개, 밈 퀴즈 3개 |
| `lib/domain.ts` | 검색·별명, 저장 복원, 점수 계산 |
| `components/app.tsx` | 탐색·저장·입문·복사·모달 |
| `components/briefing.tsx` | 구분법·출처·사용 맥락 |
| `components/quiz.tsx` | 대화 연습·지식 퀴즈·결과 공유 |
| `components/reaction.tsx` | 내 반응 저장·변경·취소 |
| `components/premium.tsx` | 무료/유료 범위·가안 가격·관심 표시 |

`localStorage`에 저장·읽음·반응·프리미엄 관심을 보관한다. 서버로 보내지 않는다. 손상 데이터와 저장 차단을 처리한다. 기존 주제 ID는 복원 시 제거한다.

Native dialog로 키보드 포커스를 관리한다. 알림은 활성 dialog 안에 표시한다. 캐릭터 이미지는 로컬 파일이며 `object-fit: contain`을 사용한다.

수익모델은 [별도 문서](06-revenue.md)에 기록한다. 결제·로그인·유료 권한·서버 집계는 아직 구현하지 않았다.
