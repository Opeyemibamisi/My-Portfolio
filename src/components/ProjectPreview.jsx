

export default function ProjectPreview({ tone }) {
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
