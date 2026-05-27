# 03 · AI Clean Check

> AI가 작성한 문서를 브라우저에서 바로 검사하고, AWS S3에 자동 배포하는 풀스택 실습

## 개요

- **프론트엔드**: React(CDN) + Babel 스탠드얼론으로 번들러 없이 단일 HTML 파일 구성
- **인프라**: AWS S3 정적 웹 호스팅 — Node.js 스크립트로 버킷 생성부터 배포까지 자동화

## 파일 구성

| 파일 | 설명 |
|------|------|
| `ai_clean_check.html` | React 기반 문서 검사 SPA |
| `deploy.js` | S3 버킷 생성 → 정책 설정 → HTML 업로드 자동화 |
| `site-off.js` | S3 웹 호스팅 비활성화 (파일은 보존) |

## 실행 방법

```bash
# 배포
npm run deploy

# 사이트 비활성화
npm run site-off
```

## 사전 준비

루트의 `.env` 파일에 AWS 자격증명 설정 (`.env.example` 참고):

```env
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=my-bucket-name
```

## 배운 점

- AWS SDK(`@aws-sdk/client-s3`)로 인프라를 코드로 제어(IaC 맛보기)
- S3 정적 웹 호스팅 설정 흐름 (버킷 → 퍼블릭 정책 → 웹사이트 구성)
- `import.meta.url`로 ESM 환경에서 스크립트 위치 기반 경로 처리
