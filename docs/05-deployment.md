# Phase 5. 배포

> 이 문서는 밈 입문 에디션의 배포 기록이다. 현재 상황별 대화 개선본의 배포 결과는 [Phase 8](08-conversation.md)에 있다.

밈 에디션을 Vercel production에 반영했다. 검증일: 2026-10-10.

- 서비스: [인싸인척](https://inssa-hoso-people.vercel.app)
- 프로젝트: `cashnamu/inssa-hoso-people`
- 배포 ID: `dpl_5qD4huPMZ4otFhzT3Td3KyRRSGbB`
- 상태: CLI `READY`, 공개 URL HTTP 200.
- 소스 커밋: `65279f2`, `main`에 push 완료.
- 방식: Vercel CLI로 로컬 소스 업로드.
- 저장소: [GitHub](https://github.com/hyungkishin/inssa-hosoin)

## 검증

로컬 `npm run check`와 E2E 20개를 통과했다. 공개 배포 URL에서도 E2E 20개를 통과했다. [배포 검사 결과](../artifacts/deployment-e2e-results.json), [배포 정보](../artifacts/deployment.json)에 기록했다.

```sh
DEPLOYMENT_URL=https://inssa-hoso-people.vercel.app npx playwright test --config playwright.remote.config.ts
```

## 재배포

```sh
npx vercel deploy --prod --yes --scope cashnamu
```

문서·테스트·검증 산출물·`.env*`는 배포 입력에서 제외한다. `.env*`와 `.vercel/`은 Git에서도 제외한다. Git push 자동 배포 연결은 설정하지 않았다.
