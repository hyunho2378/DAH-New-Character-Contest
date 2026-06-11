import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const navigate = useNavigate()

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <button
      onClick={handleBack}
      onMouseEnter={e => { e.currentTarget.style.color = '#F0F0F0' }}
      onMouseLeave={e => { e.currentTarget.style.color = '#999999' }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: "'Pretendard', sans-serif",
        fontWeight: 400,
        fontSize: 12,
        color: '#999999',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition: 'color 150ms ease',
      }}
    >
      <ArrowLeft size={14} strokeWidth={1.5} />
      BACK TO LIST
    </button>
  )
}
