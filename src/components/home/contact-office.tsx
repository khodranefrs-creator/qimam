'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
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
            <a
              href="https://maps.google.com/?q=Qimam+Al-Yaqin+Law+Firm+Makkah"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-light/25 to-primary-light/5 border border-border-dark/30 overflow-hidden group shadow-lg shadow-primary-light/5"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px),
                  linear-gradient(135deg, rgba(212,175,55,0.03) 0%, transparent 50%, rgba(212,175,55,0.02) 100%)
                `,
                backgroundSize: '28px 28px, 28px 28px, 100% 100%',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary-light/10 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-accent-gold/15 flex items-center justify-center shadow-lg shadow-accent-gold/10 ring-1 ring-accent-gold/20 group-hover:ring-accent-gold/40 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-accent-gold/15 group-hover:-translate-y-0.5">
                    <MapPin aria-hidden="true" className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-accent-gold/15 ring-1 ring-accent-gold/20" />
                </div>
                <div className="text-center">
                  <span className="text-text-muted text-sm font-medium block">{t.footer.mapPlaceholder}</span>
                  <span className="text-text-muted/50 text-xs block mt-0.5">{t.site.fullName}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-accent-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Navigation aria-hidden="true" className="w-3.5 h-3.5" />
                  {t.footer.getDirections}
                </span>
              </div>
            </a>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-accent-gold/60" />
                <span className="text-accent-gold text-xs font-medium tracking-[0.15em] uppercase">{t.contact.infoTitle}</span>
              </div>
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
                      <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-accent-gold/[0.08]">
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
                      <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-accent-gold/[0.08]">
                        <Icon aria-hidden="true" className="w-4 h-4 text-accent-gold" />
                      </div>
                      <div>
                        <h4 className="text-sm font-heading font-semibold text-text-dark mb-2">
                          {t.contact[item.titleKey as keyof typeof t.contact] as string}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-text-muted text-sm" dir="ltr">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 shrink-0" />
                            <span>{t.contact.daySunThu}</span>
                            <span className="text-text-muted/50">—</span>
                            <span>{t.contact.timeSunThu}</span>
                          </div>
                          <div className="flex items-center gap-2 text-text-muted text-sm" dir="ltr">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 shrink-0" />
                            <span>{t.contact.dayFri}</span>
                            <span className="text-text-muted/50">—</span>
                            <span>{t.contact.timeFri}</span>
                          </div>
                          <div className="flex items-center gap-2 text-text-muted text-sm" dir="ltr">
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
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-accent-gold/[0.08]">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
