# PROGRESS.md — Ugl:Eat 작업 진행 상황
**마지막 업데이트:** 2026-04-24
**컨텍스트 도달로 인한 중단 시 이 파일을 반드시 업데이트하고 대기.**


# PROGRESS.md — 작업 진행 상황

## 완료된 작업
- [x] STEP 0: 프로젝트 초기 세팅 (Vite + React + Tailwind)
- [x] STEP 1: 기반 컴포넌트 + 페이지 구현
- [x] STEP 2: 메인 레이아웃 isabelmoranta 수직 섹션 방식
- [x] STEP 3: About 랜딩 페이지 풀뷰포트 텍스트 + 스크롤 명도 효과
- [x] STEP 4: 전체 인터랙션 + 블라인드 모드

## 완료된 작업 (추가)
- [x] STEP 5: Content 페이지 재설계 (isabelmoranta/work 3단 레이아웃)
- [x] STEP 6: 폰트 통일(14vw) + 마진 재설계(1440px) + Award 페이지
- [x] STEP 7: 마진 통일(text-full=container) + 텍스트 확대 + 푸터 재설계
- [x] STEP 8: IntroScreen 삭제 + About 초기 명도 수정 + Footer 재설계 + Award 금액 삭제
- [x] STEP 9: 전 페이지 .container 통일 검증 — 이미 완료 상태 확인 (코드 변경 없음)
- [x] STEP 10: 포스터 A2 비율(420/594) + Hover 인터랙션 + About 스페이서/레이블 삭제 + 커서 확대

## 진행 중
(없음)

## 대기 중
- [ ] 배포 (Vercel)
- [ ] REVEAL_IDENTITY = true 공개 전환

## 현재 라우트
```
/            → AboutPage  (랜딩 홈)
/content     → ContentPage (포스터 목록, isabelmoranta 스타일)
/poster/:id  → SinglePosterPage
*            → / redirect
```

## 현재 네비
About (좌) | Content (우)

## 포스터 데이터 (7개)
| id | 제목 | 이미지 | 학생 |
|----|------|--------|------|
| matda | 맛다! | dodo.png | 조영은 |
| dahong | 다홍이 | dahong.png | 최은영 |
| ain | 아-인 | ain.png | 한수빈 |
| dwuli | 디우리 | dwuli.png | 한수빈 |
| lumen | 루멘 | lumen.png | 정민서 |
| disoong | 디숭이 | disoong-i.png | 김지연 |
| dfoo | 디푸 | dfoo.png | 이지현 |

## 블라인드 모드
- config.js → REVEAL_IDENTITY = false (투표 중)
- true로 변경 후 재배포 시 학생 정보 공개

## 주의사항
- 폰트: Pretendard, SUIT만
- 색상: tokens.js만
- Works → Content 전체 변경 완료 여부: [x]