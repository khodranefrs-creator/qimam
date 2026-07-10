'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const highlights = [
  { key: 'aboutHighlight1' },
  { key: 'aboutHighlight2' },
  { key: 'aboutHighlight3' },
  { key: 'aboutHighlight4' },
]

export function AboutTeaser() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <h2 className="text-3xl md:text-[2.5rem] font-heading font-bold text-text-dark leading-[1.12] mb-6 text-balance">
              {t.home.aboutTitle}
            </h2>
            <p className="text-text-muted leading-[1.9] mb-8 max-w-xl text-base md:text-[1.0625rem]">
              {t.home.aboutDesc}
            </p>
            <div className="space-y-3 mb-9">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/3] relative">
              {/* Front panel — photo-ready area */}
              <div className="absolute inset-0 z-10 rounded-card overflow-hidden border border-border-dark/50 bg-primary-light/80">
                {/* Replace with <Image /> when a photo is available */}
                <div className="w-full h-full" />
              </div>

              {/* Back panel — decorative SVG, horizontally offset to peek from behind */}
              <div className={`absolute inset-0 z-0 rounded-card overflow-hidden bg-primary border border-border-dark/50 ${isRtl ? 'translate-x-7' : '-translate-x-7'}`}>
                <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="aboutGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="0.75" fill="#C6A15B" fillOpacity="0.04" />
                  </pattern>
                </defs>
                <rect width="800" height="600" fill="url(#aboutGrid)" />

                <line x1="90" y1="80" x2="90" y2="520" stroke="#C6A15B" strokeOpacity="0.06" strokeWidth="1" />
                <line x1="105" y1="100" x2="105" y2="500" stroke="#C6A15B" strokeOpacity="0.03" strokeWidth="0.5" />
                <rect x="78" y="75" width="24" height="8" rx="2" stroke="#C6A15B" strokeOpacity="0.1" strokeWidth="0.75" fill="none" />
                <rect x="78" y="517" width="24" height="8" rx="2" stroke="#C6A15B" strokeOpacity="0.1" strokeWidth="0.75" fill="none" />

                <line x1="710" y1="80" x2="710" y2="520" stroke="#C6A15B" strokeOpacity="0.06" strokeWidth="1" />
                <line x1="695" y1="100" x2="695" y2="500" stroke="#C6A15B" strokeOpacity="0.03" strokeWidth="0.5" />
                <rect x="698" y="75" width="24" height="8" rx="2" stroke="#C6A15B" strokeOpacity="0.1" strokeWidth="0.75" fill="none" />
                <rect x="698" y="517" width="24" height="8" rx="2" stroke="#C6A15B" strokeOpacity="0.1" strokeWidth="0.75" fill="none" />

                <circle cx="400" cy="280" r="155" stroke="#C6A15B" strokeOpacity="0.06" strokeWidth="0.75" />
                <circle cx="400" cy="280" r="145" stroke="#C6A15B" strokeOpacity="0.1" strokeWidth="0.75" />
                <circle cx="400" cy="280" r="135" stroke="#C6A15B" strokeOpacity="0.18" strokeWidth="0.75" />

                <g fill="#C6A15B" fillOpacity="0.25">
                  <circle cx="400" cy="145" r="2" />
                  <circle cx="467.5" cy="162.5" r="2" />
                  <circle cx="517" cy="202" r="2" />
                  <circle cx="535" cy="280" r="2" />
                  <circle cx="517" cy="358" r="2" />
                  <circle cx="467.5" cy="397.5" r="2" />
                  <circle cx="400" cy="415" r="2" />
                  <circle cx="332.5" cy="397.5" r="2" />
                  <circle cx="283" cy="358" r="2" />
                  <circle cx="265" cy="280" r="2" />
                  <circle cx="283" cy="202" r="2" />
                  <circle cx="332.5" cy="162.5" r="2" />
                </g>

                <path d="M 340 130 Q 400 100 460 130" stroke="#C6A15B" strokeOpacity="0.15" strokeWidth="0.75" strokeLinecap="round" />
                <polygon points="400,90 406,100 400,110 394,100" stroke="#C6A15B" strokeOpacity="0.25" strokeWidth="0.75" strokeLinejoin="round" fill="none" />

                <g stroke="#C6A15B" strokeOpacity="0.4" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="400" y1="220" x2="400" y2="285" />
                  <path d="M 393 285 Q 400 292 407 285" />
                  <line x1="335" y1="235" x2="465" y2="235" />
                  <circle cx="400" cy="235" r="3" fill="#C6A15B" fillOpacity="0.4" />
                  <line x1="335" y1="235" x2="322" y2="275" strokeOpacity="0.35" />
                  <line x1="335" y1="235" x2="348" y2="275" strokeOpacity="0.35" />
                  <line x1="465" y1="235" x2="452" y2="275" strokeOpacity="0.35" />
                  <line x1="465" y1="235" x2="478" y2="275" strokeOpacity="0.35" />
                  <path d="M 312 275 Q 335 292 358 275" strokeOpacity="0.4" />
                  <path d="M 442 275 Q 465 292 488 275" strokeOpacity="0.4" />
                </g>

                <line x1="180" y1="460" x2="620" y2="460" stroke="#C6A15B" strokeOpacity="0.05" strokeWidth="0.5" strokeLinecap="round" />
                <rect x="175" y="456" width="10" height="8" rx="1" stroke="#C6A15B" strokeOpacity="0.08" strokeWidth="0.5" fill="none" />
                <rect x="615" y="456" width="10" height="8" rx="1" stroke="#C6A15B" strokeOpacity="0.08" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
