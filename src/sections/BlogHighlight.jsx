import { ExternalLink } from 'lucide-react'
import { posts } from '../data/portfolio'
import { slugify } from '../utils/routing'
import ProjectPreview from '../components/ProjectPreview'
import SectionTitle from '../components/SectionTitle'

export default function BlogHighlight({ navigate }) {
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
