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
    <section className="bg-primary section-padding relative overflow-hidden">
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
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light leading-[1.15] mb-4 text-balance">
            {t.practiceAreas.whyChooseTitle}
          </h2>
          <p className="text-text-muted text-muted-on-dark max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.home.aboutDesc}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
              className="group relative p-6 md:p-7 rounded-2xl bg-primary-light border border-white/[0.06] hover:border-accent-gold/25 transition-all duration-500 hover:shadow-[0_0_35px_rgba(198,161,91,0.08)] overflow-hidden"
            >
              {/* Left gold accent bar */}
              <div aria-hidden="true" className="absolute start-0 top-3 bottom-3 w-px bg-gradient-to-b from-accent-gold/30 via-accent-gold/10 to-transparent rounded-full group-hover:from-accent-gold/50 transition-all duration-500" />

              {/* Top gold accent line */}
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/25 to-transparent" />

              {/* Number */}
              <div className="relative z-10 mb-3 md:mb-4">
                <span className="text-[2rem] md:text-[2.5rem] font-heading font-bold text-accent-gold/15 leading-none tracking-tight select-none group-hover:text-accent-gold/20 transition-all duration-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Text */}
              <p className="text-text-muted text-muted-on-dark text-sm md:text-base leading-relaxed relative z-10">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
