# COMPONENTS.md — 컴포넌트 전체 목록 & 스펙
# 2026 디지털인문예술전공 캐릭터 공모전 전시 웹사이트

---

## 컴포넌트 트리

```
App
└── BrowserRouter
    └── Routes
        ├── Layout (Header + Outlet + Footer)
        │   ├── HomePage
        │   │   ├── HeroSection
        │   │   └── PosterGrid
        │   │       └── PosterCard (×10)
        │   ├── SinglePosterPage
        │   │   ├── BackButton
        │   │   ├── PosterImage
        │   │   └── PosterInfo
        │   └── AboutPage
        └── 404 → redirect to /
```

---

## 1. Layout 컴포넌트

### `src/components/Layout/Header.jsx`

**역할:** 전체 페이지 상단 고정 네비게이션

**스펙:**
```
position:         sticky, top: 0
z-index:          100
height:           64px (모바일: 56px)
background:       #0A0A0A
border-bottom:    1px solid #2A2A2A
transition:       border-color 200ms ease (스크롤 시 #333333)

내부 구조: .container 클래스 wrapping
  - display: flex
  - justify-content: space-between
  - align-items: center
  - height: 100%

좌측 — 로고 영역:
  - <img> src="/src/assets/logo.svg" height="28px" width="auto"
  - 로고 없을 경우: "DIINYE" 텍스트 (SUIT 600, 14px, #E27DA6, letter-spacing 0.15em)

우측 — 네비 링크:
  - "Home" → /
  - "About" → /about
  - 간격: gap 32px (모바일: gap 20px)
  - 스타일: Pretendard 400, 14px, #999999
  - active: color #E27DA6
  - hover: color #F0F0F0, transition 150ms ease

모바일(~767px):
  - 햄버거 메뉴 없음 (링크 2개뿐이므로 그대로 표시)
  - height: 56px
  - 로고 높이: 22px
  - 링크: 12px, gap 16px
```

**Props:** 없음 (내부에서 useLocation으로 active 판별)

---

### `src/components/Layout/Footer.jsx`

**역할:** 전체 페이지 하단 정보 표시

**스펙:**
```
background:     #0A0A0A
border-top:     1px solid #2A2A2A
padding-y:      48px (모바일: 40px)

내부 구조: .container 클래스 wrapping
  - display: flex
  - justify-content: space-between
  - align-items: flex-end
  - flex-wrap: wrap
  - gap: 24px

좌측:
  - 로고 또는 텍스트 "DIINYE 2026" (SUIT 600, 13px, #555555)
  - "한림대학교 디지털인문예술전공" (Pretendard 400, 12px, #555555, margin-top 4px)

우측:
  - "ⓒ 2026 디지털인문예술전공" (Pretendard 400, 11px, #555555)

모바일:
  - flex-direction: column
  - align-items: flex-start
  - gap: 16px
```

**Props:** 없음

---

## 2. 페이지 컴포넌트

### `src/pages/HomePage.jsx`

**역할:** 포스터 그리드 메인 페이지

**스펙:**
```
최상단 div: className="page-enter"
배경: #1A1A1A (기본)

구성:
  1. HeroSection
  2. PosterGrid
```

**HeroSection (HomePage 내부 섹션):**
```
background: linear-gradient(to bottom, #000000 0%, #1A1A1A 100%)
padding-top:    96px (모바일: 64px)
padding-bottom: 64px (모바일: 48px)
padding-x:      .container 규격 따름

내부 구조:
  - 레이블: "2026 EXHIBITION"
      Pretendard 400, 11px, #E27DA6, letter-spacing 0.15em, uppercase
  - 전시 제목: "디지털인문예술전공\n신규 캐릭터 공모전"
      SUIT 700, 데스크탑 64px / 태블릿 48px / 모바일 32px, #F0F0F0
      line-height: 1.2
      margin-top: 16px
  - 부제: "한림대학교 디지털인문예술전공 재학생 작품전"
      Pretendard 400, 14px, #999999
      margin-top: 16px
  - 작품 수 표시: "총 10점"
      Pretendard 400, 12px, #555555, letter-spacing 0.05em
      margin-top: 8px
  - 구분선: border-bottom 1px #2A2A2A, margin-top 48px (모바일: 40px)
```

