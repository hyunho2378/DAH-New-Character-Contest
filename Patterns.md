# PATTERNS.md — 반복 UI 패턴
# 2026 디지털인문예술전공 캐릭터 공모전 전시 웹사이트

---

## 1. 공통 컨테이너 패턴

**모든 섹션은 이 컨테이너 안에 들어간다. 예외 없음.**

```jsx
// 사용 예시
<section>
  <div className="container">
    {/* 콘텐츠 */}
  </div>
</section>
```

```css
/* global.css에 정의 */
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 768px) {
  .container {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 48px;
    padding-right: 48px;
  }
}

@media (min-width: 1920px) {
  .container {
    padding-left: 80px;
    padding-right: 80px;
  }
}
```

---

## 2. 페이지 진입 Fade-in

**모든 페이지 최상단 wrapper에 적용. 다른 인터랙션과 조합 금지.**

```css
/* global.css */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeIn 400ms ease forwards;
}
```

```jsx
// 사용 예시
export default function HomePage() {
  return (
    <div className="page-enter">
      {/* 페이지 내용 */}
    </div>
  )
}
```

---

## 3. 섹션 구분선 패턴

**섹션 사이 구분은 항상 이 방식으로.**

```css
.section-divider {
  border: none;
  border-top: 1px solid #2A2A2A;   /* --border-subtle */
  margin: 0;
}
```

```jsx
<hr className="section-divider" />
```

---

## 4. 레이블 텍스트 패턴

**소제목 위의 작은 대문자 레이블. 항상 이 스타일.**

```jsx
function Label({ children }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: 'Pretendard, sans-serif',
      fontSize: '11px',
      fontWeight: 400,
      color: '#E27DA6',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    }}>
      {children}
    </span>
  )
}

// 사용 예시
<Label>2026 Exhibition</Label>
<Label>Artist</Label>
<Label>Concept</Label>
```

---

## 5. 카드 hover 패턴

**scale 금지. border-color 변화만.**

```css
.poster-card {
  border: 1px solid #2A2A2A;
  transition: border-color 200ms ease;
  cursor: pointer;
}

.poster-card:hover {
  border-color: #E27DA6;
}
```

---

## 6. 빈 상태 패턴 (Empty State)

**포스터가 없을 때 또는 로드 실패 시.**

```jsx
function EmptyState({ message = '작품을 불러올 수 없습니다.' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '96px 16px',
      gap: '16px',
    }}>
      <p style={{
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '14px',
        color: '#555555',
        letterSpacing: '0.03em',
      }}>
        {message}
      </p>
    </div>
  )
}
```

---

## 7. 404 / Not Found 패턴

**잘못된 포스터 ID로 진입했을 때.**

```jsx
function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="page-enter" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '24px',
    }}>
      <span style={{
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '11px',
        color: '#E27DA6',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        404
      </span>
      <p style={{
        fontFamily: 'SUIT, sans-serif',
        fontSize: '24px',
        fontWeight: 600,
        color: '#F0F0F0',
      }}>
        존재하지 않는 작품입니다
      </p>
      <button
        onClick={() => navigate('/')}
        style={{ /* Primary Button 스타일 */ }}
      >
        목록으로
      </button>
    </div>
  )
}
```

---

## 8. 헤더 스크롤 패턴

**스크롤 내려갈 때 헤더 border 강조. 무거운 효과 없음.**

```jsx
// Header.jsx 내부
import { useState, useEffect } from 'react'

const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20)
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])

// border-bottom 색상
borderBottom: `1px solid ${scrolled ? '#333333' : '#2A2A2A'}`
// transition: border-color 200ms ease
```

---

## 9. 상세 페이지 2단 레이아웃 패턴

**데스크탑: 이미지 좌 3, 텍스트 우 2. 모바일: 세로 스택.**

```jsx
// SinglePosterPage.jsx 내부
<div style={{
  display: 'grid',
  gridTemplateColumns: '3fr 2fr',  /* 데스크탑 */
  gap: '64px',
  alignItems: 'start',
}}>
  {/* 이미지 */}
  {/* 텍스트 */}
</div>

/* 태블릿 */
@media (max-width: 1023px) {
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

/* 모바일 */
@media (max-width: 767px) {
  grid-template-columns: 1fr;
  gap: 32px;
}
```

---

## 10. 이미지 Fallback 패턴

**이미지 로드 실패 시 graceful 처리.**

```jsx
function PosterImage({ src, alt }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div style={{
        width: '100%',
        aspectRatio: '3/4',
        background: '#111111',
        border: '1px solid #2A2A2A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '12px',
          color: '#555555',
          letterSpacing: '0.05em',
        }}>
          이미지 준비 중
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      style={{
        width: '100%',
        objectFit: 'contain',
        background: '#111111',
        display: 'block',
      }}
    />
  )
}
```

---

## 11. Active Nav 판별 패턴

```jsx
// Header.jsx 내부
import { useLocation, Link } from 'react-router-dom'

const { pathname } = useLocation()
const isActive = (path) => pathname === path

// 적용
<Link
  to="/"
  style={{ color: isActive('/') ? '#E27DA6' : '#999999' }}
>
  Home
</Link>
```

---

## 반응형 패턴 요약

| 패턴 | 모바일 | 태블릿 | 데스크탑 |
|------|--------|--------|----------|
| 컨테이너 padding-x | 16px | 24px | 48px |
| 그리드 | 1열 | 2열 | 3열 |
| 상세 레이아웃 | column | 1:1 grid | 3:2 grid |
| 히어로 제목 | 32px | 48px | 64px |
| 헤더 높이 | 56px | 64px | 64px |
| 섹션 padding-y | 64px | 80px | 96px |