import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { PracticeAreasClient } from "./practice-areas-client"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.practiceAreas.title,
    description: t.practiceAreas.description,
  }
}

async function getPracticeAreas() {
  try {
    return await prisma.practiceArea.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    })
  } catch {
    console.warn("Database unavailable for practice areas, showing empty state")
    return []
  }
}

export default async function PracticeAreasPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  const areas = await getPracticeAreas()

  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted text-muted-on-dark">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.practiceAreas.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-6">{t.practiceAreas.title}</h1>
            <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-8" />
            <p className="text-lg leading-[1.8] text-text-muted text-muted-on-dark">
              {t.practiceAreas.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <PracticeAreasClient areas={areas} />
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-[1.15] mb-6">{t.practiceAreas.ctaTitle}</h2>
          <p className="text-text-muted text-muted-on-dark mb-8">{t.practiceAreas.ctaDesc}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/consultation">
              <Button variant="primary" size="lg">{t.practiceAreas.ctaBooking}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">{t.nav.contactUs}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
