'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Award, BookOpen, Scale, BadgeCheck } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function LawyerTeaser() {
  const locale = useLocale()
  const t = getTranslations(locale)

  return (
    <section className="bg-primary section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-[3/4] rounded-card bg-primary-light overflow-hidden border border-border-dark/50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-heading font-bold text-accent-gold">ع</span>
                  </div>
                  <p className="text-text-light/60 text-sm">صورة المحامي</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent-gold/60" />
              <span className="text-accent-gold text-sm font-medium">{t.nav.lawyer}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-2">
              {t.home.lawyerName}
            </h2>
            <p className="text-accent-gold font-medium mb-6">{t.home.lawyerRole}</p>
            <p className="text-text-muted leading-relaxed mb-8">
              {t.home.lawyerDesc}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Award, label: 'محامي مرخص' },
                { icon: BadgeCheck, label: 'موثّق معتمد' },
                { icon: BookOpen, label: 'خبرة ١٢+ سنة' },
                { icon: Scale, label: 'ترافع في المحاكم' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-accent-gold shrink-0" />
                    <span className="text-text-muted text-sm">{item.label}</span>
                  </div>
                )
              })}
            </div>
            <Link href="/lawyer" className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200">
              {t.home.lawyerLink}
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
