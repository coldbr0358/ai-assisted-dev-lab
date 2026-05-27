# 02 · Claude API 연동 (Node.js)

> Anthropic SDK를 Node.js에서 처음 연결한 실습 프로젝트

## 개요

`@anthropic-ai/sdk`를 설치하고 Claude에게 API 호출을 보내는 최소 예제입니다.  
`.env` 파일을 통해 API 키를 안전하게 주입합니다.

## 파일 구성

| 파일 | 설명 |
|------|------|
| `index.js` | Claude API 메시지 생성 예제 |

## 실행 방법

```bash
# 루트에서 실행
npm run claude-api

# 또는 직접 실행
node 02-claude-api/index.js
```

## 사전 준비

루트의 `.env` 파일에 API 키를 설정합니다 (`.env.example` 참고):

```env
ANTHROPIC_API_KEY=여기에_키_입력
```

## 배운 점

- ESM (`import`) 기반 Node.js 모듈 시스템
- `dotenv`로 환경 변수 관리 — 키를 코드에 직접 쓰지 않는 습관
- async/await 패턴으로 API 호출 처리
