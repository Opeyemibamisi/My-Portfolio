import { motion } from 'framer-motion'
import { stats } from '../data/portfolio'
import SectionTitle from '../components/SectionTitle'

export default function About() {
  return (
    <section id="about" className="section-shell py-24">
      <SectionTitle eyebrow="About Me" title="Engineering useful products with a designer's eye." />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <motion.div className="glass rounded-3xl p-7 md:p-10" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="text-xl leading-9 text-[color:var(--muted)]">
            I am a passionate Full Stack Developer specializing in building scalable web and mobile applications. I enjoy transforming ideas into modern digital experiences and continuously learning new technologies.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(([number, label], index) => (
            <motion.div key={label} className="glass rounded-2xl p-5" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <p className="font-display text-3xl font-bold gradient-text">{number}</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--muted)]">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
