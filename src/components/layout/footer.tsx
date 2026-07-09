'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const footerQuickLinks = [
  { href: '/' },
  { href: '/about' },
  { href: '/lawyer' },
  { href: '/practice-areas' },
  { href: '/services' },
  { href: '/case-studies' },
  { href: '/testimonials' },
  { href: '/blog' },
  { href: '/faq' },
  { href: '/careers' },
  { href: '/contact' },
] as const

const footerAreaLinks = [
  { href: '/practice-areas/commercial-law' },
  { href: '/practice-areas/corporate-law' },
  { href: '/practice-areas/litigation' },
  { href: '/practice-areas/real-estate-law' },
  { href: '/practice-areas/family-law' },
  { href: '/practice-areas/inheritance-law' },
] as const

const socialLinks = [
  {
    href: 'https://x.com/qemmalyaqin',
    label: 'x',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/966565555437',
    label: 'whatsapp',
    icon: () => <MessageCircle className="w-5 h-5" />,
  },
]

export default function Footer() {
  const locale = useLocale()
  const t = getTranslations(locale)
  const currentYear = new Date().getFullYear()

  const dd = t.nav.practiceAreasDropDown as unknown as Record<string, { label: string; desc: string }>
  const areaKeyOrder = ['commercial', 'corporate', 'litigation', 'realEstate', 'family', 'inheritance'] as const

  const navLabelMap: Record<string, string> = {
    '/': t.nav.home,
    '/about': t.nav.about,
    '/lawyer': t.nav.lawyer,
    '/practice-areas': t.nav.practiceAreas,
    '/services': t.nav.services,
    '/case-studies': t.caseStudies.title,
    '/testimonials': t.testimonials.title,
    '/blog': t.nav.blog,
    '/faq': t.nav.faq,
    '/careers': t.careers.title,
    '/contact': t.nav.contact,
  }

  return (
    <footer className="bg-primary border-t border-accent-gold/20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <Link href="/" className="block mb-4">
              <Image
                src="/logo.png"
                alt={t.common.firmName}
              width={69}
              height={70}
              className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-accent-gold font-heading text-sm mb-4">
              {t.site.tagline}
            </p>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              {t.site.fullName} — {t.footer.description}
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
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-text-light/20 text-text-muted hover:text-accent-gold hover:border-accent-gold/50 transition-all duration-300"
                    aria-label={t.footer[social.label as keyof typeof t.footer]}
                  >
                    <SocialIcon />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-text-light font-semibold text-sm mb-5">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                  >
                    {navLabelMap[link.href]}
                  </Link>
                </li>
              ))}
            </ul>
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
                    className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                  >
                    {dd[areaKeyOrder[i]]?.label || ''}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/practice-areas"
                  className="text-accent-gold text-sm hover:text-accent-gold-light transition-colors duration-200 inline-flex items-center gap-1"
                >
                  {t.nav.viewAllAreas}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-text-light font-semibold text-sm mb-5">
              {t.nav.contactUs}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                <span className="text-text-muted text-sm leading-relaxed">
                  {t.footer.address}
                </span>
              </li>
              <li>
                <a
                  href="tel:+966565555437"
                  className="flex items-center gap-3 text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                >
                  <Phone aria-hidden="true" className="w-4 h-4 text-accent-gold shrink-0" />
                  {t.footer.phone}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/966565555437"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                >
                  <MessageCircle aria-hidden="true" className="w-4 h-4 text-accent-gold shrink-0" />
                  {t.footer.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@qimamlaw.com"
                  className="flex items-center gap-3 text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                >
                  <Mail aria-hidden="true" className="w-4 h-4 text-accent-gold shrink-0" />
                  {t.footer.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock aria-hidden="true" className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                <div>
                  <span className="text-text-muted text-sm block">{t.footer.workingHours}</span>
                  <span className="text-text-light/80 text-sm">
                    {t.footer.satThu}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border-dark/50">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span>
                &copy; {currentYear} {t.common.firmName}. {t.footer.copyright}
              </span>
              <Link
                href="/privacy-policy"
                className="hover:text-accent-gold transition-colors duration-200"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-accent-gold transition-colors duration-200"
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
