import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { posters } from '../data/posters.js'
import { REVEAL_IDENTITY } from '../data/config.js'

// ─── 사이즈 상수 — 전체 통일 ───────────────────────────
const NAME_FONT  = 'clamp(36px, 4.2vw, 96px)'
const TITLE_FONT = '22px'
const BODY_FONT  = '15px'
const TAG_FONT   = '14px'
const META_FONT  = '12px'
const COL_PAD_V  = '44px'
const COL_PAD_H  = '40px'
const POSTER_MAX = '380px'
// ────────────────────────────────────────────────────────

function PosterImage({ src, alt, isHovered, onError, hasError }) {
  if (hasError) {
    return (
      <div style={{ width: '100%', maxWidth: POSTER_MAX, aspectRatio: '420/594', background: '#111111', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Pretendard', fontSize: '11px', color: '#555555', letterSpacing: '0.08em', textTransform: 'uppercase' }}>이미지 준비 중</span>
      </div>
    )
  }
  return (
    <div style={{
      width: '100%',
      maxWidth: POSTER_MAX,
      aspectRatio: '420 / 594',
      overflow: 'hidden',
      background: '#111111',
      border: `1px solid ${isHovered ? '#E27DA6' : '#2A2A2A'}`,
      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
      boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.6)' : 'none',
      transition: 'transform 350ms ease, border-color 350ms ease, box-shadow 350ms ease',
      position: 'relative',
      zIndex: isHovered ? 10 : 1,
    }}>
      <img src={src} alt={alt} loading="lazy" onError={onError}
        style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
      />
    </div>
  )
}

function ContentSection({ poster, index, sectionRef, hoveredId, onHover }) {
  const [imgError, setImgError] = useState(false)
  const isHovered = hoveredId === poster.id
  const isDimmed  = hoveredId !== null && hoveredId !== poster.id

  return (
    <article
      ref={sectionRef}
      onMouseEnter={() => onHover(poster.id)}
      onMouseLeave={() => onHover(null)}
      style={{ opacity: isDimmed ? 0.65 : 1, filter: isDimmed ? 'blur(1.5px)' : 'none', transition: 'opacity 350ms ease, filter 350ms ease' }}
    >
      <div style={{ borderTop: '1px solid #2A2A2A' }} />

      {/* 헤더 행 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid #2A2A2A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'Pretendard', fontSize: '12px', fontWeight: 300, color: '#555555', letterSpacing: '0.05em' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: 'Pretendard', fontSize: '11px', fontWeight: 400, color: '#555555', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            ( Character )
          </span>
        </div>
        <Link to={`/poster/${poster.id}`} className="view-link">자세히 보기 →</Link>
      </div>

      <div className="content-section-grid">

        {/* ── 좌: 캐릭터명 ── */}
        <div className="content-col-name" style={{
          borderRight: '1px solid #2A2A2A',
          padding: `${COL_PAD_V} ${COL_PAD_H} ${COL_PAD_V} 0`,
          display: 'flex',
          alignItems: 'flex-start',
        }}>
          {/* overflow: hidden 제거 — 짤림 방지 */}
          {/* JS hover 제거 — CSS .name-link:hover 로 처리 */}
          <Link to={`/poster/${poster.id}`} className="name-link">
            <span style={{
              fontFamily: 'SUIT, sans-serif',
              fontWeight: 700,
              fontSize: NAME_FONT,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              display: 'block',
              wordBreak: 'break-word',
            }}>
              {poster.characterNameEn || poster.characterName}
            </span>
          </Link>
        </div>

        {/* ── 중: 설명 ── */}
        <div className="content-col-info" style={{
          borderRight: '1px solid #2A2A2A',
          padding: `${COL_PAD_V} ${COL_PAD_H}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div style={{ fontFamily: 'SUIT', fontWeight: 600, fontSize: TITLE_FONT, color: '#F0F0F0' }}>
            {poster.title}
          </div>
          <p style={{ fontFamily: 'Pretendard', fontSize: BODY_FONT, fontWeight: 400, color: '#999999', lineHeight: 1.9, letterSpacing: '0.01em', wordBreak: 'keep-all', overflowWrap: 'break-word', whiteSpace: 'pre-line' }}>
            {poster.summary}
          </p>
          <p style={{ fontFamily: 'Pretendard', fontSize: TAG_FONT, fontWeight: 400, color: '#E27DA6', letterSpacing: '0.05em', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
            {poster.tagline}
          </p>
          <div style={{ borderTop: '1px solid #2A2A2A' }} />
          {REVEAL_IDENTITY ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'Pretendard', fontSize: '11px', fontWeight: 400, color: '#555555', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Artist</span>
              <span style={{ fontFamily: 'Pretendard', fontSize: META_FONT, fontWeight: 500, color: '#F0F0F0', marginTop: '6px' }}>{poster.studentName}</span>
              <span style={{ fontFamily: 'Pretendard', fontSize: '11px', fontWeight: 400, color: '#555555' }}>{poster.studentId} / {poster.major}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'Pretendard', fontSize: '11px', fontWeight: 400, color: '#555555', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Artist</span>
              <span style={{ fontFamily: 'Pretendard', fontSize: META_FONT, fontWeight: 400, color: '#555555', fontStyle: 'italic' }}>투표 종료 후 공개 예정</span>
            </div>
          )}
        </div>

        {/* ── 우: 포스터 ── */}
        <div className="content-col-image" style={{
          padding: `${COL_PAD_V} 0 ${COL_PAD_V} ${COL_PAD_H}`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          <Link to={`/poster/${poster.id}`} style={{ display: 'block', width: '100%' }}>
            <PosterImage src={poster.imageSrc} alt={poster.imageAlt} isHovered={isHovered} onError={() => setImgError(true)} hasError={imgError} />
          </Link>
        </div>

      </div>
    </article>
  )
}

export default function ContentPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredId, setHoveredId] = useState(null)
  const sectionRefs = useRef(posters.map(() => ({ current: null })))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref.current) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.3 }
      )
      obs.observe(ref.current)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <div className="page-enter">
      <section style={{ background: 'linear-gradient(to bottom, #000000, #1A1A1A)', paddingTop: '96px', paddingBottom: '48px' }}>
        <div className="container">
          <span style={{ display: 'block', fontFamily: 'Pretendard', fontSize: '11px', fontWeight: 400, color: '#E27DA6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            2026 Exhibition
          </span>
          <h1 style={{ fontFamily: 'SUIT', fontWeight: 700, color: '#F0F0F0', fontSize: 'clamp(28px, 4.5vw, 80px)', lineHeight: 1.15, marginTop: '14px' }}>
            디지털인문예술전공<br />신규 캐릭터 공모전 작품 소개
          </h1>
          <p style={{ fontFamily: 'Pretendard', fontSize: '13px', fontWeight: 400, color: '#555555', marginTop: '10px', letterSpacing: '0.05em' }}>
            총 {posters.length}점 수록
          </p>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #2A2A2A' }} />

      <section style={{ paddingBottom: '120px' }}>
        <div className="container">
          {posters.map((poster, i) => (
            <ContentSection
              key={poster.id} poster={poster} index={i}
              sectionRef={el => { sectionRefs.current[i].current = el }}
              hoveredId={hoveredId} onHover={setHoveredId}
            />
          ))}
          <div style={{ borderTop: '1px solid #2A2A2A' }} />
        </div>
      </section>

      <div style={{ position: 'fixed', bottom: '40px', right: '48px', zIndex: 50, fontFamily: 'Pretendard', fontSize: '12px', fontWeight: 300, color: '#555555', letterSpacing: '0.08em', pointerEvents: 'none' }}>
        ( {String(activeIndex + 1).padStart(2, '0')} / {String(posters.length).padStart(2, '0')} )
      </div>
    </div>
  )
}