'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react'
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
  const t = getTranslations(locale)
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="bg-primary section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent-gold/60" />
            <span className="text-accent-gold text-sm font-medium">{t.faq.title}</span>
            <span className="w-8 h-px bg-accent-gold/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
            {t.home.faqTitle}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t.home.faqDesc}
          </p>
        </motion.div>

        {faqs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-lg mx-auto text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-accent-gold/5 border border-accent-gold/10 flex items-center justify-center mx-auto mb-4">
              <HelpCircle aria-hidden="true" className="w-7 h-7 text-accent-gold/30" />
            </div>
            <p className="text-text-muted text-sm">{t.faq.noResults}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right focus-ring-gold rounded-card"
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
                        <div className="px-6 pb-5 text-text-muted text-sm leading-relaxed border-t border-accent-gold/10 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link href="/faq" className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200">
            {t.home.faqLink}
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
