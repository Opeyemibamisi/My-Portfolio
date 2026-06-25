import { motion } from 'framer-motion'
import { skillGroups } from '../data/portfolio'
import SectionTitle from '../components/SectionTitle'

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <div className="section-shell">
        <SectionTitle eyebrow="Skills" title="A flexible stack for polished digital systems." body="Cards respond to hover, while the orbit layer keeps the section feeling spatial and alive." />
        <div className="relative grid gap-5 lg:grid-cols-5">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyanx/15 lg:block orbital" />
          {skillGroups.map(([group, skills], groupIndex) => (
            <motion.div key={group} className="glass rounded-3xl p-5" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: groupIndex * 0.07 }}>
              <h3 className="mb-5 font-display text-xl font-bold">{group}</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => {
                  const progress = 74 + ((index + groupIndex) % 5) * 5
                  return (
                    <motion.div key={skill} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3" whileHover={{ y: -5, rotateX: 4, rotateY: -5 }}>
                      <div className="mb-2 flex items-center justify-between text-sm font-bold">
                        <span>{skill}</span>
                        <span className="text-cyanx">{progress}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-cyanx to-vio" initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
