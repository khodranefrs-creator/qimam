'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export default function ScrollToTop() {
  const locale = useLocale()
  const t = getTranslations(locale)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          className="fixed bottom-24 lg:bottom-6 left-8 z-40 w-12 h-12 rounded-full bg-accent-gold text-primary shadow-raised hover:bg-accent-gold/90 hover:shadow-[0_4px_25px_rgba(176,141,87,0.35)] transition-all duration-300 flex items-center justify-center focus-ring-gold"
          aria-label={t.common.scrollToTop}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
