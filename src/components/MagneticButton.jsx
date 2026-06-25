import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, href = '#contact', variant = 'primary', icon: Icon, download }) {
  const ref = useRef()
  const base = variant === 'primary'
    ? 'bg-cyanx text-ink shadow-glow'
    : 'glass text-[color:var(--text)] hover:border-cyanx/60'

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition ${base}`}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      {children}
    </motion.a>
  )
}
