'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BadgeCheck, Award, Calendar, Scale } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'
import { EyebrowTag } from '@/components/ui/eyebrow-tag'

const credentials = (t: ReturnType<typeof getTranslations>) => [
  {
    icon: Award,
    label: t.home.lawyerCredLicense,
    value: t.home.lawyerCredPlaceholder,
  },
  {
    icon: BadgeCheck,
    label: t.home.lawyerCredBody,
    value: t.home.lawyerCredBodyValue,
  },
  {
    icon: Calendar,
    label: t.home.lawyerCredYear,
    value: t.home.lawyerCredPlaceholder,
  },
  {
    icon: Scale,
    label: t.home.lawyerCredCourts,
    value: t.home.lawyerCredCourtValue,
  },
]

export function LawyerTeaser() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  const [imgError, setImgError] = useState(false)

  return (
    <section className="bg-primary py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl bg-gradient-to-b from-primary-light to-primary overflow-hidden border border-border-dark/50 relative shadow-[0_0_60px_rgba(198,161,91,0.08)]">
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #C6A15B 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }} />
              <div className="absolute bottom-0 right-0 left-0 h-1/3 bg-gradient-to-t from-accent-gold/10 to-transparent" />
              {!imgError && (
                <Image
                  src="/images/lawyer-headshot.jpg"
                  alt={t.home.lawyerName}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  priority
                  onError={() => setImgError(true)}
                  className="object-cover object-center relative z-10"
                />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="flex mb-4">
              <EyebrowTag label={t.nav.lawyer} />
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-light mb-3 text-balance leading-[1.1]">
              {t.home.lawyerName}
            </h2>
            <p className="text-accent-gold font-medium text-lg mb-6">
              {t.home.lawyerRole}
            </p>
            <p className="text-text-muted text-muted-on-dark leading-[1.8] mb-10 max-w-lg text-base md:text-[1.0625rem]">
              {t.home.lawyerDesc}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-accent-gold/70 uppercase tracking-[0.12em] mb-5">
                {t.home.lawyerCredHeading}
              </h3>
              <div className="space-y-3">
                {credentials(t).map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-4 px-5 py-3.5 rounded-xl bg-primary-light/40 border border-border-dark/30">
                      <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon aria-hidden="true" className="w-4 h-4 text-accent-gold" />
                      </div>
                      <div className="flex flex-col min-w-0 break-words">
                        <span className="text-text-muted text-muted-on-dark text-xs font-medium uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="text-text-light text-sm font-medium">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <Link
              href="/lawyer"
              className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group"
            >
              <span>{t.home.lawyerLink}</span>
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
