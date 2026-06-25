import { motion, useScroll, useTransform } from 'framer-motion'
import { BriefcaseBusiness, Download, Github, Linkedin, Mail, Send, Sparkles, Twitter } from 'lucide-react'
import profileImageUrl from '../My picture.jpg?url'
import resumeUrl from '../OPEYEMI BAMISI RESUME.docx?url'
import { contact, developerName } from '../data/portfolio'
import MagneticButton from '../components/MagneticButton'
import Typewriter from '../components/Typewriter'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -120])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-mesh-dark pt-28">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[8%] top-[26%] h-32 w-32 rounded-full border border-cyanx/30" />
        <div className="absolute right-[10%] top-[18%] h-44 w-44 rounded-full border border-vio/30" />
      </motion.div>
      <div className="section-shell grid min-h-[calc(100vh-7rem)] items-center gap-10 py-8 lg:grid-cols-[1fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanx/30 bg-cyanx/10 px-4 py-2 text-sm font-bold text-cyanx">
            <Sparkles size={16} /> Available for ambitious products
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            Hi, I'm <span className="gradient-text">{developerName}</span>
          </h1>
          <p className="mt-5 text-2xl font-bold text-[color:var(--text)]">Full Stack Developer</p>
          <p className="mt-3 min-h-8 text-lg font-semibold text-cyanx"><Typewriter /></p>
          <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--muted)]">
            I build cinematic interfaces, resilient APIs, and full-stack products that feel sharp, fast, and unmistakably modern.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#projects" icon={BriefcaseBusiness}>View Projects</MagneticButton>
            <MagneticButton href={resumeUrl} variant="ghost" icon={Download} download>Download Resume</MagneticButton>
            <MagneticButton href="#contact" variant="ghost" icon={Send}>Contact Me</MagneticButton>
          </div>
          <div className="mt-8 flex gap-3">
            {[
              [Github, 'GitHub', contact.github],
              [Linkedin, 'LinkedIn', contact.linkedin],
              [Twitter, 'Twitter', contact.twitter],
              [Mail, 'Email', contact.emailLink],
            ].map(([Icon, label, href]) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-cyanx/70 hover:text-cyanx">
                <Icon size={19} />
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="relative h-[430px] min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-violet md:h-[560px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,217,255,.28),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(156,109,255,.28),transparent_34%),linear-gradient(145deg,rgba(5,8,22,.12),rgba(5,8,22,.78))]" />
          <motion.div
            className="absolute left-8 top-10 h-32 w-32 rounded-full border border-cyanx/30"
            animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-8 h-44 w-44 rounded-full border border-vio/30"
            animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-x-8 bottom-0 top-10 overflow-hidden rounded-[26px] border border-white/10 bg-black/20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={profileImageUrl}
              alt="Opeyemi Bamisi"
              className="h-full w-full object-cover object-center mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyanx/18 via-transparent to-vio/18 mix-blend-screen" />
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  )
}
