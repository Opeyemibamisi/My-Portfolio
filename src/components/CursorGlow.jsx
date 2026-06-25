import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef()

  useEffect(() => {
    const handleMove = (event) => {
      if (!ref.current) return
      ref.current.animate({ left: `${event.clientX}px`, top: `${event.clientY}px` }, { duration: 450, fill: 'forwards' })
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return <div ref={ref} className="pointer-events-none fixed left-1/2 top-1/2 z-40 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyanx/10 blur-3xl md:block" />
}
