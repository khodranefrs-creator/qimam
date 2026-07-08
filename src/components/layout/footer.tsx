'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const quickLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'المحامي', href: '/lawyer' },
  { label: 'مجالات الممارسة', href: '/practice-areas' },
  { label: 'الخدمات', href: '/services' },
  { label: 'المدونة', href: '/blog' },
  { label: 'الأسئلة الشائعة', href: '/faq' },
  { label: 'تواصل معنا', href: '/contact' },
]

const practiceAreaLinks = [
  { label: 'القانون التجاري', href: '/practice-areas/commercial-law' },
  { label: 'قانون الشركات وتأسيسها', href: '/practice-areas/corporate-law' },
  { label: 'التقاضي والمرافعات', href: '/practice-areas/litigation' },
  { label: 'القانون العقاري', href: '/practice-areas/real-estate-law' },
  { label: 'الأحوال الشخصية', href: '/practice-areas/family-law' },
  { label: 'المواريث والوصايا', href: '/practice-areas/inheritance-law' },
]

const socialLinks = [
  {
    label: 'X',
    href: 'https://x.com/qimamlaw',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@qimamlaw',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/qimamlaw',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'واتساب',
    href: 'https://wa.me/966565555437',
    icon: () => <MessageCircle className="w-5 h-5" />,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary border-t border-accent-gold/20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <span className="text-accent-gold text-2xl leading-none group-hover:scale-110 transition-transform duration-300">
                ◆
              </span>
              <span className="font-heading text-xl font-bold text-text-light group-hover:text-accent-gold transition-colors duration-300">
                قمم اليقين
              </span>
            </Link>
            <p className="text-accent-gold font-heading text-sm mb-4">
              الثقة أساس التميز
            </p>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              شركة قمم اليقين للمحاماة والاستشارات القانونية — خبرة قانونية رفيعة في
              مكة المكرمة. نقدم حلولاً قانونية متكاملة في القضايا التجارية والمدنية
              والجزائية.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-text-light/20 text-text-muted hover:text-accent-gold hover:border-accent-gold/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <SocialIcon />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-text-light font-semibold text-sm mb-5">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-text-light font-semibold text-sm mb-5">
              مجالات الممارسة
            </h3>
            <ul className="space-y-3">
              {practiceAreaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/practice-areas"
                  className="text-accent-gold text-sm hover:text-accent-gold-light transition-colors duration-200 inline-flex items-center gap-1"
                >
                  عرض الكل ←
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-text-light font-semibold text-sm mb-5">
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                <span className="text-text-muted text-sm leading-relaxed">
                  شارع النسيم العام، حي النسيم، مكة المكرمة
                </span>
              </li>
              <li>
                <a
                  href="tel:+966565555437"
                  className="flex items-center gap-3 text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                  +966 56 555 5437
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/966565555437?text=مرحباً، أرغب بالاستفسار عن خدماتكم القانونية"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4 text-accent-gold shrink-0" />
                  واتساب
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@qimamlaw.com"
                  className="flex items-center gap-3 text-text-muted text-sm hover:text-accent-gold transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                  info@qimamlaw.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                <div>
                  <span className="text-text-muted text-sm block">أوقات العمل</span>
                  <span className="text-text-light/80 text-sm">
                    السبت - الخميس: 9:00 صباحاً - 9:00 مساءً
                  </span>
                </div>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=شارع+النسيم+العام+مكة+المكرمة"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 group"
                >
                  <div className="w-full h-24 bg-primary-light rounded-card border border-border-dark/50 flex items-center justify-center text-text-muted text-xs group-hover:border-accent-gold/50 group-hover:text-accent-gold transition-all duration-300">
                    عرض الموقع على الخريطة
                  </div>
                </a>
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
                © {currentYear} شركة قمم اليقين للمحاماة. جميع الحقوق محفوظة.
              </span>
              <Link
                href="/privacy-policy"
                className="hover:text-accent-gold transition-colors duration-200"
              >
                الخصوصية
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-accent-gold transition-colors duration-200"
              >
                الشروط
              </Link>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 lg:w-56 px-4 py-2.5 bg-primary-light border border-border-dark/50 rounded-[8px] text-text-light text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent-gold/50 transition-colors"
              />
              <button className="px-4 py-2.5 bg-accent-gold text-primary font-semibold text-sm rounded-[8px] hover:bg-accent-gold/90 transition-all duration-300 shrink-0">
                اشتراك
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
