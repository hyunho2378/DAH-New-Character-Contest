import { Link } from 'react-router-dom'
import { useState } from 'react'
import { REVEAL_IDENTITY } from '../data/config.js'

export default function PosterSection({ poster, isLast, sectionRef }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div ref={sectionRef}>
      <hr className="poster-section-divider" />

      <section style={{ paddingTop: '80px', paddingBottom: isLast ? '0' : '80px' }}>

        {/* 상단 헤더 행: 순번+전공 | 자세히 보기 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              color: '#555555',
            }}>
              {poster.index}
            </span>
            {REVEAL_IDENTITY && (
              <span style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                color: '#999999',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {poster.major}
              </span>
            )}
          </div>

          <Link to={`/poster/${poster.id}`} className="view-link">
            자세히 보기 →
          </Link>
        </div>

        {/* 캐릭터명 HUGE */}
        <div
          className="character-name-huge"
          style={{ marginBottom: '48px' }}
        >
          {poster.characterNameEn || poster.characterName}
        </div>

        {/* 이미지 + 텍스트 2단 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: '64px',
            alignItems: 'start',
          }}
          className="poster-section-grid"
        >
          {/* 이미지 */}
          <div>
            {imgError ? (
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
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '12px',
                  color: '#555555',
                }}>
                  이미지 준비 중
                </span>
              </div>
            ) : (
              <Link to={`/poster/${poster.id}`}>
                <img
                  src={poster.imageSrc}
                  alt={poster.imageAlt}
                  loading="lazy"
                  className="poster-img"
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%',
                    objectFit: 'contain',
                    background: '#111111',
                    border: '1px solid #2A2A2A',
                    display: 'block',
                    transition: 'border-color 200ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#E27DA6' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A' }}
                />
              </Link>
            )}
          </div>

          {/* 텍스트 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            paddingTop: '8px',
          }}>
            {/* 학생 정보 — 블라인드 모드 */}
            {REVEAL_IDENTITY ? (
              <div>
                <div style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#F0F0F0',
                }}>
                  {poster.studentName}
                </div>
                <div style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px',
                  color: '#555555',
                  marginTop: '4px',
                }}>
                  {poster.studentId}
                </div>
              </div>
            ) : (
              <div style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                color: '#555555',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                작가 미공개
              </div>
            )}

            <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A' }} />

            {/* 짧은 설명 */}
            <p style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#999999',
              lineHeight: 1.85,
            }}>
              {poster.summary}
            </p>

            {/* 태그라인 */}
            <p style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: '#E27DA6',
            }}>
              {poster.tagline}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
