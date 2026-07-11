import type { Locale } from '@/i18n/config'
import Link from 'next/link'
import { PhoneCall, FileText, Handshake, Scale, ArrowLeft, ArrowRight } from 'lucide-react'
import { getTranslations } from '@/i18n/get-translations'
import { EyebrowTag } from '@/components/ui/eyebrow-tag'

const processSteps = [
  { number: '01', icon: PhoneCall, titleKey: 'step1Title' as const, descKey: 'step1Desc' as const },
  { number: '02', icon: FileText, titleKey: 'step2Title' as const, descKey: 'step2Desc' as const },
  { number: '03', icon: Handshake, titleKey: 'step3Title' as const, descKey: 'step3Desc' as const },
  { number: '04', icon: Scale, titleKey: 'step4Title' as const, descKey: 'step4Desc' as const },
]

export function ProcessTimeline({ locale }: { locale: Locale }) {
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-primary section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />

      <div className="container-custom">
        {/* Title block */}
        <div
          className="animate-fade-up-sm text-center mb-12 md:mb-14"
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
        </div>

        {/* Timeline */}
        <div dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Combined timeline + cards */}
          <div className="relative">
            {/* Desktop: horizontal connector line */}
            <div className="hidden lg:block absolute top-[20px] left-0 right-0 h-[1.5px] pointer-events-none">
              <div className={`w-full h-full ${isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent via-accent-gold/20 to-transparent`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6">
              {processSteps.map((step, i) => {
                const Icon = step.icon

                return (
                  <div key={step.titleKey}>
                    <div
                      className="animate-fade-up group"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      {/* Desktop: numbered node above card */}
                      <div className="hidden lg:flex justify-center relative z-10 -mb-3">
                        <div className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center shadow-[0_0_20px_rgba(198,161,91,0.3)] ring-2 ring-primary">
                          <span className="text-primary font-heading font-bold text-sm">{step.number}</span>
                        </div>
                      </div>

                      {/* Mobile: numbered badge */}
                      <div className="lg:hidden flex items-center gap-3 mb-4 relative z-10">
                        <div className="w-9 h-9 rounded-full bg-accent-gold flex items-center justify-center shadow-[0_0_16px_rgba(198,161,91,0.2)] shrink-0">
                          <span className="text-primary font-heading font-bold text-[11px]">{step.number}</span>
                        </div>
                        <span className="text-[11px] font-medium text-accent-gold/60 tracking-widest uppercase">
                          {t.home.stepLabel} {step.number}
                        </span>
                      </div>

                      {/* Card */}
                      <div className="relative rounded-surface bg-primary-light border border-white/[0.06] hover:border-accent-gold/20 transition-[border-color] duration-500 pt-5 md:pt-6 pb-5 md:pb-7 px-6 md:px-8 flex flex-col items-center text-center lg:h-full overflow-hidden">
                        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/25 to-transparent" />

                        {/* Icon */}
                        <div className="relative z-10 mb-4 md:mb-5">
                          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-accent-gold/[0.10] flex items-center justify-center group-hover:bg-accent-gold/[0.18] transition-[background-color,box-shadow] duration-500 ring-1 ring-accent-gold/25 group-hover:ring-accent-gold/40 shadow-[0_0_25px_rgba(198,161,91,0.10)] group-hover:shadow-[0_0_35px_rgba(198,161,91,0.18)]">
                            <Icon aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8 text-accent-gold" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-heading font-bold text-text-light mb-2 leading-snug relative z-10">
                          {t.home[step.titleKey]}
                        </h3>

                        {/* Description */}
                        <p className="text-sm md:text-[0.9375rem] text-text-muted text-muted-on-dark leading-[1.65] md:leading-[1.7] relative z-10">
                          {t.home[step.descKey]}
                        </p>
                      </div>

                      {/* Mobile: separator */}
                      {i < processSteps.length - 1 && (
                        <div className="lg:hidden flex items-center gap-2 my-5">
                          <div className="flex-1 h-px bg-gradient-to-r from-accent-gold/20 via-accent-gold/10 to-transparent" />
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-gold/30 shrink-0" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div
            className="animate-fade-up-sm flex justify-center mt-12 md:mt-16"
            style={{ animationDelay: '0.6s' }}
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
          </div>
        </div>
      </div>
    </section>
  )
}
