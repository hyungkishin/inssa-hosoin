# Phase 5. 배포

Vercel production 배포와 공개 URL 검증을 완료했다. 검증일은 2026-10-10이다.

- 서비스: [인싸인척](https://inssa-hoso-people.vercel.app)
- Vercel 프로젝트: `cashnamu/inssa-hoso-people`
- 배포 ID: `dpl_6hmJW9czw459i3MfVNprDU6ih86s`
- 상태: Vercel CLI에서 `READY`, 공개 URL에서 HTTP 200.
- 배포 방식: 로컬 소스를 Vercel CLI로 업로드.
- 소스 저장소: [GitHub](https://github.com/hyungkishin/inssa-hosoin), `main` 브랜치.

## 검증

배포 전 `npm run check`를 통과했다. 배포 URL에서도 E2E 15개를 통과했다. 결과는 [deployment-e2e-results.json](../artifacts/deployment-e2e-results.json)에 기록했다.

```sh
DEPLOYMENT_URL=https://inssa-hoso-people.vercel.app npx playwright test --config playwright.remote.config.ts
```

## 재배포

현재 디렉터리에서 Vercel 로그인 후 실행한다.

```sh
npx vercel deploy --prod --yes --scope cashnamu
```

`.vercelignore`로 테스트·문서·검증 산출물을 배포 입력에서 제외한다. `.env*`와 `.vercel/`은 Git에서도 제외한다.
