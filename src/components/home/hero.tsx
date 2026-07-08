'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Scale, Shield, Award } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.8 + i * 0.12 },
  }),
}

export function Hero() {
  const locale = useLocale()
  const t = getTranslations(locale)

  const badges = [
    { icon: Scale, label: t.home.badge1 },
    { icon: Shield, label: t.home.badge2 },
    { icon: Award, label: t.home.badge3 },
  ]

  return (
    <section className="relative min-h-screen bg-primary flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(30deg, #B08D57 12%, transparent 12.5%, transparent 87%, #B08D57 87.5%, #B08D57),
            linear-gradient(150deg, #B08D57 12%, transparent 12.5%, transparent 87%, #B08D57 87.5%, #B08D57),
            linear-gradient(30deg, #B08D57 12%, transparent 12.5%, transparent 87%, #B08D57 87.5%, #B08D57),
            linear-gradient(150deg, #B08D57 12%, transparent 12.5%, transparent 87%, #B08D57 87.5%, #B08D57),
            linear-gradient(60deg, rgba(176,141,87,0.08) 25%, transparent 25.5%, transparent 75%, rgba(176,141,87,0.08) 75%, rgba(176,141,87,0.08))
          `,
          backgroundSize: '80px 140px',
        }} />

        {/* Decorative gold column lines */}
        <div className="absolute top-0 bottom-0 left-[8%] w-px bg-gradient-to-b from-transparent via-accent-gold/10 to-transparent hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-px bg-gradient-to-b from-transparent via-accent-gold/10 to-transparent hidden lg:block" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-transparent via-accent-gold/05 to-transparent hidden lg:block" />

        {/* Subtle radial glow */}
        <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-accent-gold/3 blur-[100px]" />

        {/* Gavel/Scale decorative icon top-right */}
        <div className="absolute top-20 right-[10%] opacity-[0.04] hidden lg:block" aria-hidden="true">
          <Scale className="w-32 h-32 text-accent-gold" />
        </div>

        {/* Abstract geometric accent bottom-left */}
        <div className="absolute bottom-20 left-[5%] opacity-[0.03] hidden lg:block" aria-hidden="true">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#B08D57" strokeWidth="0.5">
            <rect x="10" y="10" width="100" height="100" rx="4" />
            <rect x="25" y="25" width="70" height="70" rx="2" />
            <line x1="10" y1="60" x2="110" y2="60" />
            <line x1="60" y1="10" x2="60" y2="110" />
          </svg>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

      <div className="relative z-10 container-custom pt-36 pb-20 md:pt-44 md:pb-28">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-end">
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
            <span className="w-8 h-px bg-accent-gold/60" />
            <span className="text-accent-gold text-sm font-medium tracking-[0.15em] uppercase">Qimam Al-Yaqin Law Firm</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-heading font-bold text-text-light leading-[1.1] mb-6 text-balance">
            {t.home.heroTitle}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-muted leading-[1.75] max-w-xl mb-10 mx-auto lg:mx-0">
            {t.home.heroDesc}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/consultation"
              className="btn-primary group"
              aria-label={t.home.heroCta}
            >
              {t.home.heroCta}
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="btn-secondary"
              aria-label={t.home.heroAbout}
            >
              {t.home.heroAbout}
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border-dark/50 justify-center lg:justify-start">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-accent-gold/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent-gold" aria-hidden="true" />
                  </div>
                  <span className="text-text-muted text-sm">{badge.label}</span>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Trust indicators row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-dark/30 rounded-card overflow-hidden mt-16 max-w-4xl mx-auto lg:mx-0"
        >
          {[
            { value: t.home.statsYearsValue, label: t.home.statsYears },
            { value: t.home.statsCasesValue, label: t.home.statsCases },
            { value: t.home.statsLicensesValue, label: t.home.statsLicenses },
            { value: t.home.statsRatingValue, label: t.home.statsRating },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              className="bg-primary-light/80 backdrop-blur-sm px-6 py-5 text-center"
            >
              <div className="text-2xl md:text-3xl font-heading font-bold gradient-text-gold">{stat.value}</div>
              <div className="text-xs text-text-muted mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
    </section>
  )
}
