'use client'

import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export default function StickyConsultBar() {
  const locale = useLocale()
  const t = getTranslations(locale)

  return (
    <div className="fixed bottom-0 right-0 left-0 z-30 bg-primary border-t border-accent-gold/20 lg:hidden">
      <div className="flex items-center gap-2 px-3 py-3">
        <Link
          href="/consultation"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent-gold text-primary font-semibold text-sm rounded-[8px] hover:bg-accent-gold/90 active:bg-accent-gold/80 transition-all duration-300 shadow-gold"
        >
          {t.nav.consultation}
        </Link>
        <a
          href="https://wa.me/966565555437"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-[8px] border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 transition-all duration-300"
          aria-label={t.footer.whatsapp}
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href="tel:+966565555437"
          className="flex items-center justify-center w-12 h-12 rounded-[8px] border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 transition-all duration-300"
          aria-label={t.nav.contactUs}
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}
