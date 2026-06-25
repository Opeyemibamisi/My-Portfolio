import About from '../sections/About'
import BlogHighlight from '../sections/BlogHighlight'
import Contact from '../sections/Contact'
import Experience from '../sections/Experience'
import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import Services from '../sections/Services'
import Skills from '../sections/Skills'
import Testimonials from '../sections/Testimonials'

export default function HomePage({ navigate }) {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <BlogHighlight navigate={navigate} />
      <Testimonials />
      <Contact />
    </main>
  )
}

