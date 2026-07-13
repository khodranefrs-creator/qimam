import type { Locale } from '@/i18n/config'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { getTranslations } from '@/i18n/get-translations'

const highlights = [
  { key: 'aboutHighlight1' },
  { key: 'aboutHighlight2' },
  { key: 'aboutHighlight3' },
  { key: 'aboutHighlight4' },
]

export function AboutTeaser({ locale }: { locale: Locale }) {
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 max-lg:gap-8 lg:gap-20 items-center">
          <div
            className={isRtl ? 'animate-fade-in-left' : 'animate-fade-in-right'}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark leading-[1.15] mb-6 text-balance">
              {t.home.aboutTitle}
            </h2>
            <p className="text-text-muted leading-[1.9] mb-8 max-w-xl text-base md:text-[1.0625rem]">
              {t.home.aboutDesc}
            </p>
            <div className="space-y-3 mb-0 lg:mb-9">
              {highlights.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <Check aria-hidden="true" className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                  <span className="text-text-dark text-sm md:text-base">
                    {t.home[item.key as keyof typeof t.home] as string}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group"
            >
              {t.home.aboutLink}
              {isRtl ? (
                <ArrowLeft aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ) : (
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </Link>
          </div>

          <div
            className={`relative ${isRtl ? 'animate-fade-in-right' : 'animate-fade-in-left'}`}
            style={{ animationDelay: '0.15s' }}
          >
            <div className="aspect-[5/2] lg:aspect-[4/3] relative">
              {/* Front panel — centered logo on solid navy */}
              <div className="absolute inset-0 z-10 rounded-card overflow-hidden border border-border-dark/20 bg-primary flex items-center justify-center">
                <Image src="/mainlogo.png" alt={t.common.qimam} width={400} height={300} className="w-[85%] lg:w-3/5 h-auto max-h-[85%] lg:max-h-[40%] object-contain" />
              </div>

              {/* Back panel — solid navy, same as front, for unified surface */}
              <div className={`absolute inset-0 z-0 rounded-card overflow-hidden bg-primary border border-border-dark/20 ${isRtl ? 'translate-x-7' : '-translate-x-7'}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
