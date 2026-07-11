import type { Locale } from '@/i18n/config'
import { MessageCircle } from 'lucide-react'
import { getTranslations } from '@/i18n/get-translations'

export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)
  const whatsappText = locale === 'ar' ? 'مرحباً، أرغب بالاستفسار عن خدماتكم القانونية' : 'Hello, I would like to inquire about your legal services'

  return (
    <a
      href={`https://wa.me/966565555437?text=${encodeURIComponent(whatsappText)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 lg:bottom-6 right-8 z-40 w-14 h-14 rounded-full bg-accent-gold text-primary shadow-raised hover:bg-accent-gold/90 transition-colors duration-300 flex items-center justify-center focus-ring-gold before:absolute before:inset-0 before:rounded-full before:border-2 before:border-accent-gold/30 before:animate-pulse-ring"
      aria-label={t.common.contactWhatsapp}
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
