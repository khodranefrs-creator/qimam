import { prisma } from "@/lib/prisma"
import type { FaqData } from "@/types/prisma-models"
import { Metadata } from "next"
import Link from "next/link"
import { FaqClient } from "./faq-client"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.faq.title,
    description: t.faq.description,
  }
}

export default async function FaqPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  const rawFaqs = await prisma.faq.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  })
  const faqs = rawFaqs as FaqData[]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const categories = [...new Set(faqs.map((f) => f.category).filter(Boolean))] as string[]

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-primary text-text-light py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.faq.title}</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.faq.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.faq.description}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqClient faqs={faqs} categories={categories} />
        </div>
      </section>
    </div>
  )
}
