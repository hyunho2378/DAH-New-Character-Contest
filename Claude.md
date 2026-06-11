# CLAUDE.md — 2026 디지털인문예술전공 캐릭터 공모전 전시 웹사이트

## 프로젝트
디지털인문예술전공 학생 10명의 캐릭터 포스터 온라인 전시
플랫폼: 반응형 웹 B형 (320px ~ 2560px)
스택: React 18 + Vite + JSX + Tailwind CSS + React Router v6

---

## 절대 금지 (위반 시 전체 파일 재작성)

- 폰트: `Pretendard`, `SUIT` **두 가지만** 허용. 나머지 전면 금지
- 색상: `tokens.js` 정의값만 사용. 하드코딩 금지. 신규 색상은 반드시 사용자 승인 후 추가
- `localStorage` / `sessionStorage` 금지
- TypeScript 금지 → JSX만
- 이모지 금지 → `lucide-react` 또는 inline SVG만
- 자동슬라이드, 캐러셀, WebGL, parallax, scroll-trigger 금지
- 이미지 슬라이더 금지 (상세 페이지: 포스터 1장 고정)
- 관련 작품 추천 섹션 금지
- scale/transform hover 금지
- Claude 기본 스타일(보라, 파랑 계열 등) 절대 사용 금지

---

## 허용 마이크로 인터랙션

| 효과 | duration | 적용 대상 |
|------|----------|-----------|
| opacity 0→1 + translateY(6→0) | 400ms ease | 페이지 진입 (.page-enter) |
| border-color 변화 | 200ms ease | 카드 hover |
| background + color 변화 | 200ms ease | 버튼 hover |
| color 변화 | 150ms ease | 링크/nav hover |
| border-color 변화 | 200ms ease | 헤더 스크롤 |

---

## 색상 (전체)

```
#0A0A0A  bg-deep      (헤더/푸터)
#1A1A1A  bg-primary   (메인 배경)
#111111  bg-card      (카드)
#222222  bg-elevated  (카드 호버)
#000000  gradient-start
#2A2A2A  gradient-end / border-subtle
#333333  border-default
#F0F0F0  text-primary
#999999  text-secondary
#555555  text-tertiary
#E27DA6  accent (키컬러, 절제해서 사용)
```

---

## 레이아웃 규격 (헤더·섹션·푸터 전체 통일)

### padding-x (.container)
```
~767px   : 16px
768~1023 : 24px
1024~    : 48px
1920~    : 80px
max-width: 1280px, margin: 0 auto
```

### padding-y (섹션별)
```
헤더 높이       : 64px (모바일 56px)
히어로           : padding-y 96px / 모바일 64px
포스터 그리드    : top 48px, bottom 96px
상세 페이지      : padding-y 80px / 모바일 40px
푸터             : padding-y 48px / 모바일 40px
```

---

## 그리드 (포스터 목록)

```
~767px   : 1열, gap 24px
768~1023 : 2열, gap 24px
1024~    : 3열, gap 32px
1920~    : 3열, gap 40px
```

---

## 파일 구조

```
client/
├── public/posters/     ← 포스터 PNG (10장)
├── src/
│   ├── assets/logo.svg
│   ├── components/Layout/Header.jsx
│   ├── components/Layout/Footer.jsx
│   ├── components/PosterCard.jsx
│   ├── components/PosterGrid.jsx
│   ├── components/BackButton.jsx
│   ├── data/posters.js
│   ├── pages/HomePage.jsx
│   ├── pages/SinglePosterPage.jsx
│   ├── pages/AboutPage.jsx
│   ├── styles/global.css
│   ├── tokens.js
│   ├── App.jsx
│   └── main.jsx
```

---

## 라우트

```
/              → HomePage
/poster/:id    → SinglePosterPage
/about         → AboutPage
*              → redirect /
```

---

## 이미지 규칙

- 위치: `public/posters/{slug}.png`
- `loading="lazy"` 필수
- `alt` 반드시 작성
- `object-fit: contain`, `border-radius: 0`, shadow 없음
- 로드 실패 시 fallback UI 표시

---

## 할루시네이션 방지 체크리스트

### 작업 전
- [ ] tokens.js 색상 확인 후 사용
- [ ] 폰트가 Pretendard/SUIT인지 확인
- [ ] COMPONENTS.md 컴포넌트 경로 확인

### 코드 작성 중
- [ ] 색상 하드코딩 없음
- [ ] 금지 기능 없음 (localStorage, carousel 등)
- [ ] JSX만 사용 (TypeScript 문법 없음)

### 작업 후
- [ ] 320px ~ 2560px 전 구간 레이아웃 확인
- [ ] 포스터 목록 그리드 1/2/3열 정상
- [ ] 상세 페이지 포스터 1장만
- [ ] 모든 이미지 alt + lazy loading
- [ ] ROUTES.md와 App.jsx 라우트 일치

---

## 에이전트 구조 (하네스 엔지니어링)

```
PHASE 1 (병렬): AGENT-IMPL-1 + AGENT-IMPL-2 + AGENT-IMPL-3
PHASE 2 (단독): AGENT-REVIEW (크로스체크 + CHECKLIST 전 항목)
```

REVIEW 완료 후 `npm run dev` 실행해서 localhost:5173 확인.
에러 없으면 PASS, 있으면 해당 에이전트로 돌아가 수정.

## 컨텍스트 관리
- 컨텍스트 85% 도달 시 즉시 멈추고 PROGRESS.md 업데이트 후 대기
- PROGRESS.md에 완료 목록 / 진행 중 / 다음 작업 명시

## 커밋 규칙
```
[A1] chore(tokens): Tailwind 토큰 설정
[A2] feat(market): ProductCard 구현
[A3] feat(pages): MarketPage 조립
[A4] test(pages): MarketPage QA 통과
[A2] fix(market): border-radius 수정
```