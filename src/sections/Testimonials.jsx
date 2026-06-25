import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonials } from '../data/portfolio'
import SectionTitle from '../components/SectionTitle'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const item = testimonials[index]

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % testimonials.length), 4200)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="section-shell py-24">
      <SectionTitle eyebrow="Testimonials" title="Client words with real signal." />
      <div className="mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.article key={item[0]} className="glass rounded-3xl p-8 text-center" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cyanx to-vio font-display text-xl font-bold text-white">
              {item[0].split(' ').map((part) => part[0]).join('')}
            </div>
            <div className="mb-4 flex justify-center gap-1 text-cyanx">{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={18} fill="currentColor" />)}</div>
            <p className="text-xl leading-9 text-[color:var(--muted)]">"{item[2]}"</p>
            <p className="mt-5 font-display text-xl font-bold">{item[0]}</p>
            <p className="text-sm font-semibold text-cyanx">{item[1]}</p>
          </motion.article>
        </AnimatePresence>
        <div className="mt-5 flex justify-center gap-3">
          <button type="button" onClick={() => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => setIndex((value) => (value + 1) % testimonials.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10"><ChevronRight size={18} /></button>
        </div>
      </div>
    </section>
  )
}
