import { useState, useCallback, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function useScramble(originalText, duration = 600) {
  const [displayText, setDisplayText] = useState(originalText)
  const rafRef = useRef(null)

  const scramble = useCallback(() => {
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)

      const result = originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i / originalText.length < progress) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayText(result)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayText(originalText)
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }, [originalText, duration])

  return { displayText, scramble }
}
