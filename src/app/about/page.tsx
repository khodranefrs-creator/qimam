import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Zap, Users, FileCheck, Scale, Building2, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.about.title,
    description: t.about.description,
  }
}

const values = (t: ReturnType<typeof getTranslations>) => [
  { icon: Shield, title: t.about.value1Title, desc: t.about.value1Desc },
  { icon: Zap, title: t.about.value2Title, desc: t.about.value2Desc },
  { icon: Users, title: t.about.value3Title, desc: t.about.value3Desc },
  { icon: FileCheck, title: t.about.value4Title, desc: t.about.value4Desc },
]

const highlights = (t: ReturnType<typeof getTranslations>) => [
  { icon: Scale, label: t.about.highlight1 },
  { icon: Building2, label: t.about.highlight2 },
  { icon: Gavel, label: t.about.highlight3 },
]

export default async function AboutPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.about.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-6">{t.about.title}</h1>
            <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-8" />
            <p className="text-lg leading-[1.8] text-text-muted">
              {t.about.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-[1.8] mb-6">{t.about.bio1}</p>
            <p className="text-lg leading-[1.8] mb-6">{t.about.bio2}</p>
            <p className="text-lg leading-[1.8] mb-6">{t.about.bio3}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-panel border border-border-dark bg-primary-light">
              <h2 className="text-2xl font-heading font-bold leading-[1.15] mb-4 text-accent-gold">{t.about.visionTitle}</h2>
              <p className="leading-[1.8] text-text-muted">
                {t.about.visionDesc}
              </p>
            </div>
            <div className="p-8 rounded-panel border border-border-dark bg-primary-light">
              <h2 className="text-2xl font-heading font-bold leading-[1.15] mb-4 text-accent-gold">{t.about.missionTitle}</h2>
              <p className="leading-[1.8] text-text-muted">
                {t.about.missionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold leading-[1.15] mb-6">{t.about.whyUsTitle}</h2>
              <div className="space-y-4">
                {highlights(t).map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-accent-gold" />
                      </div>
                      <span className="text-text-dark text-sm">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="aspect-[4/3] rounded-card bg-primary overflow-hidden border border-border-dark/50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-8 h-8 text-accent-gold" />
                </div>
                <p className="text-text-light/60 text-sm">{t.home.officeImage}</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-[1.15] text-center mb-12">{t.about.valuesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values(t).map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="p-6 rounded-panel bg-white border border-border shadow-subtle hover-lift transition-all">
                  <div className="w-12 h-12 rounded-control bg-accent-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-2">{v.title}</h3>
                  <p className="text-sm leading-[1.7] text-text-muted">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-[1.15] mb-6">{t.home.finalCTATitle}</h2>
          <p className="text-text-muted mb-8">{t.home.finalCTADesc}</p>
          <Link href="/consultation">
            <Button variant="primary" size="lg">{t.home.ctaBooking}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
