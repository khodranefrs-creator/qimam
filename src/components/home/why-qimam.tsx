'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

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
    <section className="bg-primary py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/15 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-accent-gold/3 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-gold/2 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4 text-balance">
            {t.practiceAreas.whyChooseTitle}
          </h2>
          <p className="text-text-muted text-muted-on-dark max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.home.aboutDesc}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="flex items-start gap-4"
              >
                <span className="text-[1.75rem] md:text-[2rem] font-heading font-bold text-accent-gold/20 leading-none shrink-0 mt-0.5 select-none w-8 text-center">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-text-muted text-muted-on-dark text-sm md:text-base leading-relaxed">
                    {item}
                  </p>
                  {i < items.length - 1 && (
                    <div className="mt-4 h-px bg-gradient-to-r from-accent-gold/10 via-accent-gold/5 to-transparent" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
