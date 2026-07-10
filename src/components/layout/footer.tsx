'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const footerAreaLinks = [
  { href: '/practice-areas/commercial-law', areaKey: 'commercial' },
  { href: '/practice-areas/corporate-law', areaKey: 'corporate' },
  { href: '/practice-areas/litigation', areaKey: 'litigation' },
  { href: '/practice-areas/real-estate-law', areaKey: 'realEstate' },
  { href: '/practice-areas/family-law', areaKey: 'family' },
  { href: '/practice-areas/inheritance-law', areaKey: 'inheritance' },
] as const

const footerCompanyLinks = [
  { href: '/about', labelKey: 'nav.about' },
  { href: '/lawyer', labelKey: 'nav.lawyer' },
  { href: '/careers', labelKey: 'careers.title' },
  { href: '/contact', labelKey: 'nav.contact' },
] as const

const socialLinks = [
  {
    href: 'https://x.com/qemmalyaqin',
    label: 'x' as const,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/966565555437',
    label: 'whatsapp' as const,
    icon: () => <MessageCircle className="w-4 h-4" />,
  },
]

export default function Footer() {
  const locale = useLocale()
  const t = getTranslations(locale)
  const currentYear = new Date().getFullYear()

  const dd = t.nav.practiceAreasDropDown as unknown as Record<string, { label: string; desc: string }>
  const areaKeyOrder = ['commercial', 'corporate', 'litigation', 'realEstate', 'family', 'inheritance'] as const

  function resolveLabel(key: string): string {
    const [section, ...rest] = key.split('.')
    const s = t as unknown as Record<string, Record<string, string>>
    return rest.reduce((acc: Record<string, string> | string, k: string) => {
      if (typeof acc === 'object' && acc !== null) return (acc as Record<string, string>)[k]
      return acc
    }, s[section]) as string
  }

  return (
    <footer className="bg-primary border-t border-accent-gold/20">
      <div className="container-custom py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link href="/" className="block mb-4">
              <Image
                src="/logo.png"
                alt={t.common.firmName}
                width={69}
                height={70}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-text-muted text-muted-on-dark text-sm leading-relaxed mb-6 max-w-xs">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-text-light/20 text-text-muted text-muted-on-dark hover:text-accent-gold hover:border-accent-gold/50 transition-all duration-300"
                    aria-label={t.footer[social.label]}
                  >
                    <SocialIcon />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-text-light font-semibold text-sm mb-5">
              {t.footer.practiceAreas}
            </h3>
            <ul className="space-y-3">
              {footerAreaLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-muted-on-dark text-sm hover:text-accent-gold transition-colors duration-200"
                  >
                    {dd[areaKeyOrder[i]]?.label || ''}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/practice-areas"
                  className="text-accent-gold/80 text-sm hover:text-accent-gold transition-colors duration-200 inline-flex items-center gap-1"
                >
                  {t.nav.viewAllAreas}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-text-light font-semibold text-sm mb-5">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-muted-on-dark text-sm hover:text-accent-gold transition-colors duration-200"
                  >
                    {resolveLabel(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-text-light font-semibold text-sm mb-5">
              {t.nav.contactUs}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                <span className="text-text-muted text-muted-on-dark text-sm leading-relaxed">
                  {t.contact.address}، {t.footer.country}
                </span>
              </div>
              <a
                href="tel:+966565555437"
                className="flex items-center gap-3 text-text-muted text-muted-on-dark text-sm hover:text-accent-gold transition-colors duration-200"
                dir="ltr"
              >
                <Phone aria-hidden="true" className="w-4 h-4 text-accent-gold shrink-0" />
                {t.footer.phone}
              </a>
              <a
                href="mailto:info@qimamlaw.com"
                className="flex items-center gap-3 text-text-muted text-muted-on-dark text-sm hover:text-accent-gold transition-colors duration-200"
                dir="ltr"
              >
                <Mail aria-hidden="true" className="w-4 h-4 text-accent-gold shrink-0" />
                {t.footer.email}
              </a>

              <div className="pt-2 border-t border-border-dark/30">
                <div className="flex items-center gap-3 mb-3">
                  <Clock aria-hidden="true" className="w-4 h-4 text-accent-gold shrink-0" />
                  <span className="text-text-muted text-muted-on-dark text-xs font-medium">{t.contact.workingHours}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-text-muted text-muted-on-dark text-xs" dir="ltr">
                    <span className="w-1 h-1 rounded-full bg-accent-gold/40 shrink-0" />
                    <span>{t.contact.daySunThu}</span>
                    <span className="text-border-dark/40">—</span>
                    <span dir="ltr">{t.contact.timeSunThu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted text-muted-on-dark text-xs" dir="ltr">
                    <span className="w-1 h-1 rounded-full bg-accent-gold/40 shrink-0" />
                    <span>{t.contact.dayFri}</span>
                    <span className="text-border-dark/40">—</span>
                    <span dir="ltr">{t.contact.timeFri}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted text-muted-on-dark text-xs" dir="ltr">
                    <span className="w-1 h-1 rounded-full bg-accent-gold/40 shrink-0" />
                    <span>{t.contact.daySat}</span>
                    <span className="text-border-dark/40">—</span>
                    <span dir="ltr">{t.contact.timeSat}</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Qimam+Al-Yaqin+Law+Firm+Makkah"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative w-full aspect-[16/7] rounded-xl overflow-hidden bg-gradient-to-br from-primary-light/30 to-primary-light/10 border border-border-dark/30 mt-1"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px, 20px 20px',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin aria-hidden="true" className="w-4 h-4 text-accent-gold" />
                    <span className="text-text-muted text-muted-on-dark text-[11px] font-medium">{t.footer.mapPlaceholder}</span>
                  </div>
                  <span className="flex items-center gap-1 text-accent-gold/70 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Navigation aria-hidden="true" className="w-3 h-3" />
                    {t.footer.getDirections}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border-dark/50">
        <div className="container-custom py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <p className="text-xs text-text-muted text-muted-on-dark">
              &copy; {currentYear} {t.common.firmName}. {t.footer.copyright}
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/privacy-policy"
                className="text-text-muted text-muted-on-dark hover:text-accent-gold transition-colors duration-200"
              >
                {t.footer.privacy}
              </Link>
              <span className="text-border-dark/50">|</span>
              <Link
                href="/terms-of-service"
                className="text-text-muted text-muted-on-dark hover:text-accent-gold transition-colors duration-200"
              >
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
