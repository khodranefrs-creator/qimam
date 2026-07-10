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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function ProcessTimeline() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-primary section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />

      <div className="container-custom">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center mb-4">
            <EyebrowTag label={t.home.processTitle} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light leading-[1.15] mb-4 text-balance max-w-3xl mx-auto">
            {t.home.processHeading}
          </h2>
          <p className="text-text-muted text-muted-on-dark max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.home.processDesc}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Connecting line — desktop horizontal */}
          <div className="hidden lg:block absolute top-[100px] left-8 right-8 h-px pointer-events-none">
            <div className="relative h-full">
              <div className={`absolute inset-0 ${isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent via-accent-gold/20 to-transparent`} />
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 w-2 h-2 rounded-full bg-accent-gold/50"
                  style={{
                    [isRtl ? 'right' : 'left']: `${12.5 + i * 25}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Connecting line — mobile vertical */}
          <div className="lg:hidden absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ [isRtl ? 'right' : 'left']: '20px' }}
          >
            <div className="w-full h-full bg-gradient-to-b from-accent-gold/25 via-accent-gold/15 to-transparent" />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon
              const isLast = i === processSteps.length - 1

              return (
                <motion.div
                  key={step.titleKey}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={cardVariants}
                  className="group"
                >
                  <div className="flex gap-4 lg:gap-0">
                    {/* Mobile timeline rail */}
                    <div className="lg:hidden flex flex-col items-center w-10 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-accent-gold ring-2 ring-accent-gold/20 z-10 relative mt-6" />
                      {!isLast && <div className="w-px flex-1" />}
                    </div>

                    {/* Card */}
                    <div className="flex-1 min-w-0">
                      <div className="relative rounded-surface bg-primary-light border border-white/[0.06] hover:border-accent-gold/20 transition-all duration-500 p-5 md:p-8 flex flex-col items-center text-center h-full overflow-hidden">
                        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/25 to-transparent" />

                        {/* Decorative step number */}
                        <span className="absolute top-2 end-3 md:top-3 md:end-4 text-[4rem] md:text-[6rem] font-heading font-bold text-accent-gold/[0.08] leading-none select-none pointer-events-none tracking-tight">
                          {step.number}
                        </span>

                        {/* Step label */}
                        <span className="relative z-10 text-[11px] md:text-xs font-medium text-accent-gold/60 tracking-widest uppercase mb-3">
                          {t.home.stepLabel} {step.number}
                        </span>

                        {/* Icon */}
                        <div className="relative z-10 mb-5 md:mb-6">
                          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-accent-gold/[0.08] flex items-center justify-center group-hover:bg-accent-gold/[0.15] transition-all duration-500 ring-1 ring-accent-gold/[0.15] group-hover:ring-accent-gold/30 shadow-[0_0_20px_rgba(198,161,91,0.06)] group-hover:shadow-[0_0_30px_rgba(198,161,91,0.12)]">
                            <Icon aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8 text-accent-gold" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-heading font-bold text-text-light mb-3 leading-snug relative z-10">
                          {t.home[step.titleKey]}
                        </h3>

                        {/* Description */}
                        <p className="text-sm md:text-[0.9375rem] text-text-muted text-muted-on-dark leading-[1.75] relative z-10 max-w-[260px]">
                          {t.home[step.descKey]}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex justify-center mt-12 md:mt-16"
          >
            <Link
              href="/consultation"
              className="btn-primary group"
              aria-label={t.home.ctaBooking}
            >
              {t.home.ctaBooking}
              {isRtl ? (
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              ) : (
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              )}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
