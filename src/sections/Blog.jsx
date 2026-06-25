import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Search } from 'lucide-react'
import { posts } from '../data/portfolio'
import ProjectPreview from '../components/ProjectPreview'
import SectionTitle from '../components/SectionTitle'
import BlogDetail from './BlogDetail'

export default function Blog() {
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
