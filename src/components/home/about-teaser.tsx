import type { Locale } from '@/i18n/config'
import Link from 'next/link'
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className={isRtl ? 'animate-fade-in-left' : 'animate-fade-in-right'}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark leading-[1.15] mb-6 text-balance">
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
          </div>

          <div
            className={`relative hidden lg:block ${isRtl ? 'animate-fade-in-right' : 'animate-fade-in-left'}`}
            style={{ animationDelay: '0.15s' }}
          >
            <div className="aspect-[4/3] relative">
              {/* Front panel — premium presentation board (replace with <Image fill className="object-cover" /> when office photo is available) */}
              <div className="absolute inset-0 z-10 rounded-card overflow-hidden border border-border-dark/20 bg-gradient-to-br from-primary via-primary-light to-primary">
                {/* Architectural silhouette + lighting overlay */}
                <svg viewBox="0 0 600 450" className="absolute inset-0 w-full h-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <radialGradient id="warmGlow" cx="50%" cy="45%" r="50%">
                      <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.05" />
                      <stop offset="60%" stopColor="#C6A15B" stopOpacity="0.01" />
                      <stop offset="100%" stopColor="#C6A15B" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="65%" stopColor="transparent" />
                      <stop offset="100%" stopColor="#071A2B" stopOpacity="0.3" />
                    </radialGradient>
                  </defs>
                  <rect width="600" height="450" fill="url(#warmGlow)" />
                  <rect width="600" height="450" fill="url(#vignette)" />
                  <g opacity="0.035" stroke="#C6A15B" fill="none" strokeLinecap="round">
                    <path d="M 170 400 Q 170 80 300 80 Q 430 80 430 400" strokeWidth="0.5" />
                    <path d="M 195 400 Q 195 105 300 105 Q 405 105 405 400" strokeWidth="0.25" />
                    <line x1="105" y1="80" x2="105" y2="400" strokeWidth="0.35" />
                    <line x1="495" y1="80" x2="495" y2="400" strokeWidth="0.35" />
                    <line x1="105" y1="355" x2="495" y2="355" strokeWidth="0.3" />
                    <line x1="80" y1="68" x2="520" y2="68" strokeWidth="0.2" />
                    <line x1="80" y1="405" x2="520" y2="405" strokeWidth="0.2" />
                    <circle cx="300" cy="225" r="135" strokeWidth="0.2" />
                    <circle cx="300" cy="225" r="125" strokeWidth="0.12" />
                  </g>
                </svg>
                {/* Logo centerpiece + presentation label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-0">
                    <img src="/logo.png" alt={t.common.qimam} className="h-14 w-auto opacity-90 mb-5" />
                    <div className="w-10 h-px bg-accent-gold/25 mx-auto mb-3" />
                    <p className="text-accent-gold/30 text-[0.625rem] font-heading tracking-[0.2em]">
                      {isRtl ? 'المكتب الرئيسي' : 'Main Office'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Back panel — decorative SVG, horizontally offset to peek from behind */}
              <div className={`absolute inset-0 z-0 rounded-card overflow-hidden bg-primary border border-border-dark/30 ${isRtl ? 'translate-x-7' : '-translate-x-7'}`}>
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
          </div>
        </div>
      </div>
    </section>
  )
}
