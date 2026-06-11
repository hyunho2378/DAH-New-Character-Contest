import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { posters } from '../data/posters.js'

const WINNERS = {
  1: posters.find(p => p.id === 'disoong'),  // 1등: 디숭이
  2: posters.find(p => p.id === 'dfoo'),     // 2등: 디푸
  3: posters.find(p => p.id === 'matda'),    // 3등: 도도
}

// Content 페이지 포스터 maxWidth = 380px 기준
// 2ND/3RD: 동일 크기 (280px — 한 화면에 들어오게 약간 작게)
// 1ST: 더 크게 (360px)
const SIZE_NORMAL = 'clamp(160px, 22vw, 280px)'
const SIZE_CENTER = 'clamp(200px, 28vw, 360px)'

const AWARDS = [
  { rank: 2, label: '2nd', isCenter: false },
  { rank: 1, label: '1st', isCenter: true  },
  { rank: 3, label: '3rd', isCenter: false },
]

function AwardSlot({ award }) {
  const { isCenter, label } = award
  const maxW = isCenter ? SIZE_CENTER : SIZE_NORMAL
  const winner = WINNERS[award.rank]

  return (
    <div
      className={`award-slot-${award.rank}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: isCenter ? '1.4' : '1',
        alignItems: 'center',
      }}
    >
      {/* 이미지 영역 */}
      <Link
        to={winner ? `/poster/${winner.id}` : '#'}
        style={{ display: 'block', width: '100%', maxWidth: maxW }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '420 / 594',
            background: '#111111',
            border: '1px solid #2A2A2A',
            cursor: 'pointer',
            transition: 'border-color 200ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginTop: isCenter ? '0' : '48px',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#E27DA6' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A' }}
        >
          {winner?.imageSrc ? (
            <img
              src={winner.imageSrc}
              alt={winner.imageAlt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          ) : (
            <span style={{
              fontFamily: 'Pretendard',
              fontSize: '11px',
              color: '#555555',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              이미지 없음
            </span>
          )}
        </div>
      </Link>

      {/* 하단 정보 */}
      <div style={{
        width: '100%',
        maxWidth: maxW,
        padding: '16px 0',
        borderTop: '1px solid #2A2A2A',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <span style={{
          fontFamily: 'SUIT',
          fontWeight: 700,
          fontSize: isCenter ? '24px' : '18px',
          color: '#F0F0F0',
          letterSpacing: '-0.01em',
        }}>
          {label}
        </span>
        {winner && (
          <>
            <span style={{
              fontFamily: 'Pretendard',
              fontSize: '15px',
              fontWeight: 500,
              color: '#F0F0F0',
            }}>
              {winner.characterName}
            </span>
            <span style={{
              fontFamily: 'Pretendard',
              fontSize: '13px',
              color: '#999999',
            }}>
              {winner.studentName}
            </span>
            <span style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              color: '#555555',
            }}>
              {winner.studentId} / {winner.major}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default function AwardPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <div className="page-enter">

      {/* 헤더 */}
      <section style={{ background: 'linear-gradient(to bottom, #000000, #1A1A1A)', paddingTop: '64px', paddingBottom: '32px' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'SUIT', fontWeight: 700, color: '#F0F0F0', fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Award
          </h1>
          <p style={{ fontFamily: 'Pretendard', fontSize: '13px', color: '#555555', marginTop: '8px' }}>
            투표 종료 후 수상자가 공개됩니다
          </p>
        </div>
      </section>

      {/* 심사 방식 배너 */}
      <div style={{ borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'Pretendard', fontSize: '11px', color: '#E27DA6', letterSpacing: '0.15em', textTransform: 'uppercase' }}>심사 방식</span>
          <span style={{ fontFamily: 'Pretendard', fontSize: '13px', color: '#999999' }}>
            투표 100%&nbsp;<span style={{ color: '#555555', fontSize: '12px' }}>* 주전공생, 복수전공생, 교수진 투표 결과 합산</span>
          </span>
        </div>
      </div>

      {/* 포디엄 */}
      <section style={{ paddingTop: 'clamp(24px, 4vw, 40px)', paddingBottom: 'clamp(32px, 5vw, 48px)' }}>
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontFamily: 'Pretendard', fontSize: '11px', color: '#555555', letterSpacing: '0.12em', textTransform: 'uppercase' }}>( Prizes )</span>
          </div>
          <div className="award-grid" style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', justifyContent: 'center' }}>
            {AWARDS.map(award => <AwardSlot key={award.rank} award={award} />)}
          </div>
        </div>
      </section>

      {/* 하단 */}
      <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '28px', paddingBottom: '48px' }}>
        <div className="container">
          <p style={{ fontFamily: 'Pretendard', fontSize: '13px', color: '#555555', lineHeight: 1.8 }}>
            수상 결과는 투표 종료 후 본 페이지에서 공개됩니다.<br />
            투표 기간 동안 작품 열람 후 투표에 참여해 주세요.
          </p>
          <Link to="/content" className="view-link" style={{ marginTop: '16px', display: 'inline-flex' }}>
            작품 보러 가기 →
          </Link>
        </div>
      </div>

    </div>
  )
}