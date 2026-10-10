# 인싸인척

상대의 취향을 이해하고 다음 말을 이어가는 Next.js 16 MVP다. 상황별 대화를 연습하고, 첫마디와 후속질문을 내 말투로 고쳐 저장한다. 밈·캐릭터 도감과 기본 연습도 제공한다.

서비스: [Vercel 배포](https://inssa-hoso-people.vercel.app) · [GitHub 소스](https://github.com/hyungkishin/inssa-hosoin)

## 실행

Node.js 22.6 이상이 필요하다. 테스트는 Node.js의 TypeScript type stripping을 사용한다.

```sh
npm ci
npm run dev
```

브라우저에서 [로컬 미리보기](http://localhost:3000)를 연다.

## 검증

```sh
npm run check
npx playwright install chromium
npm run test:e2e
```

`check`는 TypeScript, unit test, production build를 실행한다. E2E는 실행 중인 로컬 서버를 재사용한다. 서버가 없으면 dev server를 시작한다.

화면 증거는 서버 실행 중 `node scripts/capture.mjs`로 생성한다.

Production 실행:

```sh
npm run build
npm start
```

## 작업 문서

- [Phase 1. 아이디어와 디자인](docs/01-design.md)
- [Phase 2. 개발](docs/02-development.md)
- [Phase 3. QA](docs/03-qa.md)
- [Phase 4. 페르소나 검증 리뷰](docs/04-persona-review.md)
- [Phase 5. 배포](docs/05-deployment.md)
- [Phase 6. 반응과 수익모델](docs/06-revenue.md)
- [Phase 7. 사용 이유 검증안](docs/07-product-validation.md)
- [Phase 8. 상황별 대화 개선](docs/08-conversation.md)
- [이미지와 폰트](docs/assets.md)

콘텐츠는 공식 출처를 참고한 입문 자료다. 실시간 수집·AI 생성·계정 기능은 없다. 대화 메모·사용 기록·저장·읽음·반응·프리미엄 관심 상태는 현재 브라우저에만 보관한다. 사이트 데이터 삭제나 다른 기기 사용 시 복원되지 않는다.

프리미엄 가격은 가안이다. 결제·알림 신청·유료 콘텐츠는 제공하지 않는다.
