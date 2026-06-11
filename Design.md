# DESIGN.md — 디자인 시스템
# 2026 디지털인문예술전공 캐릭터 공모전 전시 웹사이트

---

## 플랫폼
**B형 — 반응형 웹**
320px ~ 2560px 전 구간 대응 / 모바일 퍼스트

---

## 색상 팔레트 (허용된 색상 외 절대 사용 금지)

### 배경 계열
| 역할 | 변수명 | HEX |
|------|--------|-----|
| 메인 배경 | `--bg-primary` | `#1A1A1A` |
| 깊은 배경 (헤더/푸터) | `--bg-deep` | `#0A0A0A` |
| 카드 배경 | `--bg-card` | `#111111` |
| 카드 호버 배경 | `--bg-elevated` | `#222222` |
| 그라데이션 시작 | `--bg-gradient-start` | `#000000` |
| 그라데이션 끝 | `--bg-gradient-end` | `#2A2A2A` |

### 텍스트 계열
| 역할 | 변수명 | HEX |
|------|--------|-----|
| 본문 텍스트 | `--text-primary` | `#F0F0F0` |
| 보조 텍스트 | `--text-secondary` | `#999999` |
| 비활성 텍스트 | `--text-tertiary` | `#555555` |
| 강조 (키컬러) | `--text-accent` | `#E27DA6` |

### 경계선/구분
| 역할 | 변수명 | HEX |
|------|--------|-----|
| 가장 얇은 구분 | `--border-subtle` | `#2A2A2A` |
| 기본 경계선 | `--border-default` | `#333333` |
| 강조 경계선 | `--border-accent` | `#E27DA6` |

---

## 폰트 (이 두 가지 외 절대 사용 금지)

```
display font : SUIT       → 전시 제목, 대형 헤딩, 로고텍스트
body font    : Pretendard → 본문, 라벨, 메타, 네비, 버튼 전체
```

**CDN (index.html에 반드시 포함)**
```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"/>
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/suit-font@1.0.0/dist/suit.min.css"/>
```

---

## 타이포그래피 스케일

| 이름 | 폰트 | Weight | 모바일 | 태블릿 | 데스크탑 | 용도 |
|------|------|--------|--------|--------|----------|------|
| exhibition-title | SUIT | 700 | 32px | 48px | 64px | 전시 대제목 |
| section-heading | SUIT | 600 | 22px | 28px | 36px | 섹션 제목 |
| poster-title | SUIT | 600 | 20px | 24px | 28px | 상세페이지 작품 제목 |
| card-title | Pretendard | 500 | 15px | 16px | 17px | 카드 작품명 |
| card-meta | Pretendard | 400 | 12px | 12px | 13px | 카드 학생명 |
| body | Pretendard | 400 | 15px | 15px | 16px | 본문 |
| body-sm | Pretendard | 400 | 13px | 13px | 14px | 보조 본문 |
| nav | Pretendard | 400 | — | — | 14px | 네비게이션 |
| label | Pretendard | 500 | 10px | 11px | 11px | 대문자 레이블 |
| caption | Pretendard | 400 | 11px | 12px | 12px | 캡션, 저작권 |

**Label 사용 규칙:** 항상 `text-transform: uppercase`, `letter-spacing: 0.12em`

---

## 간격 체계 (4pt 배수)

