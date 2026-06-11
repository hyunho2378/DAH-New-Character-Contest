import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import { posters } from '../data/posters.js'
import { REVEAL_IDENTITY } from '../data/config.js'
import BackButton from '../components/BackButton.jsx'

// [텍스트] → 밝게 강조 파싱
function parseHighlights(text) {
  if (!text) return null
  const parts = text.split(/(\[[^\]]+\])/)
  return parts.map((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return (
        <span key={i} style={{ color: '#F0F0F0', fontWeight: 500 }}>
          {part.slice(1, -1)}
        </span>
      )
    }
    return part
  })
}

function DetailBlock({ label, content }) {
  if (!content) return null
  return (
    <div>
      <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', margin: '28px 0' }} />
      <span style={{ display: 'block', fontFamily: "'Pretendard', sans-serif", fontSize: '11px', fontWeight: 400, color: '#E27DA6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
        {label}
      </span>
      <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '15px', fontWeight: 400, color: '#999999', lineHeight: 2.0, whiteSpace: 'pre-line', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
        {parseHighlights(content)}
      </p>
    </div>
  )
}

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '24px' }}>
      <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '11px', color: '#E27DA6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>404</span>
      <p style={{ fontFamily: "'SUIT', sans-serif", fontSize: '24px', fontWeight: 600, color: '#F0F0F0' }}>존재하지 않는 작품입니다</p>
      <button onClick={() => navigate('/')}
        style={{ border: '1px solid #E27DA6', color: '#E27DA6', background: 'transparent', padding: '10px 28px', fontFamily: "'Pretendard', sans-serif", fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 200ms ease, color 200ms ease' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#E27DA6'; e.currentTarget.style.color = '#0A0A0A' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#E27DA6' }}
      >목록으로</button>
    </div>
  )
}

