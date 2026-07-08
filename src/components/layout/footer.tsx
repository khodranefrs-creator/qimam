'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

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
    href: 'https://x.com/qemmalyaqin',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
            <Link href="/" className="block mb-4">
              <Image
                src="/logo.png"
                alt="شركة قمم اليقين للمحاماة والاستشارات القانونية"
                width={160}
                height={44}
                className="h-10 w-auto object-contain"
              />
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
