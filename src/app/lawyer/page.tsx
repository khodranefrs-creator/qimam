import type { Metadata } from "next"
import Link from "next/link"
import { Award, BadgeCheck, Phone, MessageCircle, Briefcase, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.lawyer.title,
    description: t.lawyer.description,
  }
}

const certifications = (t: ReturnType<typeof getTranslations>) => [
  { icon: BadgeCheck, label: t.lawyer.cert1 },
  { icon: BadgeCheck, label: t.lawyer.cert2 },
  { icon: BadgeCheck, label: t.lawyer.cert3 },
  { icon: BadgeCheck, label: t.lawyer.cert4 },
]

const skills = (t: ReturnType<typeof getTranslations>) => [
  t.lawyer.skill1,
  t.lawyer.skill2,
  t.lawyer.skill3,
  t.lawyer.skill4,
  t.lawyer.skill5,
  t.lawyer.skill6,
  t.lawyer.skill7,
  t.lawyer.skill8,
]

export default async function LawyerPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.lawyer.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-accent-gold bg-primary-light flex items-center justify-center overflow-hidden">
                  <span className="text-6xl font-heading font-bold text-accent-gold">{t.lawyer.name.charAt(0)}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-accent-gold flex items-center justify-center shadow-gold animate-pulse-ring-subtle">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full border-2 border-accent-gold/40 bg-primary flex items-center justify-center">
                  <span className="text-accent-gold text-xs font-heading font-bold">✓</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 text-center lg:text-right">
              <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                <span className="w-8 h-px bg-accent-gold/60" />
                <span className="text-accent-gold text-sm font-medium tracking-widest">{t.lawyer.resumeLabel}</span>
              </div>
              <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold mb-2 leading-tight">
                {t.lawyer.name}
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-sm font-medium mb-6">
                <BadgeCheck className="w-4 h-4" />
                <span>{t.lawyer.role}</span>
              </div>
              <p className="text-text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.lawyer.introduction}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-8 justify-center lg:justify-start">
                <Link href="/consultation">
                  <Button variant="primary" size="lg">{t.nav.consultation}</Button>
                </Link>
                <a
                  href="https://wa.me/966565555437?text=مرحباً، أرغب بالاستفسار عن خدماتكم القانونية"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    <MessageCircle className="w-4 h-4" />
                    {t.footer.whatsapp}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">{t.lawyer.experience}</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>{t.lawyer.bioPara1}</p>
                <p>{t.lawyer.bioPara2}</p>
                <p>{t.lawyer.bioPara3}</p>
              </div>
            </div>
            <div>
              <div className="bg-primary rounded-card p-6 border border-border-dark mb-8">
                <h3 className="font-heading font-bold text-text-light mb-5 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-gold" />
                  <span>{t.lawyer.certificationsLabel}</span>
                </h3>
                <div className="space-y-4">
                  {certifications(t).map((cert) => {
                    const Icon = cert.icon
                    return (
                      <div key={cert.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-accent-gold" />
                        </div>
                        <span className="text-text-muted text-sm">{cert.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="bg-primary rounded-card p-6 border border-border-dark">
                <h3 className="font-heading font-bold text-text-light mb-5 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent-gold" />
                  <span>{t.lawyer.skillsLabel}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills(t).map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="w-8 h-px bg-accent-gold/60" />
              <span className="text-accent-gold text-sm font-medium tracking-widest">{t.lawyer.title}</span>
            </div>
            <div className="relative p-8 md:p-12 rounded-2xl bg-secondary border border-border/60">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-accent-gold/10" />
              <p className="text-lg md:text-xl leading-[1.9] text-text-dark relative z-10 mb-6">{t.lawyer.lawyerQuote}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-accent-gold flex items-center justify-center">
                  <span className="text-lg font-heading font-bold text-accent-gold">{t.lawyer.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-text-dark">{t.lawyer.lawyerNameDisplay}</div>
                  <div className="text-text-muted text-sm">{t.lawyer.lawyerRoleDisplay}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-white border border-border shadow-card text-center hover-lift">
              <div className="text-3xl font-heading font-bold text-accent-gold mb-1">{t.common.notAvailable}</div>
              <div className="text-text-muted text-sm">{t.lawyer.statsLabelYears}</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border shadow-card text-center hover-lift">
              <div className="text-3xl font-heading font-bold text-accent-gold mb-1">{t.common.notAvailable}</div>
              <div className="text-text-muted text-sm">{t.home.statsCases}</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border shadow-card text-center hover-lift">
              <div className="text-3xl font-heading font-bold text-accent-gold mb-1">{t.common.notAvailable}</div>
              <div className="text-text-muted text-sm">{t.lawyer.statsLabelRating}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-heading font-bold mb-6">{t.lawyer.contactTitle}</h2>
          <p className="text-text-muted mb-8">{t.lawyer.contactDesc}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/consultation">
              <Button variant="primary" size="lg">{t.home.ctaBooking}</Button>
            </Link>
            <a href="tel:+966565555437">
              <Button variant="secondary" size="lg">
                <Phone className="w-4 h-4" />
                +966 56 555 5437
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
