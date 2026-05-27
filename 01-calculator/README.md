# 01 · Python 계산기 (hook test)

> Claude Code를 활용해 TDD 방식으로 개발한 첫 번째 실습 프로젝트

## 개요

Python의 함수 분리, tkinter GUI, pytest 단위 테스트를 함께 연습한 계산기 앱입니다.

## 파일 구성

| 파일 | 설명 |
|------|------|
| `calculator.py` | 핵심 계산 로직 (순수 함수) |
| `calc_ui.py` | tkinter GUI — 실행 진입점 |
| `test_calculator.py` | pytest 단위 테스트 |

## 실행 방법

```bash
# GUI 실행
python calc_ui.py

# 테스트 실행
pytest test_calculator.py -v
```

## 배운 점

- 로직과 UI를 파일로 분리하는 관심사 분리(Separation of Concerns)
- TDD: 구현 전 테스트 작성 → Red-Green-Refactor 사이클
- Claude Code와 페어 프로그래밍으로 빠른 피드백 받기
