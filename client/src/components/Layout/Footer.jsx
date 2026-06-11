import { Link } from 'react-router-dom'
import logoSrc from '../../assets/logo.svg'

export default function Footer() {
  return (
    <footer style={{
      background: '#0A0A0A',
      borderTop: '1px solid #2A2A2A',
    }}>
      <div
        className="container footer-inner"
        style={{
          paddingTop: '48px',
          paddingBottom: '48px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'end',
          gap: '40px',
        }}
      >
        {/* 좌측 — 로고 + 기관명 + 링크 + 저작권 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/" style={{ display: 'inline-block', opacity: 0.25 }}>
            <img
              src={logoSrc}
              alt="DIINYE logo"
              style={{ height: '24px', width: 'auto', display: 'block' }}
            />
          </Link>

          <p style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            color: '#555555',
            letterSpacing: '0.03em',
            lineHeight: 1.6,
          }}>
            한림대학교 디지털인문예술전공
          </p>

          <a
            href="https://sites.google.com/glab.hallym.ac.kr/dah-hallym/about?authuser=0"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: '#F0F0F0',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'color 150ms ease',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#E27DA6' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#F0F0F0' }}
          >
            Hallym University DAH
          </a>

          <p style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            color: '#555555',
            letterSpacing: '0.02em',
          }}>
            © 2026 디지털인문예술전공. All rights reserved.
          </p>
        </div>

        {/* 우측 — 제작/수정 문의 (링크 없음) */}
        <div
          className="footer-right"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '6px',
          }}
        >
          <span style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            color: '#555555',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            웹사이트 제작/수정 문의
          </span>
          <span style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            color: '#555555',
          }}>
            디지털인문예술전공 주현호
          </span>
          <span style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            color: '#555555',
            letterSpacing: '0.01em',
          }}>
            h20222583@glab.hallym.ac.kr
          </span>
        </div>
      </div>
    </footer>
  )
}