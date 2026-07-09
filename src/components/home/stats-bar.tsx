'use client'

import { motion } from 'framer-motion'
import { Scale, Shield, BadgeCheck, ScrollText } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const credentials = [
  { icon: BadgeCheck, key: 'badge1' as const },
  { icon: Shield, key: 'badge2' as const },
  { icon: Scale, key: 'badge3' as const },
  { icon: ScrollText, key: 'lawyerBadge2' as const },
]

export function StatsBar() {
  const locale = useLocale()
  const t = getTranslations(locale)

  return (
    <section className="bg-primary border-y border-accent-gold/20">
      <div className="container-custom py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {credentials.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex items-center gap-4 px-5 py-5 rounded-xl bg-primary-light/30 border border-border-dark/20 hover:border-accent-gold/20 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                  <Icon aria-hidden="true" className="w-5 h-5 text-accent-gold" />
                </div>
                <span className="text-text-muted text-muted-on-dark text-sm leading-snug">{t.home[item.key]}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
