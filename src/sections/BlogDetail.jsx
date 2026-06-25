import { motion } from 'framer-motion'
import { developerName, posts } from '../data/portfolio'
import ProjectPreview from '../components/ProjectPreview'

export default function BlogDetail({ post, onBack }) {
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
