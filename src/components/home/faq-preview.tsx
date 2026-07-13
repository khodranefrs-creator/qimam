import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/get-translations'
import { FaqAccordion } from './faq-accordion'

interface FaqPreviewItem {
  id: string
  question: string
  answer: string
}

interface Props {
  faqs: FaqPreviewItem[]
  locale: Locale
}

export function FaqPreview({ faqs, locale }: Props) {
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="bg-primary section-padding">
      <div className="container-custom">
        <div className="animate-fade-up-sm mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light leading-[1.15]">
            {t.home.faqTitle}
          </h2>
        </div>

        <div className="animate-fade-up-sm" style={{ animationDelay: '0.1s' }}>
          <FaqAccordion faqs={faqs} />
        </div>

        <div className="animate-fade-in text-center mt-10 md:mt-12"
          style={{ animationDelay: '0.3s' }}
        >
          <Link href="/faq" className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group">
            <span>{t.home.faqLink}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>
    </section>
  )
}
