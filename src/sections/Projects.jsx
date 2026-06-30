import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../data/portfolio";
import ProjectPreview from "../components/ProjectPreview";
import SectionTitle from "../components/SectionTitle";

export default function Projects() {
  return (
    <section id="projects" className="section-shell py-24">
      <SectionTitle
        eyebrow="Featured Projects"
        title="Interactive builds with production-minded details."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="project-card glass rounded-3xl p-4"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <ProjectPreview image={project.image} tone={project.tone} />
            <div className="p-3">
              <h3 className="mt-4 font-display text-2xl font-bold">
                {project.title}
              </h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">
                {project.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-cyanx/25 bg-cyanx/10 px-3 py-1 text-xs font-bold text-cyanx"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold hover:border-cyanx/60"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-4 py-2 text-sm font-bold"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
