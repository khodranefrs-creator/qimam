'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function ContactStrip() {
  const locale = useLocale()
  const t = getTranslations(locale)

  return (
    <section className="bg-secondary border-t border-border/80">
      <div className="container-custom py-14 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <h3 className="font-heading font-bold text-text-dark text-lg mb-5 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent-gold" />
              {t.home.contactTitle}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-text-dark text-sm font-medium">مكة المكرمة</p>
                  <p className="text-text-muted text-sm">حي العوالي، طريق الموحدين</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                <a href="tel:966565555437" className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200 ltr:text-left rtl:text-right" dir="ltr">
                  {t.common.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                <a href="mailto:info@qimam-law.com" className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200" dir="ltr">
                  {t.common.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-text-dark text-lg mb-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-gold" />
              {t.contact.workingHours}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-dark text-sm">الأحد – الخميس</span>
                <span className="text-text-muted text-sm" dir="ltr">٩:٠٠ ص – ٩:٠٠ م</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-dark text-sm">الجمعة</span>
                <span className="text-text-muted text-sm">مغلق</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-dark text-sm">السبت</span>
                <span className="text-text-muted text-sm" dir="ltr">٤:٠٠ م – ٩:٠٠ م</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-text-dark text-lg mb-5 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent-gold" />
              {t.footer.mapPlaceholder}
            </h3>
            <Link
              href="https://maps.google.com/?q=Qimam+Al-Yaqin+Law+Firm+Makkah"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-[120px] bg-border rounded-card hover:bg-border/80 transition-colors duration-200 overflow-hidden relative"
            >
              <div className="w-full h-full flex items-center justify-center flex-col gap-2">
                <MapPin className="w-6 h-6 text-accent-gold/60" />
                <span className="text-text-muted/50 text-xs">{t.footer.mapPlaceholder}</span>
              </div>
            </Link>
            <Link
              href="https://maps.google.com/?q=Qimam+Al-Yaqin+Law+Firm+Makkah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-accent-gold text-sm font-medium hover:text-accent-gold-light transition-colors duration-200"
            >
              <MapPin className="w-4 h-4" />
              {t.footer.getDirections}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
