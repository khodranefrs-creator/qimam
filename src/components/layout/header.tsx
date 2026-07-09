'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Briefcase,
  Building2,
  Scale,
  Home,
  Heart,
  BookOpen,
} from 'lucide-react'
import Image from 'next/image'
import { LocaleSwitcher } from '@/components/shared/locale-switcher'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'
import { cn } from '@/lib/utils'

const megaIcons = {
  Briefcase,
  Building2,
  Scale,
  Home,
  Heart,
  BookOpen,
} as const

type MegaIconKey = keyof typeof megaIcons

interface MegaItem {
  label: string
  href: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavItem {
  label: string
  href: string
  children?: MegaItem[]
}

const areaKeys: { key: MegaIconKey; slug: string }[] = [
  { key: 'Briefcase', slug: '/practice-areas/commercial-law' },
  { key: 'Building2', slug: '/practice-areas/corporate-law' },
  { key: 'Scale', slug: '/practice-areas/litigation' },
  { key: 'Home', slug: '/practice-areas/real-estate-law' },
  { key: 'Heart', slug: '/practice-areas/family-law' },
  { key: 'BookOpen', slug: '/practice-areas/inheritance-law' },
]

export default function Header() {
  const locale = useLocale()
  const t = getTranslations(locale)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const pathname = usePathname()
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleMegaEnter = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current)
    setMegaOpen(true)
  }

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 150)
  }

  const dd = t.nav.practiceAreasDropDown as unknown as Record<string, { label: string; desc: string }>
  const practiceAreaItems: MegaItem[] = areaKeys.map(({ key, slug }) => ({
    label: dd[key]?.label || key,
    href: slug,
    description: dd[key]?.desc || '',
    icon: megaIcons[key],
  }))

  const navItems: NavItem[] = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.lawyer, href: '/lawyer' },
    { label: t.nav.practiceAreas, href: '/practice-areas', children: practiceAreaItems },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.contact, href: '/contact' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass-header'
          : 'bg-gradient-to-b from-black/40 to-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 lg:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <Image
              src="/logo.png"
              alt={t.common.firmName}
              width={138}
              height={140}
              className="h-14 md:h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <div
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-1 px-3.5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 focus-ring-gold',
                        isActive(item.href)
                          ? 'text-accent-gold'
                          : 'text-text-light/80 hover:text-text-light'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-300',
                          megaOpen && 'rotate-180'
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-[640px] bg-primary border border-border-dark/50 rounded-card shadow-2xl shadow-black/30 p-6 grid grid-cols-2 gap-3"
                          onMouseEnter={handleMegaEnter}
                          onMouseLeave={handleMegaLeave}
                        >
                          {item.children.map((child) => {
                            const Icon = child.icon
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                              >
                                <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center shrink-0">
                                  <Icon className="w-5 h-5 text-accent-gold" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-text-light group-hover:text-accent-gold transition-colors duration-200">
                                    {child.label}
                                  </div>
                                  <div className="text-xs text-text-muted mt-0.5 leading-relaxed">
                                    {child.description}
                                  </div>
                                </div>
                              </Link>
                            )
                          })}
                          <Link
                            href="/practice-areas"
                            className="col-span-2 text-center text-sm text-accent-gold hover:text-accent-gold-light transition-colors duration-200 pt-4 border-t border-border-dark/50 mt-2"
                          >
                            {t.nav.viewAllAreas}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-3.5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 focus-ring-gold',
                      isActive(item.href)
                        ? 'text-accent-gold'
                        : 'text-text-light/80 hover:text-text-light'
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-px left-3 right-3 h-0.5 bg-accent-gold rounded-full"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="tel:+966565555437"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-text-light/20 text-text-light/80 hover:text-accent-gold hover:border-accent-gold/50 transition-all duration-300 focus-ring-gold"
              aria-label={t.nav.contactUs}
            >
              <Phone className="w-4 h-4" />
            </a>

            <span className="hidden sm:flex items-center">
              <LocaleSwitcher />
            </span>

            <Link
              href="/consultation"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-accent-gold text-primary font-semibold text-sm rounded-[8px] hover:bg-accent-gold/90 active:bg-accent-gold/80 transition-all duration-300 shadow-gold hover:shadow-[0_4px_25px_rgba(176,141,87,0.35)]"
            >
              {t.nav.consultation}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-text-light focus-ring-gold"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-80 bg-primary border-l border-border-dark/50 z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src="/logo.png"
                    alt={t.common.firmName}
                    width={138}
                    height={140}
                    className="h-14 w-auto object-contain"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-light/60 hover:text-text-light transition-colors focus-ring-gold"
                  aria-label={t.nav.closeMenu}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => !item.children && setMobileOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                        isActive(item.href)
                          ? 'text-accent-gold bg-accent-gold/10'
                          : 'text-text-light/70 hover:text-text-light hover:bg-white/5'
                      )}
                    >
                      {item.label}
                      {item.children && <ChevronDown className="w-4 h-4 shrink-0" />}
                    </Link>
                    {item.children && (
                      <div className="pr-4 mt-1 space-y-1 border-r-2 border-accent-gold/20 mr-2">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text-light/60 hover:text-text-light hover:bg-white/5 transition-colors duration-200"
                            >
                              <ChildIcon className="w-4 h-4 text-accent-gold shrink-0" />
                              {child.label}
                            </Link>
                          )
                        })}
                        <Link
                          href="/practice-areas"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-accent-gold hover:text-accent-gold-light transition-colors duration-200"
                        >
                          {t.nav.viewAll}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3 border-t border-border-dark/50 pt-6">
                <div className="flex justify-center">
                  <LocaleSwitcher />
                </div>
                <Link
                  href="/consultation"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full px-5 py-3 bg-accent-gold text-primary font-semibold text-sm rounded-[8px] hover:bg-accent-gold/90 transition-all duration-300"
                >
                  {t.nav.consultation}
                </Link>
                <a
                  href="tel:+966565555437"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-text-light/20 text-text-light/80 rounded-[8px] text-sm hover:text-accent-gold hover:border-accent-gold/50 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  {t.nav.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
