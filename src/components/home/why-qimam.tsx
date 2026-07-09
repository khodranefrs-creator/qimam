'use client'

import { motion } from 'framer-motion'
import { Gavel, Scale, FileCheck, UserCheck, Clock, Star } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const checklistIcons = [Gavel, Scale, FileCheck, UserCheck, Clock, Star]

export function WhyQimam() {
  const locale = useLocale()
  const t = getTranslations(locale)

  const pa = t.practiceAreas as unknown as Record<string, string>

  const items = [
    pa.checklist1,
    pa.checklist2,
    pa.checklist3,
    pa.checklist4,
    pa.checklist5,
    pa.checklist6,
  ]

  return (
    <section className="bg-primary section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/15 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-accent-gold/3 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-gold/2 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent-gold/60" />
            <span className="text-accent-gold text-sm font-medium">{t.about.whyUsTitle}</span>
            <span className="w-8 h-px bg-accent-gold/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4 text-balance">
            {t.practiceAreas.whyChooseTitle}
          </h2>
          <p className="text-text-muted text-muted-on-dark max-w-2xl mx-auto">
            {t.home.aboutDesc}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((item, i) => {
              const Icon = checklistIcons[i]
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                  className="flex items-start gap-4 px-5 py-5 rounded-xl bg-primary-light/40 border border-border-dark/30 hover:border-accent-gold/20 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon aria-hidden="true" className="w-5 h-5 text-accent-gold" />
                  </div>
                  <p className="text-text-muted text-muted-on-dark text-sm leading-relaxed">{item}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
