# ROUTES.md — React Router v6 라우팅
# 2026 디지털인문예술전공 캐릭터 공모전 전시 웹사이트

---

## 라우트 테이블

| 경로 | 컴포넌트 | 역할 |
|------|----------|------|
| `/` | HomePage | 포스터 전체 그리드 |
| `/poster/:id` | SinglePosterPage | 포스터 상세 (1장) |
| `/about` | AboutPage | 전시 소개 |
| `*` | → `/` redirect | 잘못된 경로 처리 |

---

## App.jsx 라우팅 구조

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Layout/Header.jsx'
import Footer from './components/Layout/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import SinglePosterPage from './pages/SinglePosterPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout><HomePage /></Layout>}
        />
        <Route
          path="/poster/:id"
          element={<Layout><SinglePosterPage /></Layout>}
        />
        <Route
          path="/about"
          element={<Layout><AboutPage /></Layout>}
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## 파라미터 규칙

### `/poster/:id`
- `id` 값: `posters.js`의 `id` 필드 (slug 문자열, 소문자)
- 예시 URL: `/poster/lumen`, `/poster/dahong`, `/poster/matda`

**SinglePosterPage.jsx 데이터 조회:**
```jsx
import { useParams, useNavigate } from 'react-router-dom'
import { posters } from '../data/posters.js'

export default function SinglePosterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const poster = posters.find(p => p.id === id)

  // 포스터 없을 때 404 처리
  if (!poster) {
    return <NotFound />
  }

  return (
    <div className="page-enter">
      {/* 상세 레이아웃 */}
    </div>
  )
}
```

---

## 포스터 ID 슬러그 목록

| id (URL) | 작품명 | 학생 |
|----------|--------|------|
| `matda` | 맛다! | 조영은 |
| `dahong` | 다홍이 | 최은영 |
| `ain` | 아-인 | 한수빈 |
| `dwuli` | 디우리 | 한수빈 |
| `lumen` | 루멘 | 정민서 |
| `dfoo` | 디푸 | 이지현 |
| `poster_07` | TBD | TBD |
| `poster_08` | TBD | TBD |
| `poster_09` | TBD | TBD |
| `poster_10` | TBD | TBD |

---

## 네비게이션 흐름

```
[헤더 Nav]
  Home  →  /
  About →  /about

[홈 페이지]
  PosterCard 클릭 → /poster/:id

[상세 페이지]
  BackButton 클릭 → navigate(-1) or /

[잘못된 URL]
  * → / (redirect)
```

---

## BackButton 동작 규칙

```jsx
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate(-1)}>
      {/* ArrowLeft 아이콘 + "BACK TO LIST" */}
    </button>
  )
}
```

> 히스토리가 없는 경우(직접 URL 접근) → `/` 으로 fallback
```jsx
onClick={() => {
  if (window.history.length > 1) {
    navigate(-1)
  } else {
    navigate('/')
  }
}}
```

---

## Vite 반응형 배포 설정

`vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
```

Vercel 배포 시 SPA 라우팅 처리를 위해
프로젝트 루트에 `vercel.json` 생성:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

