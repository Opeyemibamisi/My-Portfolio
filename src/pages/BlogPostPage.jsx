import { motion } from 'framer-motion'
import { developerName, posts } from '../data/portfolio'
import { slugify } from '../utils/routing'
import ProjectPreview from '../components/ProjectPreview'

export default function BlogPostPage({ slug, navigate }) {
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
