import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Search } from 'lucide-react'
import { posts } from '../data/portfolio'
import { slugify } from '../utils/routing'
import ProjectPreview from '../components/ProjectPreview'
import SectionTitle from '../components/SectionTitle'

export default function BlogListPage({ navigate }) {
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
