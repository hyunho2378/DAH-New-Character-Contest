import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const [label, setLabel] = useState('')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // 터치 디바이스 감지 — 모바일에서 커서 숨김
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    setIsTouchDevice(isTouch)
    if (isTouch) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(animate)
    }

    const onEnterView = () => setLabel('VIEW')
    const onLeaveView = () => setLabel('')

    const targets = document.querySelectorAll('a, button, .poster-img')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnterView)
      el.addEventListener('mouseleave', onLeaveView)
    })

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    if (isTouchDevice) return null

  return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnterView)
        el.removeEventListener('mouseleave', onLeaveView)
      })
    }
  }, [])

  const hasLabel = label.length > 0

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: '#E27DA6',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: hasLabel ? '96px' : '48px',
          height: hasLabel ? '96px' : '48px',
          borderRadius: '50%',
          border: `2px solid ${hasLabel ? '#E27DA6' : '#999999'}`,
          background: hasLabel ? 'rgba(226,125,166,0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'width 200ms ease, height 200ms ease, border-color 200ms ease, background 200ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hasLabel && (
          <span style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#E27DA6',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {label}
          </span>
        )}
      </div>
    </>
  )
}