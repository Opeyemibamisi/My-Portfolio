import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGlow from './components/CursorGlow'
import Footer from './components/Footer'
import Header from './components/Header'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import HomePage from './pages/HomePage'
import { getRoute } from './utils/routing'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [route, setRoute] = useState(getRoute)

  const navigate = (href) => {
    window.history.pushState({}, '', href)
    setRoute(getRoute())
    window.setTimeout(() => {
      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 0)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    const handlePop = () => setRoute(getRoute())
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.glass').forEach((card) => {
        gsap.fromTo(card, { y: 26, opacity: 0.72 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="noise min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <CursorGlow />
      <Header theme={theme} setTheme={setTheme} navigate={navigate} />
      {route.page === 'blog' ? (
        <BlogListPage navigate={navigate} />
      ) : route.page === 'post' ? (
        <BlogPostPage slug={route.slug} navigate={navigate} />
      ) : (
        <HomePage navigate={navigate} />
      )}
      <Footer navigate={navigate} />
    </div>
  )
}

