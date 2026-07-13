'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

interface FaqItem {
  id: string
  question: string
  answer: string
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-3">
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
              <span className={`font-heading font-semibold text-base transition-colors duration-300 ${
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
            <div
              className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 text-text-muted text-muted-on-dark text-sm leading-relaxed border-t border-accent-gold/10 pt-4">
                {faq.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
