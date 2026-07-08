'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Scale, Shield, FileCheck, Award } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function AboutTeaser() {
  const locale = useLocale()
  const t = getTranslations(locale)

  const highlights = [
    { icon: Scale, label: t.home.aboutHighlight1 },
    { icon: Shield, label: t.home.aboutHighlight2 },
    { icon: FileCheck, label: t.home.aboutHighlight3 },
    { icon: Award, label: t.home.aboutHighlight4 },
  ]

  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent-gold/60" />
              <span className="text-accent-gold text-sm font-medium">{t.nav.about}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6 text-balance">
              {t.home.aboutTitle}
            </h2>
            <p className="text-text-muted leading-[1.8] mb-8 max-w-xl">
              {t.home.aboutDesc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-border/60">
                    <div className="w-9 h-9 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                      <Icon aria-hidden="true" className="w-4 h-4 text-accent-gold" />
                    </div>
                    <span className="text-text-dark text-sm leading-snug">{item.label}</span>
                  </div>
                )
              })}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group"
            >
              {t.home.aboutLink}
              <ArrowLeft aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-card bg-primary overflow-hidden border border-border-dark/50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Scale aria-hidden="true" className="w-8 h-8 text-accent-gold" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-text-light/80 text-sm font-heading font-semibold">{t.site.fullName}</p>
                    <p className="text-text-muted/60 text-xs">{t.footer.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-accent-gold/20 rounded-card -z-10" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent-gold/10 rounded-card -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
