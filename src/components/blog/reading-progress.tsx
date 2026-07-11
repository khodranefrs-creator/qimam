"use client"

import { useEffect, useState, useRef } from "react"
import { useLocale } from "@/i18n/use-locale"

export function ReadingProgress() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const [progress, setProgress] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    function handleScroll() {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          if (docHeight > 0) {
            setProgress(Math.min((scrollTop / docHeight) * 100, 100))
          }
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 right-0 left-0 z-[60] h-1 bg-primary-light pointer-events-none">
      <div
        className="h-full bg-accent-gold transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: `scaleX(${progress / 100})`, transformOrigin: isRtl ? 'right' : 'left' }}
      />
    </div>
  )
}
