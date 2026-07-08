'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, FileCheck, Star } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function StatsBar() {
  const locale = useLocale()
  const t = getTranslations(locale)

  const stats = [
    { icon: Briefcase, value: t.home.statsYearsValue, label: t.home.statsYears },
    { icon: Users, value: t.home.statsCasesValue, label: t.home.statsCases },
    { icon: FileCheck, value: t.home.statsLicensesValue, label: t.home.statsLicenses },
    { icon: Star, value: t.home.statsRatingValue, label: t.home.statsRating },
  ]

  return (
    <section className="bg-primary border-y border-accent-gold/20">
      <div className="container-custom py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col items-center text-center gap-3 px-4 py-6 rounded-xl bg-primary-light/40 border border-border-dark/30 hover:border-accent-gold/20 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent-gold" />
                </div>
                <span className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold gradient-text-gold leading-none">{stat.value}</span>
                <span className="text-text-muted text-sm leading-tight">{stat.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
