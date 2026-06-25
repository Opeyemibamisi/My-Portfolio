import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, body }) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-cyanx">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">{body}</p> : null}
    </motion.div>
  )
}
