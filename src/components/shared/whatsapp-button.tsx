'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export default function WhatsAppButton() {
  const locale = useLocale()
  const t = getTranslations(locale)
  const whatsappText = locale === 'ar' ? 'مرحباً، أرغب بالاستفسار عن خدماتكم القانونية' : 'Hello, I would like to inquire about your legal services'

  return (
    <motion.a
      href={`https://wa.me/966565555437?text=${encodeURIComponent(whatsappText)}`}
      target="_blank"
      rel="noopener noreferrer"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className="fixed bottom-28 lg:bottom-6 right-8 z-40 w-14 h-14 rounded-full bg-accent-gold text-primary shadow-raised hover:bg-accent-gold/90 transition-all duration-300 flex items-center justify-center focus-ring-gold before:absolute before:inset-0 before:rounded-full before:border-2 before:border-accent-gold/30 before:animate-pulse-ring"
      aria-label={t.common.contactWhatsapp}
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  )
}
