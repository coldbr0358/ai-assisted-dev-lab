# AI-Assisted Dev Lab

> Claude Code와 함께 진행한 AI 보조 개발 실습 포트폴리오

[![Node.js](https://img.shields.io/badge/Node.js-ESM-green)](https://nodejs.org)
[![Python](https://img.shields.io/badge/Python-3.x-blue)](https://python.org)
[![AWS](https://img.shields.io/badge/AWS-S3-orange)](https://aws.amazon.com)

---

## 프로젝트 목록

| # | 프로젝트 | 기술 스택 | 설명 |
|---|----------|-----------|------|
| 01 | [Python 계산기](./01-calculator/) | Python · tkinter · pytest | TDD로 만든 GUI 계산기 |
| 02 | [Claude API 연동](./02-claude-api/) | Node.js · Anthropic SDK | Claude API 첫 연결 예제 |
| 03 | [AI Clean Check](./03-ai-clean-check/) | React · AWS S3 SDK | AI 문서 검사기 + S3 자동 배포 |
| 04 | [광주 날씨 앱](./04-gwangju-weather/) | HTML · CSS · JS (Vanilla) | 순수 웹 기술로 만든 날씨 위젯 |

---

## 학습 자료

- [AWS S3 정적 호스팅 가이드](./docs/aws_hosting_guide.html)
- [DEVSIGN AWS 스터디 발표자료](./docs/devsign_presentation.html)

---

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env
# .env 파일을 열어 API 키 입력
```

### 3. 프로젝트별 실행

```bash
# Claude API 테스트
npm run claude-api

# AI Clean Check → AWS S3 배포
npm run deploy

# S3 사이트 비활성화
npm run site-off

# Python 계산기 실행
python 01-calculator/calc_ui.py
```

---

## 보안 참고사항

- `.env` 파일은 `.gitignore`에 의해 **절대 커밋되지 않습니다**
- API 키는 반드시 `.env.example`을 복사해 로컬에서만 관리하세요
- AWS 키는 최소 권한 원칙(S3 전용 IAM)을 적용하세요

---

## 폴더 구조

```
ai-assisted-dev-lab/
├── .env.example          # 환경 변수 템플릿 (키 없음)
├── .gitignore
├── package.json
│
├── 01-calculator/        # Python tkinter 계산기
├── 02-claude-api/        # Claude API Node.js 연동
├── 03-ai-clean-check/    # React SPA + AWS S3 배포
├── 04-gwangju-weather/   # Vanilla JS 날씨 앱
│
└── docs/                 # 학습 자료 및 발표자료
```
