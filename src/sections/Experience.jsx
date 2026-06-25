import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'

export default function Experience() {
  const duties = [
    'Developed MERN stack applications.',
    'Designed responsive interfaces.',
    'Built REST APIs.',
    'Implemented authentication and payment integrations.',
    'Optimized performance and user experience.',
  ]

  return (
    <section id="experience" className="section-shell py-24">
      <SectionTitle eyebrow="Experience" title="A timeline built around shipping value." />
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-cyanx via-vio to-transparent md:left-1/2" />
        <motion.article className="experience-item glass relative ml-10 rounded-3xl p-7 md:ml-0 md:w-[48%]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="absolute -left-[34px] top-7 grid h-4 w-4 place-items-center rounded-full bg-cyanx shadow-glow md:-right-[calc(4%+8px)] md:left-auto" />
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyanx">2023 - Present</p>
          <h3 className="mt-3 font-display text-2xl font-bold">Full Stack Developer</h3>
          <ul className="mt-5 space-y-3 text-[color:var(--muted)]">
            {duties.map((duty) => (
              <li key={duty} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-cyanx" size={18} />
                <span>{duty}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  )
}
