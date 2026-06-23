import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUp,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Twitter,
  X,
  Zap,
} from 'lucide-react'
import profileImageUrl from './My picture.jpg?url'
import resumeUrl from './OPEYEMI BAMISI RESUME.docx?url'

gsap.registerPlugin(ScrollTrigger)

const developerName = 'Opeyemi Bamisi'

const contact = {
  email: 'opeyemibamisidopedev@gmail.com',
  emailLink: 'https://mail.google.com/mail/?view=cm&fs=1&to=opeyemibamisidopedev@gmail.com',
  whatsapp: 'https://wa.me/+2349165105168',
  github: 'https://github.com/Opeyemibamisi',
  linkedin: 'https://www.linkedin.com/in/opeyemi-bamisi-170059386',
  twitter: 'https://x.com/DopeOpeyemis',
}

const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Blog', 'Contact']

const typewriterWords = [
  'MERN Stack Developer',
  'React Native Developer',
  'Python Developer',
  'UI Enthusiast',
  'Problem Solver',
]

const stats = [
  ['3+', 'Years Experience'],
  ['20+', 'Projects Completed'],
  ['10+', 'Technologies'],
  ['Open', 'Source Contributor'],
]

const skillGroups = [
  ['Frontend', ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'React', 'Next.js']],
  ['Backend', ['Node.js', 'Express.js', 'MongoDB', 'REST APIs']],
  ['Mobile', ['React Native']],
  ['Programming', ['Python']],
  ['Tools', ['Git', 'GitHub', 'VS Code', 'Postman']],
]

const projects = [
  {
    title: 'Car Dealership Platform',
    desc: 'Inventory, secure payments, image uploads, admin workflows, and conversion-focused vehicle detail pages.',
    stack: ['MERN', 'Paystack', 'Cloudinary'],
    tone: 'from-cyan-400 via-blue-500 to-violet-500',
  },
  {
    title: 'AI Chatbot Application',
    desc: 'Streaming assistant UI with conversation memory, resilient Node APIs, and polished chat interactions.',
    stack: ['React', 'Node.js', 'OpenAI'],
    tone: 'from-violet-400 via-fuchsia-500 to-cyan-400',
  },
  {
    title: 'E-commerce Platform',
    desc: 'Product discovery, cart, checkout, authentication, dashboard metrics, and fast Mongo-backed APIs.',
    stack: ['MongoDB', 'Express', 'React', 'Node'],
    tone: 'from-emerald-300 via-cyan-500 to-blue-500',
  },
  {
    title: 'Mobile App',
    desc: 'Cross-platform mobile experience with reusable components, clean navigation, and API integration.',
    stack: ['React Native'],
    tone: 'from-blue-400 via-indigo-500 to-sky-300',
  },
]

const services = [
  ['Full Stack Development', 'Building scalable web applications.', Code2],
  ['Mobile App Development', 'Cross-platform apps using React Native.', Smartphone],
  ['Backend API Development', 'Secure and optimized APIs.', Zap],
  ['UI Development', 'Responsive and modern interfaces.', Sparkles],
]

const posts = [
  {
    title: 'Designing MERN Apps That Stay Fast',
    category: 'MERN Stack',
    date: 'Jun 12, 2026',
    tags: ['MongoDB', 'Performance', 'APIs'],
    featured: true,
    excerpt: 'A practical architecture guide for building expressive MERN products without losing speed.',
  },
  {
    title: 'React Patterns for Premium Interfaces',
    category: 'JavaScript',
    date: 'May 28, 2026',
    tags: ['React', 'Motion', 'UX'],
    excerpt: 'Motion, composition, and state patterns that make complex interfaces feel effortless.',
  },
  {
    title: 'Shipping React Native Apps With Confidence',
    category: 'React Native',
    date: 'Apr 19, 2026',
    tags: ['Mobile', 'Testing', 'Delivery'],
    excerpt: 'A field checklist for building stable cross-platform mobile apps.',
  },
  {
    title: 'Python Automation for Developers',
    category: 'Python',
    date: 'Mar 03, 2026',
    tags: ['Python', 'Automation'],
    excerpt: 'Small scripts that remove repetitive engineering work from your week.',
  },
  {
    title: 'Career Systems for Software Developers',
    category: 'Career',
    date: 'Feb 14, 2026',
    tags: ['Growth', 'Portfolio'],
    excerpt: 'How to document your value, pick better projects, and tell clearer technical stories.',
  },
  {
    title: 'Modern Web Development Tooling',
    category: 'Web Development',
    date: 'Jan 22, 2026',
    tags: ['Vite', 'DX', 'Frontend'],
    excerpt: 'A compact map of the tools that make modern web work faster and calmer.',
  },
]

