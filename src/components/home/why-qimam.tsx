import type { Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/get-translations'

export function WhyQimam({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)

  const pa = t.practiceAreas as unknown as Record<string, string>

  const items = [
    pa.checklist1,
    pa.checklist2,
    pa.checklist3,
    pa.checklist4,
    pa.checklist5,
    pa.checklist6,
  ]

  return (
    <section className="bg-primary section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/15 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-accent-gold/3 blur-[120px] max-md:blur-[60px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-gold/2 blur-[100px] max-md:blur-[50px]" />
      </div>

      <div className="container-custom relative z-10">
        <div
          className="animate-fade-up-sm text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light leading-[1.15] mb-4 text-balance">
            {t.practiceAreas.whyChooseTitle}
          </h2>
          <p className="text-text-muted text-muted-on-dark max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t.home.aboutDesc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="animate-fade-up-sm group relative pt-4 md:pt-5 pb-5 md:pb-6 px-6 md:px-7 rounded-2xl bg-primary-light border border-white/[0.06] hover:border-accent-gold/25 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_0_35px_rgba(198,161,91,0.08)] overflow-hidden"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Left gold accent bar */}
              <div aria-hidden="true" className="absolute start-0 top-2 bottom-2 w-px bg-gradient-to-b from-accent-gold/30 via-accent-gold/10 to-transparent rounded-full group-hover:from-accent-gold/50 transition-opacity duration-500" />

              {/* Top gold accent line */}
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/25 to-transparent" />

              {/* Number badge */}
              <div className="relative z-10 mb-1 md:mb-1.5">
                <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-accent-gold/[0.10] ring-1 ring-accent-gold/25 transition-[background-color,box-shadow] duration-500 group-hover:bg-accent-gold/[0.18] group-hover:ring-accent-gold/40 shadow-[0_0_20px_rgba(198,161,91,0.06)] group-hover:shadow-[0_0_30px_rgba(198,161,91,0.12)]">
                  <span className="text-accent-gold font-heading font-bold text-base md:text-lg leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Text */}
              <p className="text-text-muted text-muted-on-dark text-sm md:text-base font-medium leading-relaxed relative z-10">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
