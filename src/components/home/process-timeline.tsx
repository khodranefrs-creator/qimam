'use client'

import { motion } from 'framer-motion'
import { PhoneCall, FileText, Handshake, Scale } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function ProcessTimeline() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  const steps = [
    { icon: PhoneCall, title: t.home.step1Title, description: t.home.step1Desc },
    { icon: FileText, title: t.home.step2Title, description: t.home.step2Desc },
    { icon: Handshake, title: t.home.step3Title, description: t.home.step3Desc },
    { icon: Scale, title: t.home.step4Title, description: t.home.step4Desc },
  ]

  return (
    <section className="bg-primary section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent-gold/60" />
            <span className="text-accent-gold text-sm font-medium">{t.home.processTitle}</span>
            <span className="w-8 h-px bg-accent-gold/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
            {t.home.processTitle}
          </h2>
          <p className="text-text-muted text-muted-on-dark max-w-2xl mx-auto">
            {t.home.processDesc}
          </p>
        </motion.div>

        <div className="relative">
          <div className={`absolute ${isRtl ? 'right-8' : 'left-8'} top-0 bottom-0 w-px bg-gradient-to-b from-accent-gold/40 via-accent-gold/20 to-transparent hidden md:block`} />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative md:flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-start' : 'md:text-end'} mb-6 md:mb-0`}>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 md:hidden">
                          <Icon className="w-4 h-4 text-accent-gold" />
                        </span>
                        <span className="text-accent-gold text-sm font-medium">{t.home.stepLabel} {i + 1}</span>
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-text-light mb-2">{step.title}</h3>
                      <p className="text-text-muted text-muted-on-dark text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center shrink-0 relative">
                    <div className="w-16 h-16 rounded-full bg-primary border-2 border-accent-gold/40 flex items-center justify-center z-10">
                      <Icon className="w-6 h-6 text-accent-gold" />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
