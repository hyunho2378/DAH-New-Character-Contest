import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { useScramble } from '../hooks/useScramble.js'

const FONT_SIZE = 'calc(90vw / 6.2)'

const HERO_LINES = [
  { text: 'DIGITAL'    },
  { text: 'ARTS &'      },
  { text: 'HUMANITIES' },
]

const SUB_LINES = [
  { text: 'NEW'       },
  { text: 'CHARACTER' },
  { text: 'CONTEST'   },
]

const INFO_SECTIONS = [
  {
    letter: 'EXHIBITION',
    category: '',
    title: '전시 소개',
    content: `2026 디지털인문예술전공 신규 캐릭터 공모전은 한림대학교 디지털인문예술전공 재학생들이\n직접 기획하고 제작한 캐릭터 작품을 선보이는 온라인 전시입니다.\n\n자유롭고 창의적인 학생들의 기획 속에서 탄생한 총 9점의 캐릭터 작품이 전시됩니다.`,
    link: null,
    layout: 'horizontal',
  },
  {
    letter: 'DAH',
    category: '',
    title: '디지털인문예술전공',
    layout: 'department',
  },
  {
    letter: 'AWARD',
    category: '',
    title: '시상 내역',
    layout: 'vertical',
    award: {
      prizes: [
        {
          rank: '1등',
          prize: '30만원',
          count: '1명',
          note: '*전공 공식 캐릭터화 및 웰컴키트, 패키지, 포스터 등 다양한 분야 활용 예정',
        },
        { rank: '2등', prize: '10만원', count: '1명', note: null },
        { rank: '3등', prize: '10만원', count: '1명', note: null },
      ],
      judging: '투표 100%',
      judgingNote: '* 주전공생, 복수전공생, 교수진 투표 결과 합산',
    },
    link: { text: '어워드 페이지 →', to: '/award' },
  },
  {
    letter: 'CREDITS',
    category: '',
    title: '크레딧',
    layout: 'credits',
  },
]

function getBrightness(element) {
  const rect = element.getBoundingClientRect()
  const vh = window.innerHeight

  // viewport 상단 기준: 위에 있을수록(= rect.top 작을수록) 밝음
  const relativeTop = rect.top / vh

  // 0~0.05 구간은 최대 밝음, 그 이후 선형으로 어두워짐
  const t = Math.max(0, Math.min(1, Math.max(0, relativeTop - 0.05) * 1.6))

  // #F0F0F0(240) → #1A1A1A(26) 보간
  const v = Math.round(240 - (240 - 48) * t)  // 48 = 배경(26)보다 살짝 밝음 → 보일락말락
  return `rgb(${v},${v},${v})`
}

function RevealSection({ children }) {
  const { ref, revealed } = useReveal()
  return (
    <div ref={ref} style={{
      opacity:   revealed ? 1 : 0,
      transform: revealed ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 600ms ease, transform 600ms ease',
    }}>
      {children}
    </div>
  )
}