function PosterCarousel({ images, posterHovered, isMobile }) {
  const [current, setCurrent] = useState(0)
  const [imgError, setImgError] = useState({})
  const timerRef = useRef(null)
  const total = images.length

  const goTo = useCallback((idx) => {
    setCurrent((idx + total) % total)
  }, [total])

  useEffect(() => {
    timerRef.current = setInterval(() => { goTo(current + 1) }, 5000)
    return () => clearInterval(timerRef.current)
  }, [current, goTo])

  const handleNav = (dir) => {
    clearInterval(timerRef.current)
    goTo(current + dir)
  }

  const imgStyle = isMobile ? {
    width: '100%',
    aspectRatio: '420 / 594',
    background: '#111111',
    border: '1px solid #2A2A2A',
    overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  } : {
    height: '100%',
    background: '#111111',
    border: `1px solid ${posterHovered ? '#E27DA6' : '#2A2A2A'}`,
    overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transform: posterHovered ? 'scale(1.22)' : 'scale(1)',
    boxShadow: posterHovered ? '0 40px 100px rgba(0,0,0,0.85)' : '0 0 0 rgba(0,0,0,0)',
    transition: posterHovered
      ? 'transform 280ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms ease, border-color 180ms ease'
      : 'transform 480ms cubic-bezier(0.22,1,0.36,1), box-shadow 480ms ease, border-color 350ms ease',
  }

  return (
    <div style={{ position: 'relative', ...(isMobile ? {} : { height: 'clamp(300px, calc(100vh - 220px), 700px)' }) }}>
      <div style={imgStyle}>
        {imgError[current] ? (
          <span style={{ fontFamily: 'Pretendard', fontSize: '11px', color: '#555555', letterSpacing: '0.08em', textTransform: 'uppercase' }}>이미지 준비 중</span>
        ) : (
          <img key={current} src={images[current]} alt={`포스터 ${current + 1}`}
            onError={() => setImgError(prev => ({ ...prev, [current]: true }))}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', animation: 'fadeIn 300ms ease' }}
          />
        )}
      </div>

      {total > 1 && (
        <>
          <button onClick={() => handleNav(-1)} style={{ position: 'absolute', left: isMobile ? '12px' : '-20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,10,0.85)', border: '1px solid #333333', color: '#F0F0F0', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Pretendard', fontSize: '16px', fontWeight: 300, transition: 'background 150ms ease, border-color 150ms ease', zIndex: 2 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.borderColor = '#E27DA6' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.85)'; e.currentTarget.style.borderColor = '#333333' }}
          >‹</button>
          <button onClick={() => handleNav(1)} style={{ position: 'absolute', right: isMobile ? '12px' : '-20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,10,0.85)', border: '1px solid #333333', color: '#F0F0F0', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Pretendard', fontSize: '16px', fontWeight: 300, transition: 'background 150ms ease, border-color 150ms ease', zIndex: 2 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.borderColor = '#E27DA6' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.85)'; e.currentTarget.style.borderColor = '#333333' }}
          >›</button>
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', alignItems: 'center' }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => { clearInterval(timerRef.current); goTo(i) }}
                style={{ width: i === current ? '16px' : '6px', height: '6px', borderRadius: '3px', background: i === current ? '#E27DA6' : '#555555', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 300ms ease' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function SinglePosterPage() {
  const { id } = useParams()
  const [imgError, setImgError] = useState(false)
  const [posterHovered, setPosterHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const poster = posters.find(p => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
    setPosterHovered(false)
    const check = () => setIsMobile(window.innerWidth <= 767)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [id])

  if (!poster) return <NotFound />
  const { detail } = poster
  const hasCarousel = poster.images && poster.images.length > 1

  /* ── 모바일 레이아웃 ── */
  if (isMobile) {
    return (
      <div className="page-enter" style={{ position: 'relative', minHeight: '100vh' }}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, #0A0A0A 0%, #1A1A1A 40%, #111111 100%)' }} />
        <div style={{ position: 'relative' }}>
          {/* 상단: BackButton만 */}
          <div className="container" style={{ paddingTop: '24px', paddingBottom: '16px' }}>
            <BackButton />
          </div>

          {/* 포스터 — 화면 꽉 차게, 컨테이너 패딩 없이 */}
          <div style={{ width: '100%', background: '#111111', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A' }}>
            {hasCarousel ? (
              <PosterCarousel images={poster.images} posterHovered={false} isMobile={true} />
            ) : (
              imgError ? (
                <div style={{ width: '100%', aspectRatio: '420/594', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Pretendard', fontSize: '11px', color: '#555555' }}>이미지 준비 중</span>
                </div>
              ) : (
                <div style={{ width: '100%', aspectRatio: '420/594', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={poster.imageSrc} alt={poster.imageAlt} loading="lazy"
                    onError={() => setImgError(true)}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>
              )
            )}
          </div>

          {/* 하단: 설명 전체 */}
          <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
            <span style={{ display: 'block', fontFamily: "'Pretendard', sans-serif", fontSize: '11px', fontWeight: 400, color: '#E27DA6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Work</span>
            <h1 style={{ fontFamily: "'SUIT', sans-serif", fontWeight: 600, color: '#F0F0F0', fontSize: 'clamp(24px, 7vw, 36px)', lineHeight: 1.2, marginTop: '8px', wordBreak: 'keep-all' }}>
              {poster.title}
            </h1>
            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '16px', fontWeight: 400, color: '#999999', marginTop: '6px' }}>
              {poster.characterNameEn}
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', margin: '24px 0' }} />
            <span style={{ display: 'block', fontFamily: "'Pretendard', sans-serif", fontSize: '11px', fontWeight: 400, color: '#E27DA6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Artist</span>
            {REVEAL_IDENTITY ? (
              <>
                <p style={{ fontFamily: 'Pretendard', fontSize: '15px', fontWeight: 500, color: '#F0F0F0', marginTop: '8px' }}>{poster.studentName}</p>
                <p style={{ fontFamily: 'Pretendard', fontSize: '15px', color: '#555555', marginTop: '4px' }}>{poster.studentId} / {poster.major}</p>
              </>
            ) : (
              <p style={{ fontFamily: 'Pretendard', fontSize: '13px', color: '#555555', marginTop: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>투표 종료 후 공개 예정</p>
            )}
            <DetailBlock label="개요" content={detail.description} />
            <DetailBlock label="이름 유래" content={detail.nameOrigin} />
            <DetailBlock label="컨셉" content={detail.concept} />
            <DetailBlock label="세계관" content={detail.worldview} />
            <DetailBlock label="기획 의도" content={detail.planningIntent} />
            <DetailBlock label="특이사항" content={detail.specialNote} />
            <DetailBlock label="굿즈 / 컬러" content={detail.goods} />
          </div>
        </div>
      </div>
    )
  }

  /* ── 데스크탑 레이아웃 ── */
  return (
    <div className="page-enter" style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, #0A0A0A 0%, #1A1A1A 40%, #111111 100%)' }} />
      <div style={{ position: 'relative' }}>
        <div className="container" style={{ paddingTop: 'clamp(32px, 5vw, 64px)', paddingBottom: 'clamp(40px, 6vw, 64px)' }}>
          <div className="detail-grid">
            {/* 좌: 포스터 */}
            <div
              onMouseEnter={() => setPosterHovered(true)}
              onMouseLeave={() => setPosterHovered(false)}
              style={{ position: 'sticky', top: '80px', cursor: posterHovered ? 'zoom-out' : 'zoom-in' }}
            >
              {hasCarousel ? (
                <PosterCarousel images={poster.images} posterHovered={posterHovered} isMobile={false} />
              ) : (
                imgError ? (
                  <div style={{ height: 'clamp(300px, calc(100vh - 220px), 700px)', background: '#111111', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Pretendard', fontSize: '11px', color: '#555555' }}>이미지 준비 중</span>
                  </div>
                ) : (
                  <div style={{
                    height: 'clamp(300px, calc(100vh - 220px), 700px)',
                    background: '#111111',
                    border: `1px solid ${posterHovered ? '#E27DA6' : '#2A2A2A'}`,
                    overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: posterHovered ? 'scale(1.22)' : 'scale(1)',
                    boxShadow: posterHovered ? '0 40px 100px rgba(0,0,0,0.85)' : '0 0 0 rgba(0,0,0,0)',
                    transition: posterHovered
                      ? 'transform 280ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms ease, border-color 180ms ease'
                      : 'transform 480ms cubic-bezier(0.22,1,0.36,1), box-shadow 480ms ease, border-color 350ms ease',
                  }}>
                    <img src={poster.imageSrc} alt={poster.imageAlt} loading="lazy"
                      onError={() => setImgError(true)}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
                    />
                  </div>
                )
              )}
              <p style={{ fontFamily: 'Pretendard', fontSize: '10px', color: '#555555', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: hasCarousel ? '40px' : '10px', textAlign: 'center', userSelect: 'none', opacity: posterHovered ? 0 : 0.7, transition: 'opacity 200ms ease' }}>
                Hover to zoom
              </p>
            </div>

            {/* 우: 텍스트 */}
            <div style={{ position: 'sticky', top: '100px', filter: posterHovered ? 'blur(5px)' : 'blur(0px)', opacity: posterHovered ? 0.35 : 1, pointerEvents: posterHovered ? 'none' : 'auto', transition: posterHovered ? 'filter 280ms ease, opacity 280ms ease' : 'filter 480ms ease, opacity 480ms ease' }}>
              <BackButton />
              <div style={{ marginTop: '40px' }}>
                <span style={{ display: 'block', fontFamily: "'Pretendard', sans-serif", fontSize: '11px', fontWeight: 400, color: '#E27DA6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Work</span>
                <h1 style={{ fontFamily: "'SUIT', sans-serif", fontWeight: 600, color: '#F0F0F0', fontSize: 'clamp(24px, 3.5vw, 64px)', lineHeight: 1.2, marginTop: '8px', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{poster.title}</h1>
                <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '18px', fontWeight: 400, color: '#999999', marginTop: '6px' }}>{poster.characterNameEn}</p>
                <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', margin: '28px 0' }} />
                <span style={{ display: 'block', fontFamily: "'Pretendard', sans-serif", fontSize: '11px', fontWeight: 400, color: '#E27DA6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Artist</span>
                {REVEAL_IDENTITY ? (
                  <>
                    <p style={{ fontFamily: 'Pretendard', fontSize: '15px', fontWeight: 500, color: '#F0F0F0', marginTop: '8px' }}>{poster.studentName}</p>
                    <p style={{ fontFamily: 'Pretendard', fontSize: '15px', color: '#555555', marginTop: '4px' }}>{poster.studentId} / {poster.major}</p>
                  </>
                ) : (
                  <p style={{ fontFamily: 'Pretendard', fontSize: '13px', color: '#555555', marginTop: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>투표 종료 후 공개 예정</p>
                )}
                <DetailBlock label="개요" content={detail.description} />
                <DetailBlock label="이름 유래" content={detail.nameOrigin} />
                <DetailBlock label="컨셉" content={detail.concept} />
                <DetailBlock label="세계관" content={detail.worldview} />
                <DetailBlock label="기획 의도" content={detail.planningIntent} />
                <DetailBlock label="특이사항" content={detail.specialNote} />
                <DetailBlock label="굿즈 / 컬러" content={detail.goods} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}