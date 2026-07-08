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
      <div className="container-custom py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-gold" />
                </div>
                <span className="text-2xl md:text-3xl font-heading font-bold gradient-text-gold">{stat.value}</span>
                <span className="text-text-muted text-sm">{stat.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
