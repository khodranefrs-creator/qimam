'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Scale, Shield, Award, BadgeCheck } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const trustCards = [
  {
    icon: BadgeCheck,
    key: 'statsYearsBadge' as const,
    desc: { ar: 'استشارات قانونية احترافية', en: 'Professional legal consultations' },
  },
  {
    icon: Scale,
    key: 'statsCasesBadge' as const,
    desc: { ar: 'خبرة قانونية متخصصة', en: 'Specialized legal expertise' },
  },
  {
    icon: Shield,
    key: 'statsLicensesBadge' as const,
    desc: { ar: 'إجراءات قانونية واضحة', en: 'Clear legal procedures' },
  },
  {
    icon: Award,
    key: 'statsRatingBadge' as const,
    desc: { ar: 'سرية واهتمام بكل قضية', en: 'Confidentiality and attention to every case' },
  },
]

export function Hero() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="relative min-h-screen bg-primary flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(30deg, #C6A15B 10%, transparent 10.5%, transparent 90%, #C6A15B 90.5%, #C6A15B)
          `,
          backgroundSize: '100px 100px',
        }} />

        <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-transparent via-accent-gold/15 to-transparent hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-transparent via-accent-gold/15 to-transparent hidden lg:block" />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-gold/4 blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-gold/2 blur-[120px]" />

        <div className="absolute bottom-24 left-[8%] opacity-[0.04] hidden lg:block" aria-hidden="true">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#C6A15B" strokeWidth="1">
            <rect x="10" y="10" width="80" height="80" rx="2" />
            <rect x="25" y="25" width="50" height="50" rx="1" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="50" y1="10" x2="50" y2="90" />
          </svg>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

      <div className="relative z-10 container-custom pt-36 pb-16 md:pt-44 md:pb-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-end">
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
            <span className="w-8 h-px bg-accent-gold/60" />
            <span className="text-accent-gold text-sm font-medium tracking-[0.15em] uppercase">{t.home.heroBadge}</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-[clamp(2.25rem,5.5vw,5rem)] font-heading font-bold text-text-light leading-[1.05] mb-6 text-balance">
            {t.home.heroTitle}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-muted text-muted-on-dark leading-[1.8] max-w-xl mb-10 mx-auto lg:mx-0">
            {t.home.heroDesc}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/consultation"
              className="btn-primary group"
              aria-label={t.home.heroCta}
            >
              {t.home.heroCta}
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.6, duration: 0.5 } }}
          className="mt-16 md:mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {trustCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 1.8 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }}
                  className="group relative p-6 md:p-8 rounded-2xl bg-primary-light/40 backdrop-blur-sm border border-white/[0.06] hover:border-accent-gold/20 hover:bg-primary-light/60 transition-all duration-700"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent-gold/[0.08] flex items-center justify-center mb-5 group-hover:bg-accent-gold/[0.15] transition-colors duration-700 ring-1 ring-accent-gold/[0.08] group-hover:ring-accent-gold/20">
                    <Icon aria-hidden="true" className="w-6 h-6 md:w-7 md:h-7 text-accent-gold" />
                  </div>
                  <h3 className="text-base md:text-lg font-heading font-semibold text-text-light mb-2 leading-snug tracking-tight">
                    {t.home[card.key]}
                  </h3>
                  <p className="text-xs md:text-sm text-text-muted text-muted-on-dark leading-relaxed md:leading-[1.7]">
                    {locale === 'ar' ? card.desc.ar : card.desc.en}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary via-primary/60 to-transparent pointer-events-none" />
    </section>
  )
}