function SectionLetter({ letter }) {
  const { displayText, scramble } = useScramble(letter)
  const fontSize = letter.length === 1
    ? 'clamp(32px, 5vw, 80px)'
    : letter.length <= 3
    ? 'clamp(24px, 4vw, 60px)'
    : 'clamp(18px, 3vw, 40px)'
  return (
    <span
      onMouseEnter={scramble}
      style={{
        fontFamily: 'SUIT, sans-serif',
        fontWeight: 700,
        fontSize,
        color: '#F0F0F0',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}
    >
      {displayText}
    </span>
  )
}

function renderSectionContent(section) {

  if (section.layout === 'horizontal') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <p style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '15px', fontWeight: 400,
          color: '#999999', lineHeight: 1.9,
          whiteSpace: 'pre-line',
        }}>
          {section.content}
        </p>
        {section.link && (
          <Link to={section.link.to} className="view-link" style={{ display: 'inline-flex' }}>
            {section.link.text}
          </Link>
        )}
      </div>
    )
  }

  if (section.layout === 'department') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

        <p style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '15px', fontWeight: 400,
          color: '#999999', lineHeight: 1.9,
        }}>
          한림대학교 디지털인문예술전공은 AI와 디지털 트랜스포메이션과 같이 글로벌 혁신을 주도하는 디지털·정보통신기술, 인간을 위한 가치를 구현하는 디자인, 그리고 사람과 사회를 이해하는 인문사회학적 소양이 융합하여 미래의 주역이 될 인재를 양성하는 새로운 융합 프로그램입니다.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '11px', fontWeight: 400,
            color: '#555555', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            Mission
          </span>
          <p style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '15px', fontWeight: 400,
            color: '#F0F0F0', lineHeight: 1.9, fontStyle: 'italic',
          }}>
            We combine human insight and digital creativity to build a better future.
          </p>
          <p style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px', fontWeight: 400,
            color: '#999999', lineHeight: 1.9,
          }}>
            인간에 대한 깊은 이해와 창의적인 디지털 역량을 결합하여, 세상에 없던 새로운 가치를 창조한다.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '11px', fontWeight: 400,
            color: '#555555', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            Vision
          </span>
          {[
            { title: '미래를 디자인하는 창의적 리더 양성', desc: '인문학적 통찰력과 예술적 상상력을 바탕으로 디지털 시대의 새로운 미래를 이끌어갈 인재를 키웁니다.' },
            { title: '가치 기반의 융합 지식 창출', desc: '기술과 인문학, 예술이 만나는 접점에서 사회적 가치를 창출하는 혁신적인 지식과 프로젝트를 만들어갑니다.' },
            { title: '지속가능한 디지털 생태계 구축', desc: '사람과 기술이 조화롭게 공존하는 지속가능한 디지털 환경을 조성하고, 모두에게 이로운 기술의 확산을 주도합니다.' },
          ].map(v => (
            <div key={v.title}>
              <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '14px', fontWeight: 500, color: '#F0F0F0', marginBottom: '4px' }}>
                {v.title}
              </p>
              <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '14px', fontWeight: 400, color: '#999999', lineHeight: 1.8 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    )
  }

  if (section.layout === 'vertical' && section.award) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {section.award.prizes.map(p => (
          <div key={p.rank} style={{
            display: 'flex', alignItems: 'baseline', gap: '12px',
            flexWrap: 'wrap',
            borderBottom: '1px solid #2A2A2A', paddingBottom: '16px',
          }}>
            <span style={{ fontFamily: 'SUIT, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F0F0F0', minWidth: '36px' }}>
              {p.rank}
            </span>
            <span style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 500, fontSize: '18px', color: '#E27DA6' }}>
              {p.prize}
            </span>
            <span style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 400, fontSize: '13px', color: '#555555' }}>
              {p.count}
            </span>
            {p.note && (
              <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '12px', fontWeight: 400, color: '#555555' }}>
                {p.note}
              </span>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
          <span style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '11px', fontWeight: 400,
            color: '#E27DA6', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            심사 방식
          </span>
          <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '15px', fontWeight: 500, color: '#F0F0F0' }}>
            {section.award.judging}
          </p>
          <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '13px', fontWeight: 400, color: '#999999', lineHeight: 1.7 }}>
            {section.award.judgingNote}
          </p>
        </div>

        {section.link && (
          <Link to={section.link.to} className="view-link" style={{ display: 'inline-flex', marginTop: '8px' }}>
            {section.link.text}
          </Link>
        )}

      </div>
    )
  }

  if (section.layout === 'credits') {
    return (
      <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '15px', fontWeight: 400, color: '#999999', lineHeight: 1.9 }}>
        주최&nbsp;&nbsp;
        <span style={{ color: '#F0F0F0' }}>2026 제1대 디지털인문예술전공 운영위원회 </span>
        <span style={{ color: '#E27DA6' }}>LUCID</span>
      </p>
    )
  }

  return null
}

export default function AboutPage() {
  const heroRefs = useRef(HERO_LINES.map(() => ({ current: null })))
  const subRefs  = useRef(SUB_LINES.map(() => ({ current: null })))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    const allRefs = [
      ...heroRefs.current,
      ...subRefs.current,
    ]

    const handleScroll = () => {
      allRefs.forEach(ref => {
        if (ref.current) {
          ref.current.style.color = getBrightness(ref.current)
        }
      })
    }

    // 레이아웃 완료 후 실행 (requestAnimationFrame 2번 대기)
    let raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleScroll()
      })
    })

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf1)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const TextLine = ({ text, refObj, align = 'left' }) => (
    <div style={{ overflow: 'hidden', lineHeight: 1 }}>
      <span
        ref={el => { refObj.current = el }}
        style={{
          fontFamily: 'SUIT, sans-serif',
          fontWeight: 700,
          fontSize: FONT_SIZE,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: '#1A1A1A',
          display: 'block',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          textAlign: align,
          transition: 'color 60ms linear',
        }}
      >
        {text}
      </span>
    </div>
  )

  return (
    <div className="page-enter" style={{ background: '#1A1A1A' }}>

      {/* HERO_LINES — overflow hidden으로 횡스크롤 방지 */}
      <section style={{ background: '#1A1A1A', paddingTop: 'clamp(56px, 8vw, 100px)', paddingBottom: '0px', overflowX: 'hidden' }}>
        <div className="text-full">
          {HERO_LINES.map((line, i) => (
            <TextLine
              key={line.text}
              text={line.text}
              refObj={heroRefs.current[i]}
              align="left"
            />
          ))}
        </div>
      </section>

      <div style={{
        height: 'calc(90vw / 6.2 * 0.95)',
        background: '#1A1A1A',
      }} />

      <section style={{ background: '#1A1A1A', paddingTop: '0px', paddingBottom: 'clamp(40px, 6vw, 80px)', overflowX: 'hidden' }}>
        <div className="text-full">
          {SUB_LINES.map((line, i) => (
            <TextLine
              key={line.text}
              text={line.text}
              refObj={subRefs.current[i]}
              align="right"
            />
          ))}
        </div>
      </section>

      <div style={{ background: '#1A1A1A' }}>
        {INFO_SECTIONS.map((section) => (
          <RevealSection key={section.letter}>
            <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', margin: 0 }} />

            <div
              className="container about-section-grid"
              style={{ paddingTop: 'clamp(40px, 6vw, 80px)', paddingBottom: 'clamp(40px, 6vw, 80px)' }}
            >
              {/* ── 좌: 큰 영어 텍스트 ── */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SectionLetter letter={section.letter} />
              </div>

              {/* ── 우: 섹션별 내용 ── */}
              <div>
                {renderSectionContent(section)}
              </div>
            </div>
          </RevealSection>
        ))}
        <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', margin: 0 }} />
      </div>

    </div>
  )
}