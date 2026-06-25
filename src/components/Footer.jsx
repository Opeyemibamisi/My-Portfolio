import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { contact, navItems } from '../data/portfolio'
import AppLink from './AppLink'

export default function Footer({ navigate }) {
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
