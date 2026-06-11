import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Layout/Header.jsx'
import Footer from './components/Layout/Footer.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContentPage from './pages/ContentPage.jsx'
import SinglePosterPage from './pages/SinglePosterPage.jsx'
import AwardPage from './pages/AwardPage.jsx'

function Layout({ children }) {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout><AboutPage /></Layout>}
        />
        <Route
          path="/content"
          element={<Layout><ContentPage /></Layout>}
        />
        <Route
          path="/poster/:id"
          element={<Layout><SinglePosterPage /></Layout>}
        />
        <Route
          path="/award"
          element={<Layout><AwardPage /></Layout>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
