import { Metadata } from "next"
import Link from "next/link"
import { CareerForm } from "./career-form"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.careers.title,
    description: t.careers.description,
  }
}

export default async function CareersPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return (
    <div>
      <div className="bg-primary text-text-light py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.careers.title}</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.careers.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.careers.description}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareerForm />
        </div>
      </section>
    </div>
  )
}
