"use client"

import { useState } from "react"
import { Share2, MessageCircle, Mail } from "lucide-react"
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const locale = useLocale()
  const t = getTranslations(locale)
  const [copied, setCopied] = useState(false)
  const shareText = `${title} - ${t.site.fullName}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-muted">{t.common.share}</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-accent-gold/10 rounded-full flex items-center justify-center text-accent-gold hover:bg-accent-gold/20 transition-colors"
        aria-label={t.blog.shareOnWhatsapp}
      >
        <MessageCircle className="w-4 h-4" />
      </a>
      <a
        href={`https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-accent-gold/10 rounded-full flex items-center justify-center text-accent-gold hover:bg-accent-gold/20 transition-colors"
        aria-label={t.blog.shareOnX}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(url)}`}
        className="w-9 h-9 bg-accent-gold/10 rounded-full flex items-center justify-center text-accent-gold hover:bg-accent-gold/20 transition-colors"
        aria-label={t.common.share}
      >
        <Mail className="w-4 h-4" />
      </a>
      <button
        onClick={copyLink}
        className="relative w-9 h-9 bg-accent-gold/10 rounded-full flex items-center justify-center text-accent-gold hover:bg-accent-gold/20 transition-colors"
        aria-label={t.blog.copyLink}
      >
        <Share2 className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-text-light text-xs px-2 py-1 rounded whitespace-nowrap">
            {t.common.copied}
          </span>
        )}
      </button>
    </div>
  )
}
