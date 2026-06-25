import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react'
import { contact } from '../data/portfolio'
import SectionTitle from '../components/SectionTitle'

export default function Contact() {
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
