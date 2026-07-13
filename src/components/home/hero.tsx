import type { Locale } from '@/i18n/config'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Scale, Shield, Award, BadgeCheck } from 'lucide-react'
import { getTranslations } from '@/i18n/get-translations'
import { EyebrowTag } from '@/components/ui/eyebrow-tag'

const trustCards = [
  { icon: BadgeCheck, titleKey: 'statsYearsBadge', descKey: 'card1Desc' },
  { icon: Scale, titleKey: 'statsCasesBadge', descKey: 'card2Desc' },
  { icon: Shield, titleKey: 'statsLicensesBadge', descKey: 'card3Desc' },
  { icon: Award, titleKey: 'statsRatingBadge', descKey: 'card4Desc' },
]

export function Hero({ locale }: { locale: Locale }) {
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="relative min-h-screen bg-primary lg:flex lg:items-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.034] max-md:hidden" style={{
          backgroundImage: `
            linear-gradient(30deg, #C6A15B 10%, transparent 10.5%, transparent 90%, #C6A15B 90.5%, #C6A15B)
          `,
          backgroundSize: '100px 100px',
        }} />

        <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-transparent via-accent-gold/15 to-transparent hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-transparent via-accent-gold/15 to-transparent hidden lg:block" />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-gold/4 blur-[150px] max-md:blur-[20px] max-md:opacity-40" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-gold/2 blur-[120px] max-md:blur-[20px] max-md:opacity-40" />

        <div className="absolute bottom-24 left-[8%] opacity-[0.034] hidden lg:block" aria-hidden="true">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#C6A15B" strokeWidth="1">
            <rect x="10" y="10" width="80" height="80" rx="2" />
            <rect x="25" y="25" width="50" height="50" rx="1" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="50" y1="10" x2="50" y2="90" />
          </svg>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

      <div className="relative z-10 container-custom pt-24 md:pt-36 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="animate-hero-slide-up flex justify-center mb-3"
            style={{ animationDelay: '0s' }}
          >
            <EyebrowTag label={t.home.heroBadge} />
          </div>

          <h1
            className="text-[clamp(1.875rem,5.5vw,5rem)] font-heading font-bold text-text-light leading-[1.1] mb-6 md:mb-7"
          >
            {t.home.heroTitle}
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-text-muted text-muted-on-dark leading-[1.7] sm:leading-[1.8] max-w-[39rem] mb-8 md:mb-10 mx-auto"
          >
            {t.home.heroDesc}
          </p>

          <div
            className="animate-hero-slide-up flex flex-wrap gap-4 justify-center"
            style={{ animationDelay: '0.24s' }}
          >
            <Link
              href="/consultation"
              className="btn-primary group"
              aria-label={t.home.ctaBooking}
            >
              {t.home.ctaBooking}
              {isRtl ? (
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              ) : (
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              )}
            </Link>
            <Link
              href="/services"
              className="btn-secondary"
              aria-label={t.home.heroAbout}
            >
              {t.home.heroAbout}
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {trustCards.map((card, i) => {
              const Icon = card.icon
              return (
                <div key={card.titleKey} className="h-full">
                  <div
                    className="group relative p-5 sm:p-5 md:p-8 rounded-surface bg-primary-light border border-white/[0.06] hover:border-accent-gold/20 transition-colors duration-700"
                    style={{ animation: `fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + i * 0.08}s forwards` }}
                  >
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/25 to-transparent" />
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-accent-gold/[0.08] flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-accent-gold/[0.15] transition-colors duration-700 ring-1 ring-accent-gold/[0.08] group-hover:ring-accent-gold/20">
                      <Icon aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent-gold" />
                    </div>
                    <h3 className="text-base sm:text-base md:text-lg font-heading font-semibold text-text-light mb-1.5 sm:mb-2 leading-snug tracking-tight">
                      {t.home[card.titleKey as keyof typeof t.home] as string}
                    </h3>
                    <p className="text-xs md:text-sm text-text-muted text-muted-on-dark leading-relaxed md:leading-[1.7]">
                      {t.home[card.descKey as keyof typeof t.home] as string}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary via-primary/60 to-transparent pointer-events-none" />
    </section>
  )
}
