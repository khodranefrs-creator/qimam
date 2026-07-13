import type { Locale } from '@/i18n/config'
import Link from 'next/link'
import { MapPin, Phone, Navigation } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import { getTranslations } from '@/i18n/get-translations'

function ContactRow({ icon: Icon, children }: { icon: ComponentType<{ className?: string }>; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 flex items-center justify-center shrink-0">
        <Icon aria-hidden="true" className="w-4 h-4 text-accent-gold" />
      </span>
      <span className="text-text-muted text-sm leading-relaxed">{children}</span>
    </div>
  )
}

export function ContactStrip({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)

  return (
    <section className="bg-secondary border-t border-border/80 overflow-hidden">
      <div className="container-custom py-16 md:py-20">
        <div
          className="animate-fade-up grid md:grid-cols-3 gap-10 md:gap-8"
        >
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-text-dark text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-accent-gold rounded-full" />
              {t.home.contactTitle}
            </h3>
            <div className="space-y-4">
              <ContactRow icon={MapPin}>
                <span className="text-text-dark text-sm font-medium">{t.contact.address}</span>
                <span className="text-text-muted text-sm block">{t.contact.addressDetail}</span>
              </ContactRow>
              <ContactRow icon={Phone}>
                <a href="tel:+966565555437" className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200" dir="ltr">
                  {t.common.phone}
                </a>
              </ContactRow>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-heading font-bold text-text-dark text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-accent-gold rounded-full" />
              {t.contact.workingHours}
            </h3>
            <div className="space-y-3">
              {[
                { day: t.contact.daySunThu, time: t.contact.timeSunThu },
                { day: t.contact.dayFri, time: t.contact.timeFri },
                { day: t.contact.daySat, time: t.contact.timeSat },
              ].map((item) => (
                <div key={item.day} className="flex justify-between items-center py-2 px-3 rounded-lg bg-white/40">
                  <span className="text-text-dark text-sm">{item.day}</span>
                  <span className="text-text-muted text-sm">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-heading font-bold text-text-dark text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-accent-gold rounded-full" />
              {t.footer.mapPlaceholder}
            </h3>
            <Link
              href="https://maps.google.com/?q=Qimam+Al-Yaqin+Law+Firm+Makkah"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-[130px] bg-gradient-to-br from-primary-light/10 to-border rounded-card hover:from-primary-light/20 transition-colors duration-200 overflow-hidden relative group"
            >
              <div className="w-full h-full flex items-center justify-center flex-col gap-2">
                <MapPin aria-hidden="true" className="w-6 h-6 text-accent-gold/40 group-hover:text-accent-gold/60 transition-colors duration-200" />
                <span className="text-text-muted/40 text-xs">{t.footer.mapPlaceholder}</span>
              </div>
              <div className="absolute inset-0 border border-border/30 rounded-card pointer-events-none" />
            </Link>
            <Link
              href="https://maps.google.com/?q=Qimam+Al-Yaqin+Law+Firm+Makkah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-gold text-sm font-medium hover:text-accent-gold-light transition-colors duration-200 group"
            >
              <Navigation aria-hidden="true" className="w-4 h-4" />
              {t.footer.getDirections}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
