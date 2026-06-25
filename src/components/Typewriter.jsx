import { useEffect, useState } from 'react'
import { typewriterWords } from '../data/portfolio'

export default function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0)
  const [letterCount, setLetterCount] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = typewriterWords[wordIndex]
    const delay = deleting ? 38 : letterCount === current.length ? 1150 : 72
    const timer = setTimeout(() => {
      if (!deleting && letterCount < current.length) setLetterCount((value) => value + 1)
      else if (!deleting) setDeleting(true)
      else if (letterCount > 0) setLetterCount((value) => value - 1)
      else {
        setDeleting(false)
        setWordIndex((value) => (value + 1) % typewriterWords.length)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [deleting, letterCount, wordIndex])

  return <span>{typewriterWords[wordIndex].slice(0, letterCount)}<span className="animate-pulse">|</span></span>
}
