import { Metadata } from "next"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "./contact-form"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.contact.title,
    description: t.contact.description,
  }
}

export default async function ContactPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.contact.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.contact.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.contact.description}</p>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-panel border border-border p-6 shadow-subtle text-center hover-lift transition-all">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">{t.contact.addressTitle}</h3>
              <p className="text-text-muted text-sm leading-[1.7]">{t.contact.address}</p>
            </div>

            <div className="bg-white rounded-panel border border-border p-6 shadow-subtle text-center hover-lift transition-all">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">{t.contact.phoneTitle}</h3>
              <p className="text-text-muted text-sm" dir="ltr">{t.common.phone}</p>
            </div>

            <div className="bg-white rounded-panel border border-border p-6 shadow-subtle text-center hover-lift transition-all">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">{t.contact.emailLabel}</h3>
              <p className="text-text-muted text-sm">{t.common.email}</p>
            </div>

            <div className="bg-white rounded-panel border border-border p-6 shadow-subtle text-center hover-lift transition-all">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">{t.contact.workingHours}</h3>
              <p className="text-text-muted text-sm">{t.contact.satThu}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ContactForm />
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.5!2d39.8!3d21.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI0JzAwLjAiTiAzOcKwNDgnMDAuMCJF!5e0!3m2!1sar!2ssa!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.site.fullName}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