const testimonials = [
  ['Amina Roberts', 'Startup Founder', 'Delivered a polished product quickly and explained every technical decision clearly.'],
  ['Daniel Lee', 'Product Lead', 'The dashboard feels premium, fast, and incredibly easy for our team to use.'],
  ['Sophia Grant', 'Creative Director', 'A rare blend of engineering discipline and design taste. The experience feels alive.'],
]

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function getRoute() {
  const path = window.location.pathname
  if (path === '/blog') return { page: 'blog' }
  if (path.startsWith('/blog/')) return { page: 'post', slug: path.replace('/blog/', '') }
  return { page: 'home' }
}

function AppLink({ href, navigate, children, className, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || !href.startsWith('/')) return
    event.preventDefault()
    navigate(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0)
  const [letterCount, setLetterCount] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = typewriterWords[wordIndex]
    const delay = deleting ? 38 : letterCount === current.length ? 1150 : 72
    const timer = setTimeout(() => {
      if (!deleting && letterCount < current.length) setLetterCount((value) => value + 1)
      else if (!deleting) setDeleting(true)
      else if (letterCount > 0) setLetterCount((value) => value - 1)
      else {
        setDeleting(false)
        setWordIndex((value) => (value + 1) % typewriterWords.length)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [deleting, letterCount, wordIndex])

  return <span>{typewriterWords[wordIndex].slice(0, letterCount)}<span className="animate-pulse">|</span></span>
}

function SectionTitle({ eyebrow, title, body }) {
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

function MagneticButton({ children, href = '#contact', variant = 'primary', icon: Icon, download }) {
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

function Header({ theme, setTheme, navigate }) {
  const [open, setOpen] = useState(false)
  const navHref = (item) => (item === 'Blog' ? '/blog' : `/#${item.toLowerCase()}`)

  return (
    <header className="fixed left-0 right-0 top-4 z-50">
      <nav className="section-shell glass flex min-h-16 items-center justify-between rounded-full px-4 md:px-6">
        <AppLink href="/" navigate={navigate} className="font-display text-lg font-bold">
          <span className="gradient-text">Dope_</span>dev
        </AppLink>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <AppLink key={item} href={navHref(item)} navigate={navigate} className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition hover:text-[color:var(--text)]">
              {item}
            </AppLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyanx/60"
            aria-label="Toggle color mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="section-shell glass mt-3 rounded-2xl p-3 md:hidden"
          >
            {navItems.map((item) => (
              <AppLink key={item} href={navHref(item)} navigate={navigate} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-semibold text-[color:var(--muted)]">
                {item}
              </AppLink>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
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

function About() {
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

function Skills() {
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

function Experience() {
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

function ProjectPreview({ tone }) {
  return (
    <div className={`relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br ${tone}`}>
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,.28)_0_1px,transparent_1px_16px)] opacity-35" />
      <div className="absolute left-5 top-5 h-20 w-32 rounded-xl border border-white/35 bg-white/18 backdrop-blur-md" />
      <div className="absolute bottom-5 right-5 h-24 w-40 rounded-xl border border-white/35 bg-black/20 backdrop-blur-md" />
      <div className="absolute left-8 top-32 h-3 w-36 rounded-full bg-white/65" />
      <div className="absolute left-8 top-40 h-3 w-24 rounded-full bg-white/35" />
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" className="section-shell py-24">
      <SectionTitle eyebrow="Featured Projects" title="Interactive builds with production-minded details." />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article key={project.title} className="project-card glass rounded-3xl p-4" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
            <ProjectPreview tone={project.tone} />
            <div className="p-3">
              <h3 className="mt-4 font-display text-2xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">{project.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-cyanx/25 bg-cyanx/10 px-3 py-1 text-xs font-bold text-cyanx">{tech}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold hover:border-cyanx/60"><Github size={16} /> GitHub</a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-4 py-2 text-sm font-bold"><ExternalLink size={16} /> Live Demo</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Services() {
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

function Blog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [activePost, setActivePost] = useState(null)
  const categories = ['All', 'JavaScript', 'MERN Stack', 'React Native', 'Python', 'Web Development', 'Career']
  const pageSize = 4

  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category
    const haystack = `${post.title} ${post.category} ${post.tags.join(' ')}`.toLowerCase()
    return matchesCategory && haystack.includes(query.toLowerCase())
  }), [category, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)
  const featured = posts.find((post) => post.featured)

  useEffect(() => {
    setPage(1)
  }, [query, category])

  return (
    <section id="blog" className="section-shell py-24">
      <SectionTitle eyebrow="Blog" title="Notes on code, systems, and career growth." />
      <AnimatePresence mode="wait">
        {activePost ? (
          <BlogDetail post={activePost} onBack={() => setActivePost(null)} />
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <article className="glass mb-6 grid gap-6 rounded-3xl p-5 md:grid-cols-[.9fr_1.1fr]">
              <ProjectPreview tone="from-cyan-400 via-violet-500 to-blue-600" />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyanx">Featured Article</p>
                <h3 className="mt-3 font-display text-3xl font-bold">{featured.title}</h3>
                <p className="mt-3 leading-7 text-[color:var(--muted)]">{featured.excerpt}</p>
                <button type="button" onClick={() => setActivePost(featured)} className="mt-5 rounded-full bg-cyanx px-5 py-3 text-sm font-bold text-ink">Read More</button>
              </div>
            </article>
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <label className="glass flex h-12 items-center gap-3 rounded-full px-4 md:w-80">
                <Search size={18} className="text-cyanx" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]" />
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map((item) => (
                  <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? 'bg-cyanx text-ink' : 'glass text-[color:var(--muted)]'}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {visible.map((post) => (
                <article key={post.title} className="glass rounded-3xl p-6">
                  <p className="text-sm font-bold text-cyanx">{post.category} • {post.date}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold">{post.title}</h3>
                  <p className="mt-3 leading-7 text-[color:var(--muted)]">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-[color:var(--muted)]">#{tag}</span>)}
                  </div>
                  <button type="button" onClick={() => setActivePost(post)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyanx">Read More <ExternalLink size={15} /></button>
                </article>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} className="grid h-10 w-10 place-items-center rounded-full border border-white/10" aria-label="Previous page"><ChevronLeft size={18} /></button>
              <span className="text-sm font-bold text-[color:var(--muted)]">Page {page} of {pageCount}</span>
              <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="grid h-10 w-10 place-items-center rounded-full border border-white/10" aria-label="Next page"><ChevronRight size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function BlogDetail({ post, onBack }) {
  const related = posts.filter((item) => item.title !== post.title).slice(0, 3)

  return (
    <motion.article key="detail" className="glass rounded-3xl p-5 md:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <button type="button" onClick={onBack} className="mb-6 rounded-full border border-white/10 px-4 py-2 text-sm font-bold">Back to posts</button>
      <ProjectPreview tone="from-blue-400 via-violet-500 to-cyan-300" />
      <div className="mx-auto mt-8 max-w-3xl">
        <p className="text-sm font-bold text-cyanx">By {developerName} • {post.date}</p>
        <h3 className="mt-3 font-display text-4xl font-bold">{post.title}</h3>
        <div className="my-7 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="mb-3 font-bold">Table of contents</p>
          {['Architecture first', 'Interfaces that communicate', 'Measure before optimizing'].map((item) => (
            <a key={item} href="#blog" className="block py-1 text-sm text-[color:var(--muted)]">{item}</a>
          ))}
        </div>
        <p className="leading-8 text-[color:var(--muted)]">
          Great software feels simple because the hard decisions are made below the surface. I start with the data model, build clear API contracts, and use motion only where it improves orientation.
        </p>
        <pre className="syntax my-7 overflow-x-auto rounded-2xl border border-cyanx/20 bg-[#06101f] p-5 text-sm text-slate-100">
          <code>{`const createProject = async (payload) => {
  const response = await api.post('/projects', payload)
  return response.data
}`}</code>
        </pre>
        <p className="leading-8 text-[color:var(--muted)]">
          The result is a product that can grow without turning the codebase into a maze. Frontend, backend, and deployment decisions all serve the same goal: fast feedback and dependable user experience.
        </p>
        <h4 className="mt-8 font-display text-2xl font-bold">Related posts</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {related.map((item) => (
            <button key={item.title} type="button" onClick={() => window.scrollTo({ top: document.getElementById('blog').offsetTop - 80, behavior: 'smooth' })} className="rounded-2xl border border-white/10 p-4 text-left text-sm font-bold text-[color:var(--muted)]">
              {item.title}
            </button>
          ))}
        </div>
        <div className="mt-7 rounded-2xl border border-white/10 p-5">
          <h4 className="font-display text-xl font-bold">Comments</h4>
          <textarea className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 outline-none focus:border-cyanx/60" placeholder="Write a thoughtful comment" />
          <button type="button" className="mt-3 rounded-full bg-cyanx px-5 py-3 text-sm font-bold text-ink">Post Comment</button>
        </div>
      </div>
    </motion.article>
  )
}

function BlogHighlight({ navigate }) {
  const featured = posts.find((post) => post.featured)
  const secondary = posts.filter((post) => !post.featured).slice(0, 2)

  return (
    <section id="blog" className="section-shell py-24">
      <SectionTitle eyebrow="Blog" title="Latest thinking from the studio." body="A quick highlight lives here, while the full blog has its own dedicated reading flow." />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <article className="glass grid gap-6 rounded-3xl p-5 md:grid-cols-[.9fr_1.1fr]">
          <ProjectPreview tone="from-cyan-400 via-violet-500 to-blue-600" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyanx">Featured Article</p>
            <h3 className="mt-3 font-display text-3xl font-bold">{featured.title}</h3>
            <p className="mt-3 leading-7 text-[color:var(--muted)]">{featured.excerpt}</p>
            <button type="button" onClick={() => navigate(`/blog/${slugify(featured.title)}`)} className="mt-5 rounded-full bg-cyanx px-5 py-3 text-sm font-bold text-ink">Read Full Article</button>
          </div>
        </article>
        <div className="space-y-4">
          {secondary.map((post) => (
            <button key={post.title} type="button" onClick={() => navigate(`/blog/${slugify(post.title)}`)} className="glass block w-full rounded-3xl p-5 text-left transition hover:-translate-y-1 hover:border-cyanx/50">
              <p className="text-sm font-bold text-cyanx">{post.category} - {post.date}</p>
              <h3 className="mt-2 font-display text-xl font-bold">{post.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{post.excerpt}</p>
            </button>
          ))}
          <button type="button" onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-cyanx hover:border-cyanx/60">
            View All Posts <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

function BlogListPage({ navigate }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const categories = ['All', 'JavaScript', 'MERN Stack', 'React Native', 'Python', 'Web Development', 'Career']
  const pageSize = 4

  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category
    const haystack = `${post.title} ${post.category} ${post.tags.join(' ')}`.toLowerCase()
    return matchesCategory && haystack.includes(query.toLowerCase())
  }), [category, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [query, category])

  return (
    <main className="min-h-screen bg-mesh-dark pt-28">
      <section className="section-shell py-16">
        <SectionTitle eyebrow="Blog" title="Field notes for modern developers." body="Search by topic, explore categories, and open each post on its own reading page." />
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="glass flex h-12 items-center gap-3 rounded-full px-4 md:w-80">
            <Search size={18} className="text-cyanx" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]" />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? 'bg-cyanx text-ink' : 'glass text-[color:var(--muted)]'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((post, index) => (
            <motion.article key={post.title} className="glass rounded-3xl p-5" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
              <ProjectPreview tone={index % 2 ? 'from-violet-400 via-fuchsia-500 to-cyan-400' : 'from-cyan-400 via-blue-500 to-violet-500'} />
              <p className="mt-5 text-sm font-bold text-cyanx">{post.category} - {post.date}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{post.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-[color:var(--muted)]">#{tag}</span>)}
              </div>
              <button type="button" onClick={() => navigate(`/blog/${slugify(post.title)}`)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyanx">Read More <ExternalLink size={15} /></button>
            </motion.article>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} className="grid h-10 w-10 place-items-center rounded-full border border-white/10" aria-label="Previous page"><ChevronLeft size={18} /></button>
          <span className="text-sm font-bold text-[color:var(--muted)]">Page {page} of {pageCount}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="grid h-10 w-10 place-items-center rounded-full border border-white/10" aria-label="Next page"><ChevronRight size={18} /></button>
        </div>
      </section>
    </main>
  )
}

function BlogPostPage({ slug, navigate }) {
  const post = posts.find((item) => slugify(item.title) === slug) || posts[0]
  const related = posts.filter((item) => item.title !== post.title).slice(0, 3)

  return (
    <main className="min-h-screen bg-mesh-dark pt-28">
      <section className="section-shell py-16">
        <motion.article className="glass rounded-3xl p-5 md:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button type="button" onClick={() => navigate('/blog')} className="mb-6 rounded-full border border-white/10 px-4 py-2 text-sm font-bold">Back to Blog</button>
          <ProjectPreview tone="from-blue-400 via-violet-500 to-cyan-300" />
          <div className="mx-auto mt-8 max-w-3xl">
            <p className="text-sm font-bold text-cyanx">By {developerName} - {post.date}</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{post.title}</h1>
            <div className="my-7 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-3 font-bold">Table of contents</p>
              {['Architecture first', 'Interfaces that communicate', 'Measure before optimizing'].map((item) => (
                <a key={item} href="#article-body" className="block py-1 text-sm text-[color:var(--muted)]">{item}</a>
              ))}
            </div>
            <div id="article-body" className="space-y-6 leading-8 text-[color:var(--muted)]">
              <p>{post.excerpt} The best products are shaped by clear constraints, strong architecture, and interfaces that help people understand what is happening without effort.</p>
              <p>I start by mapping the user flow, data model, and API responsibilities. Once those pieces are stable, the UI layer can move quickly without sacrificing accessibility, performance, or maintainability.</p>
            </div>
            <pre className="syntax my-7 overflow-x-auto rounded-2xl border border-cyanx/20 bg-[#06101f] p-5 text-sm text-slate-100">
              <code>{`const createProject = async (payload) => {
  const response = await api.post('/projects', payload)
  return response.data
}`}</code>
            </pre>
            <p className="leading-8 text-[color:var(--muted)]">The final polish comes from measurement: testing real interactions, trimming slow paths, and making every transition support the user instead of distracting them.</p>
            <h2 className="mt-8 font-display text-2xl font-bold">Related posts</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {related.map((item) => (
                <button key={item.title} type="button" onClick={() => navigate(`/blog/${slugify(item.title)}`)} className="rounded-2xl border border-white/10 p-4 text-left text-sm font-bold text-[color:var(--muted)] transition hover:border-cyanx/60">
                  {item.title}
                </button>
              ))}
            </div>
            <div className="mt-7 rounded-2xl border border-white/10 p-5">
              <h2 className="font-display text-xl font-bold">Comments</h2>
              <textarea className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 outline-none focus:border-cyanx/60" placeholder="Write a thoughtful comment" />
              <button type="button" className="mt-3 rounded-full bg-cyanx px-5 py-3 text-sm font-bold text-ink">Post Comment</button>
            </div>
          </div>
        </motion.article>
      </section>
    </main>
  )
}

function Testimonials() {
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

function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="section-shell py-24">
      <SectionTitle eyebrow="Contact" title="Tell me what you want to build." />
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="glass rounded-3xl p-7">
          <h3 className="font-display text-2xl font-bold">Let's connect</h3>
          <div className="mt-6 space-y-4 text-[color:var(--muted)]">
            <a href={contact.emailLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-cyanx"><Mail className="text-cyanx" size={19} /> Mail</a>
            <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-cyanx"><Github className="text-cyanx" size={19} /> GitHub</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-cyanx"><Linkedin className="text-cyanx" size={19} /> LinkedIn</a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-cyanx"><MessageCircle className="text-cyanx" size={19} /> WhatsApp</a>
          </div>
        </div>
        <form className="glass rounded-3xl p-5 md:p-7" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
          <div className="grid gap-4 md:grid-cols-2">
            {['Name', 'Email'].map((field) => (
              <label key={field} className="block text-sm font-bold">
                {field}
                <input required type={field === 'Email' ? 'email' : 'text'} className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 outline-none focus:border-cyanx/60" />
              </label>
            ))}
          </div>
          <label className="mt-4 block text-sm font-bold">
            Subject
            <input required className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 outline-none focus:border-cyanx/60" />
          </label>
          <label className="mt-4 block text-sm font-bold">
            Message
            <textarea required className="mt-2 min-h-36 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 outline-none focus:border-cyanx/60" />
          </label>
          <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyanx px-6 py-3 text-sm font-bold text-ink"><Send size={17} /> Send Message</button>
          <AnimatePresence>
            {sent ? (
              <motion.p className="mt-4 flex items-center gap-2 font-bold text-cyanx" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <CheckCircle2 size={18} /> Message sent. I will reply soon.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </form>
      </div>
    </section>
  )
}

function Footer({ navigate }) {
  const navHref = (item) => (item === 'Blog' ? '/blog' : `/#${item.toLowerCase()}`)

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-bold gradient-text">Dope_dev</p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">Copyright {new Date().getFullYear()}. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <AppLink key={item} href={navHref(item)} navigate={navigate} className="text-sm font-bold text-[color:var(--muted)] hover:text-cyanx">
              {item}
            </AppLink>
          ))}
        </div>
        <div className="flex gap-3">
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[color:var(--muted)] hover:text-cyanx"><Github size={18} /></a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[color:var(--muted)] hover:text-cyanx"><Linkedin size={18} /></a>
          <a href={contact.emailLink} target="_blank" rel="noreferrer" aria-label="Email" className="text-[color:var(--muted)] hover:text-cyanx"><Mail size={18} /></a>
        </div>
        <AppLink href="/#home" navigate={navigate} aria-label="Back to top" className="grid h-11 w-11 place-items-center rounded-full bg-cyanx text-ink"><ArrowUp size={18} /></AppLink>
      </div>
    </footer>
  )
}

function CursorGlow() {
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

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [route, setRoute] = useState(getRoute)

  const navigate = (href) => {
    window.history.pushState({}, '', href)
    setRoute(getRoute())
    window.setTimeout(() => {
      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 0)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    const handlePop = () => setRoute(getRoute())
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.glass').forEach((card) => {
        gsap.fromTo(card, { y: 26, opacity: 0.72 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="noise min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <CursorGlow />
      <Header theme={theme} setTheme={setTheme} navigate={navigate} />
      {route.page === 'blog' ? (
        <BlogListPage navigate={navigate} />
      ) : route.page === 'post' ? (
        <BlogPostPage slug={route.slug} navigate={navigate} />
      ) : (
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Services />
          <BlogHighlight navigate={navigate} />
          <Testimonials />
          <Contact />
        </main>
      )}
      <Footer navigate={navigate} />
    </div>
  )
}
