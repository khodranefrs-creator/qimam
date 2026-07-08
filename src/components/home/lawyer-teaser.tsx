'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Award, BookOpen, Scale, BadgeCheck } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function LawyerTeaser() {
  const locale = useLocale()
  const t = getTranslations(locale)

  const badges = [
    { icon: Award, label: t.home.lawyerBadge1 },
    { icon: BadgeCheck, label: t.home.lawyerBadge2 },
    { icon: BookOpen, label: t.home.lawyerBadge3 },
    { icon: Scale, label: t.home.lawyerBadge4 },
  ]

  return (
    <section className="bg-primary section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-b from-primary-light to-primary overflow-hidden border border-border-dark/50 relative">
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #C6A15B 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }} />
              <div className="w-full h-full flex items-center justify-center relative z-10">
                <div className="text-center p-8">
                  <div className="w-28 h-28 rounded-full bg-accent-gold/10 border-2 border-accent-gold/20 flex items-center justify-center mx-auto mb-5">
                    <span className="text-4xl font-heading font-bold text-accent-gold">{t.home.lawyerName.charAt(0)}</span>
                  </div>
                  <p className="text-text-light/70 text-sm font-heading font-semibold">{t.home.lawyerName}</p>
                  <p className="text-text-muted/60 text-xs mt-1">{t.home.lawyerRole}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent-gold/60" />
              <span className="text-accent-gold text-sm font-medium">{t.nav.lawyer}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-2 text-balance">
              {t.home.lawyerName}
            </h2>
            <p className="text-accent-gold font-medium mb-6">{t.home.lawyerRole}</p>
            <p className="text-text-muted leading-[1.8] mb-8 max-w-lg">
              {t.home.lawyerDesc}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {badges.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-light/40 border border-border-dark/30">
                    <Icon aria-hidden="true" className="w-4 h-4 text-accent-gold shrink-0" />
                    <span className="text-text-muted text-sm">{item.label}</span>
                  </div>
                )
              })}
            </div>
            <Link
              href="/lawyer"
              className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group"
            >
              {t.home.lawyerLink}
              <ArrowLeft aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
