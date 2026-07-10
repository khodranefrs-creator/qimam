'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PhoneCall, FileText, Handshake, Scale, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'
import { EyebrowTag } from '@/components/ui/eyebrow-tag'

const processSteps = [
  { number: '01', icon: PhoneCall, titleKey: 'step1Title' as const, descKey: 'step1Desc' as const },
  { number: '02', icon: FileText, titleKey: 'step2Title' as const, descKey: 'step2Desc' as const },
  { number: '03', icon: Handshake, titleKey: 'step3Title' as const, descKey: 'step3Desc' as const },
  { number: '04', icon: Scale, titleKey: 'step4Title' as const, descKey: 'step4Desc' as const },
]

export function ProcessTimeline() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-primary section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <div className="flex justify-center mb-4">
            <EyebrowTag label={t.home.processTitle} />
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-heading font-bold text-text-light leading-[1.1] mb-5 text-balance max-w-3xl mx-auto">
            {t.home.processHeading}
          </h2>
          <p className="text-text-muted text-muted-on-dark max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.home.processDesc}
          </p>
        </motion.div>

        <div className="relative">
          <div className={`hidden lg:block absolute left-[10%] right-[10%] top-[92px] h-px ${isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent via-accent-gold/[0.25] to-transparent`} />

          <div dir={isRtl ? 'rtl' : 'ltr'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-5">
            {processSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group relative flex flex-col items-center text-center lg:items-start lg:text-start"
                >
                  <span className="text-[2rem] md:text-[2.5rem] font-heading font-bold text-accent-gold/[0.07] leading-none mb-4 select-none tracking-tight">
                    {step.number}
                  </span>

                  <div className="relative">
                    <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-accent-gold z-10" />
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-accent-gold/[0.08] flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-accent-gold/[0.15] transition-colors duration-700 ring-1 ring-accent-gold/[0.08] group-hover:ring-accent-gold/20">
                      <Icon aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent-gold" />
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-heading font-bold text-text-light mb-3 leading-snug">
                    {t.home[step.titleKey]}
                  </h3>
                  <p className="text-sm md:text-[0.9375rem] text-text-muted text-muted-on-dark leading-[1.75] max-w-xs">
                    {t.home[step.descKey]}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-10 md:mt-14 lg:mt-16"
          >
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group"
            >
              <span>{t.home.ctaBooking}</span>
              {isRtl ? (
                <ArrowLeft aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ) : (
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
