'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Navigation, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

interface ContactItem {
  icon: typeof MapPin
  titleKey: string
  value?: string
  href?: string
  isAddress?: boolean
  isHours?: boolean
}

const contactItems: ContactItem[] = [
  { icon: MapPin, titleKey: 'addressTitle', isAddress: true },
  { icon: Phone, titleKey: 'phoneTitle', value: '+966 56 555 5437', href: 'tel:+966565555437' },
  { icon: Mail, titleKey: 'email', value: 'info@qimamlaw.com', href: 'mailto:info@qimamlaw.com' },
  { icon: Clock, titleKey: 'workingHours', isHours: true },
]

export function ContactOfficeSection() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-secondary overflow-hidden">
      <div className="container-custom py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          <div>
            <Link
              href="https://maps.google.com/?q=Qimam+Al-Yaqin+Law+Firm+Makkah"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary-light/5 border border-border-dark/30 overflow-hidden group"
            >
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors duration-500 ring-1 ring-accent-gold/[0.08]">
                  <MapPin aria-hidden="true" className="w-7 h-7 text-accent-gold" />
                </div>
                <span className="text-text-muted text-sm">{t.footer.mapPlaceholder}</span>
                <span className="inline-flex items-center gap-1.5 text-accent-gold text-xs font-medium">
                  <Navigation aria-hidden="true" className="w-3.5 h-3.5" />
                  {t.footer.getDirections}
                </span>
              </div>
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-3">
                {t.contact.infoTitle}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">
                {t.contact.infoDesc}
              </p>
            </div>

            <div className="space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon
                if (item.isAddress) {
                  return (
                    <div key={item.titleKey} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon aria-hidden="true" className="w-4 h-4 text-accent-gold" />
                      </div>
                      <div>
                        <h4 className="text-sm font-heading font-semibold text-text-dark mb-0.5">
                          {t.contact[item.titleKey as keyof typeof t.contact] as string}
                        </h4>
                        <p className="text-text-muted text-sm">{t.footer.address}</p>
                        <p className="text-text-muted/60 text-xs mt-0.5">{t.contact.addressDetail}</p>
                      </div>
                    </div>
                  )
                }
                if (item.isHours) {
                  return (
                    <div key={item.titleKey} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon aria-hidden="true" className="w-4 h-4 text-accent-gold" />
                      </div>
                      <div>
                        <h4 className="text-sm font-heading font-semibold text-text-dark mb-2">
                          {t.contact[item.titleKey as keyof typeof t.contact] as string}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-text-muted text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 shrink-0" />
                            <span>{t.contact.daySunThu}</span>
                            <span className="text-text-muted/50">—</span>
                            <span>{t.contact.timeSunThu}</span>
                          </div>
                          <div className="flex items-center gap-2 text-text-muted text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 shrink-0" />
                            <span>{t.contact.dayFri}</span>
                            <span className="text-text-muted/50">—</span>
                            <span>{t.contact.timeFri}</span>
                          </div>
                          <div className="flex items-center gap-2 text-text-muted text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 shrink-0" />
                            <span>{t.contact.daySat}</span>
                            <span className="text-text-muted/50">—</span>
                            <span>{t.contact.timeSat}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={item.titleKey} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon aria-hidden="true" className="w-4 h-4 text-accent-gold" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-semibold text-text-dark mb-0.5">
                        {t.contact[item.titleKey as keyof typeof t.contact] as string}
                      </h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                          dir="ltr"
                        >
                          {item.value}
                        </a>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-text-muted/60 text-xs leading-relaxed max-w-sm border-t border-border/60 pt-6">
              {t.home.contactDesc}
            </p>
            <div className="pt-4">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group text-sm"
              >
                <span>{t.home.finalCTACta}</span>
                {isRtl ? (
                  <ArrowLeft aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