**PosterGrid 섹션:**
```
padding-top:    48px
padding-bottom: 96px (모바일: 64px)
padding-x:      .container 규격 따름
```

---

### `src/pages/SinglePosterPage.jsx`

**역할:** 포스터 1장 상세 페이지

**스펙:**
```
최상단 div: className="page-enter"
padding-y:  80px (모바일: 40px)
padding-x:  .container 규격 따름
max-width:  1280px, margin: 0 auto

레이아웃:
  데스크탑(1024px~):
    display: grid
    grid-template-columns: 3fr 2fr
    gap: 64px
    align-items: start

  태블릿(768~1023px):
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 40px
    align-items: start

  모바일(~767px):
    display: flex
    flex-direction: column
    gap: 32px

좌/상단 — 이미지 영역:
  - 포스터 이미지 1장 (절대 2장 이상 금지)
  - width: 100%
  - object-fit: contain
  - background: #111111
  - border: 1px solid #2A2A2A
  - border-radius: 0
  - max-height: 85vh (모바일: none)
  - loading="lazy"

우/하단 — 텍스트 영역:
  position: sticky (데스크탑만), top: 80px

  [BackButton]  ← 최상단
  margin-bottom: 40px (모바일: 32px)

  레이블 "WORK":
    Pretendard 400, 11px, #E27DA6, letter-spacing 0.15em, uppercase

  작품 제목:
    SUIT 600, 28px→36px, #F0F0F0
    margin-top: 8px
    line-height: 1.2

  캐릭터명:
    Pretendard 400, 15px, #999999
    margin-top: 6px

  ── 구분선 ──
  border-top: 1px solid #2A2A2A
  margin-y: 32px

  레이블 "ARTIST":
    Pretendard 400, 11px, #E27DA6, letter-spacing 0.15em, uppercase

  학생 이름:
    Pretendard 500, 16px, #F0F0F0
    margin-top: 8px

  학번 / 전공:
    Pretendard 400, 13px, #999999
    margin-top: 4px

  (description 있는 경우)
  ── 구분선 ──
  레이블 "ABOUT":
    Pretendard 400, 11px, #E27DA6, letter-spacing 0.15em, uppercase
  본문:
    Pretendard 400, 14px, #999999, line-height: 1.9
    margin-top: 12px

  (concept 있는 경우)
  ── 구분선 ──
  레이블 "CONCEPT":
    Pretendard 400, 11px, #E27DA6, letter-spacing 0.15em, uppercase
  본문:
    Pretendard 400, 14px, #999999, line-height: 1.9
    margin-top: 12px

포스터 없을 때 (404 처리):
  중앙 정렬, "존재하지 않는 작품입니다" 텍스트 + 목록으로 버튼
```

**Props:** 없음 (useParams로 id 추출, posters.js에서 find)

---

### `src/pages/AboutPage.jsx`

**역할:** 전시 소개 페이지

**스펙:**
```
최상단 div: className="page-enter"
padding-y:  96px (모바일: 64px)
padding-x:  .container 규격 따름
max-width:  720px (텍스트 가독성 최적)

내용:
  - 레이블 "ABOUT THE EXHIBITION"
  - 전시 제목 (section-heading)
  - 전시 소개 본문 (body)
  - 구분선
  - 레이블 "DEPARTMENT"
  - 전공 소개 본문
  - 구분선
  - 레이블 "WORKS"
  - "총 10점의 캐릭터 작품이 전시됩니다." 본문
  - [전시 보러 가기 버튼] → /
```

---

## 3. 공유 컴포넌트

### `src/components/PosterCard.jsx`

**역할:** 홈 그리드의 포스터 카드 1개

**Props:**
```javascript
{
  id:          string,   // slug (라우팅용)
  title:       string,   // 작품명
  characterName: string, // 캐릭터명
  studentName: string,   // 학생 이름
  imageSrc:    string,   // 이미지 경로
  imageAlt:    string,   // alt 텍스트
}
```

