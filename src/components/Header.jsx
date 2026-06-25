import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navItems } from '../data/portfolio'
import AppLink from './AppLink'

export default function Header({ theme, setTheme, navigate }) {
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
