# Phase 2. 개발

Next.js 16.4.0 App Router와 React 19.3.0으로 구현했다. 설치 버전은 `package-lock.json`에 고정했다.

| 기능       | 구현 위치                     | 동작                                     |
| ---------- | ----------------------------- | ---------------------------------------- |
| 탐색       | `src/components/app.tsx`      | 분야·검색·안 읽은 소재 필터              |
| 브리핑     | `src/components/briefing.tsx` | 3개 소재 순차 읽기, 개별 읽기, 원문 링크 |
| 저장함     | `src/lib/domain.ts`           | 저장·읽음 복원, 손상 데이터 정리         |
| 대화 연습  | `src/components/quiz.tsx`     | 3문항, 답변 이유, 결과, 재시작           |
| 다이얼로그 | `src/components/dialog.tsx`   | native dialog, Escape, 포커스 복원       |
| 콘텐츠     | `src/lib/content.ts`          | 편집 샘플과 참고 자료                    |

`localStorage`의 `inssa-progress-v1`에 주제 ID만 저장한다. 서버·계정·기기 간 동기화는 없다. 저장이 차단되면 현재 화면에서 상태를 유지하고 안내한다.

사진과 폰트는 로컬에서 제공한다. 참고 자료는 외부 링크로 연다. API key와 유료 API는 사용하지 않는다.

## 선택 근거

- Client Component에서 UI 상태를 처리한다. 데이터가 작아 별도 전역 상태 라이브러리는 쓰지 않는다.
- native dialog로 키보드 포커스를 제한한다. 디자인 확장성보다 기본 브라우저 동작을 우선했다.
- 자동 콘텐츠 수집은 제외했다. 최신성 검증과 수집 권한은 다음 범위다.
- ‘3분’과 ‘약 1분’은 기획상 읽기 시간 추정치다. 이용자 실측값은 아니다.

## 자료

Next.js 구성은 [공식 설치 문서](https://nextjs.org/docs/app/getting-started/installation)를 참고했다. 콘텐츠 출처와 연도는 각 소재 상세 화면에 표시한다. 사진 경로와 출처는 [assets.md](assets.md)에 기록했다.
