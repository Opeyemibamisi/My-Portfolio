import { motion } from 'framer-motion'
import { services } from '../data/portfolio'
import SectionTitle from '../components/SectionTitle'

export default function Services() {
  return (
    <section className="section-shell py-24">
      <SectionTitle eyebrow="Services" title="Support across the full product surface." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {services.map(([title, desc, Icon], index) => (
          <motion.article key={title} className="glass rounded-3xl p-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} whileHover={{ y: -8 }}>
            <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-cyanx/12 text-cyanx">
              <Icon size={24} />
            </div>
            <h3 className="font-display text-xl font-bold">{title}</h3>
            <p className="mt-3 leading-7 text-[color:var(--muted)]">{desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