**스펙:**
```
element: <Link to={`/poster/${id}`}>
display: flex, flex-direction: column
background: #111111
border: 1px solid #2A2A2A
cursor: pointer
transition: border-color 200ms ease
overflow: hidden

hover:
  border-color: #E27DA6

이미지 영역:
  width: 100%
  aspect-ratio: auto (이미지 원본 비율)
  object-fit: contain
  background: #111111
  display: block
  loading: "lazy"

텍스트 영역:
  padding: 16px
  border-top: 1px solid #2A2A2A

  작품명:
    Pretendard 500, 15px(모바일)/17px(데스크탑), #F0F0F0
    white-space: nowrap, overflow: hidden, text-overflow: ellipsis

  학생명:
    Pretendard 400, 12px, #999999
    margin-top: 4px
    white-space: nowrap, overflow: hidden, text-overflow: ellipsis
```

---

### `src/components/PosterGrid.jsx`

**역할:** 카드 10개 묶음 그리드

**Props:**
```javascript
{ posters: Array }
```

**스펙:**
```css
display: grid;
grid-template-columns: 1fr;                          /* 모바일 */
gap: 24px;

@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);             /* 태블릿 */
}

@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);             /* 데스크탑 */
  gap: 32px;
}

@media (min-width: 1920px) {
  gap: 40px;                                         /* FHD+ */
}
```

---

### `src/components/BackButton.jsx`

**역할:** 상세 페이지 → 목록 복귀 링크

**Props:** 없음

**스펙:**
```
element: <button onClick={() => navigate(-1)}> 또는 <Link to="/">
display: inline-flex, align-items: center, gap: 6px

아이콘: lucide-react <ArrowLeft> size={14} strokeWidth={1.5}

텍스트: "BACK TO LIST"
  Pretendard 400, 12px, #999999, letter-spacing 0.1em, uppercase

hover: color #F0F0F0 (아이콘 포함), transition 150ms ease
```

---

## 4. 반응형 요약

| 컴포넌트 | 모바일 (~767px) | 태블릿 (768~1023px) | 데스크탑 (1024px~) |
|----------|-----------------|---------------------|-------------------|
| Header | 60px 높이, 링크 12px | 72px | 72px |
| HeroSection | 제목 32px | 제목 48px | 제목 64px |
| PosterGrid | 1열 | 2열 | 3열 |
| SinglePoster | 세로 스택 | 1:1 그리드, gap 48px | 55:45 그리드, gap 80px, sticky 텍스트 |
| Footer | 세로 스택 | 가로 | 가로 |

---

## 레이아웃 클래스 규격 (v3 — global.css 기준)

### .container
- max-width: 1440px, margin: 0 auto
- padding-x: 20px (모바일) / 28px (태블릿) / 40px (데스크탑)
- 사용처: Header, Footer, ContentPage, SinglePosterPage,
          AwardPage, AboutPage INFO 섹션

### .text-full
- max-width: 없음 (전체 폭 사용)
- padding-x: 20px / 28px / 40px (container와 동일)
- 사용처: AboutPage 대형 텍스트 섹션 전용
- 좌정렬(DIGITAL/ART&/HUMANITIES): textAlign left
- 우정렬(NEW/CHARACTER/CONTEST): textAlign right

### Header
- height: 72px (모바일: 60px)
- position: sticky, top: 0, z-index: 100
- 내부: .container 사용

### Footer
- 내부: .container 사용
- 좌: Hallym University DAH 링크 + © 저작권
- 우: 웹사이트 수정관리 (우측 정렬)

### ContentSection (Content 페이지)
- 3단 그리드: 30fr 35fr 35fr (데스크탑)
- 캐릭터명: clamp(72px, 7vw, 120px) SUIT 700
- 작품명: 26px SUIT 600
- 설명: 16px Pretendard 400, line-height 2.0
- 각 컬럼 padding: 64px (좌우 48px씩)

### SinglePosterPage
- 2단 그리드: 55fr 45fr (데스크탑), gap: 80px
- 작품 제목: clamp(32px, 3.5vw, 48px) SUIT 600
- 캐릭터 영문명: 18px Pretendard 400
- 설명 본문: 15px, line-height 2.0
- sticky top: 100px