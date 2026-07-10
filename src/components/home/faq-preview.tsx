'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

interface FaqPreviewItem {
  id: string
  question: string
  answer: string
}

interface Props {
  faqs: FaqPreviewItem[]
}

export function FaqPreview({ faqs }: Props) {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="bg-primary section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light">
            {t.home.faqTitle}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-3xl mx-auto space-y-3"
        >
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className={`rounded-card border transition-all duration-300 ${
                  isOpen
                    ? 'border-accent-gold/40 bg-accent-gold/5'
                    : 'border-border-dark/50 bg-primary-light hover:border-border-dark'
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className={`w-full flex items-center justify-between gap-4 px-6 py-5 ${isRtl ? 'text-right' : 'text-left'} focus-ring-gold rounded-card`}
                >
                  <span className={`font-heading font-medium text-base transition-colors duration-300 ${
                    isOpen ? 'text-accent-gold' : 'text-text-light'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-accent-gold' : 'text-text-muted'
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-text-muted text-muted-on-dark text-sm leading-relaxed border-t border-accent-gold/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link href="/faq" className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group">
            <span>{t.home.faqLink}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