```
--space-1:   4px
--space-2:   8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

---

## 브레이크포인트

| 이름 | px | 대상 |
|------|----|------|
| xs | 320px | 구형 소형 폰 (최소 기준) |
| sm | 390px | iPhone 14 기준 |
| md | 768px | 태블릿 세로 |
| lg | 1024px | 태블릿 가로 / 소형 노트북 |
| xl | 1280px | 일반 노트북 |
| 2xl | 1440px | 와이드 노트북 |
| 3xl | 1920px | FHD 모니터 |
| 4xl | 2560px | QHD / 울트라와이드 |

---

## 레이아웃 규격 (헤더·섹션·푸터 완전 통일) — v3

### 핵심 원칙
> 헤더, 푸터, 모든 섹션, About 대형 텍스트의 좌측 시작점은
> 항상 동일한 padding 값을 공유한다. 예외 없음.

### padding-x 규격

| 구간 | padding-x | 적용 클래스 |
|------|-----------|------------|
| ~767px (모바일) | 20px | .container / .text-full 공통 |
| 768~1023px (태블릿) | 28px | .container / .text-full 공통 |
| 1024px~ (데스크탑) | 40px | .container / .text-full 공통 |

### 두 클래스의 차이

| 클래스 | max-width | 용도 |
|--------|-----------|------|
| `.container` | 1440px (centered) | 헤더, 푸터, 섹션 내용, 일반 페이지 |
| `.text-full` | 없음 (전체 폭) | About 대형 텍스트 전용 |

→ 두 클래스 모두 동일한 padding-x를 사용하므로
  좌측 시작점이 항상 일치한다.

### padding-y (섹션별)

| 위치 | padding-y |
|------|-----------|
| 헤더 높이 | 72px (모바일: 60px) |
| About 히어로 텍스트 | paddingTop: 100px, paddingBottom: 0 |
| About 섹션 간 중간 여백 | padding: 32px 0 |
| About INFO 섹션 | paddingTop: 80px, paddingBottom: 80px |
| Content 히어로 | paddingTop: 120px, paddingBottom: 56px |
| Content 목록 | paddingBottom: 160px |
| SinglePoster 전체 | paddingTop: 100px, paddingBottom: 120px |
| Award 히어로 | paddingTop: 120px, paddingBottom: 64px |
| 푸터 | paddingTop: 48px, paddingBottom: 48px |

### 타이포그래피 크기 (v3 업데이트)

| 위치 | 크기 |
|------|------|
| About 대형 텍스트 (6줄 공통) | 14vw |
| About 대형 텍스트 line-height | 0.82 |
| Content 캐릭터명 (영문) | clamp(72px, 7vw, 120px) |
| Content 작품명 (한국어) | 26px |
| Content 설명 본문 | 16px |
| SinglePoster 작품 제목 | clamp(32px, 3.5vw, 48px) |
| SinglePoster 캐릭터 영문명 | 18px |
| SinglePoster 설명 본문 | 15px |

---

## 포스터 그리드 규격

| 구간 | 열 수 | gap |
|------|-------|-----|
| ~767px | 1열 | 24px |
| 768~1023px | 2열 | 24px |
| 1024px~ | 3열 | 32px |
| 1920px~ | 3열 (카드 더 커짐) | 40px |

---

## 이미지 트리트먼트 (v4 업데이트)

### 포스터 공통 규격
- aspect-ratio: 420 / 594  (A2 비율 강제)
- object-fit: contain
- object-position: center
- background: #111111
- border-radius: 0
- border: 1px solid #2A2A2A
- shadow: 없음 (기본 상태)

### Hover 인터랙션 (포스터 전용 허용)
- 호버 포스터:
    transform: scale(1.04)
    box-shadow: 0 20px 60px rgba(0,0,0,0.6)
    border-color: #E27DA6
    z-index: 10
    transition: 350ms ease
- 비호버 포스터:
    opacity: 0.65
    filter: blur(1.5px)
    transition: 350ms ease
- 호버 없는 초기 상태: opacity 1, filter none

### 공통
- lazy loading: loading="lazy" 필수
- alt: 반드시 작성

---

## 버튼 / 링크 스타일

### Primary Button (목록으로, CTA)
```css
border: 1px solid #E27DA6;
color: #E27DA6;
background: transparent;
padding: 10px 28px;
font-family: Pretendard;
font-size: 13px;
font-weight: 400;
letter-spacing: 0.06em;
text-transform: uppercase;
cursor: pointer;
transition: background 200ms ease, color 200ms ease;

&:hover {
  background: #E27DA6;
  color: #0A0A0A;
}
```

### Back Link (상세 → 목록)
```css
color: #999999;
font-family: Pretendard;
font-size: 12px;
font-weight: 400;
letter-spacing: 0.1em;
text-transform: uppercase;
display: inline-flex;
align-items: center;
gap: 6px;
cursor: pointer;
transition: color 150ms ease;

&:hover { color: #F0F0F0; }
```

### Nav Link
```css
color: #999999;
font-family: Pretendard;
font-size: 14px;
font-weight: 400;
letter-spacing: 0.03em;
transition: color 150ms ease;

&:hover  { color: #F0F0F0; }
&.active { color: #E27DA6; }
```

---

## 마이크로 인터랙션 (허용 목록)

| 요소 | 효과 | duration | 허용 여부 |
|------|------|----------|-----------|
| 페이지 진입 | opacity 0→1 + translateY(6px→0) | 400ms ease | ✅ 허용 |
| 카드 hover | border-color → #E27DA6 | 200ms ease | ✅ 허용 |
| 버튼 hover | background + color 변화 | 200ms ease | ✅ 허용 |
| 링크 hover | color 변화 | 150ms ease | ✅ 허용 |
| 헤더 스크롤 | background opacity 미세 변화 | 200ms ease | ✅ 허용 |
| scale 확대 | — | — | ❌ 금지 |
| parallax | — | — | ❌ 금지 |
| 자동 슬라이드 | — | — | ❌ 금지 |
| scroll-trigger | — | — | ❌ 금지 |
| 3D / WebGL | — | — | ❌ 금지 |

---

## Visual Language 요약

- 다크하고 정적이며 숨쉬는 아트 갤러리 느낌
- 포스터 이미지가 주인공, 나머지는 조연
- 여백이 콘텐츠다 — 꽉 채우지 않는다
- 타이포그래피는 SUIT(제목) + Pretendard(본문) 두 가지만
- 키컬러 #E27DA6는 강조에만, 남발하지 않는다
- 구분선(border)이 레이아웃의 언어다