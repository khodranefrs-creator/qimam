'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Building2, Scale, Briefcase, Home, Heart, BookOpen, Gavel, FileText, Landmark, Users, Shield } from 'lucide-react'
import type { PracticeArea } from '@prisma/client'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'
import { EyebrowTag } from '@/components/ui/eyebrow-tag'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Scale, Briefcase, Home, Heart, BookOpen, Gavel, FileText, Landmark, Users, Shield,
}

const categoryColors: Record<string, string> = {
  'commercial': 'from-blue-900/20 to-blue-900/5',
  'corporate': 'from-indigo-900/20 to-indigo-900/5',
  'litigation': 'from-amber-900/20 to-amber-900/5',
  'realEstate': 'from-emerald-900/20 to-emerald-900/5',
  'family': 'from-rose-900/20 to-rose-900/5',
  'inheritance': 'from-purple-900/20 to-purple-900/5',
}

interface Props {
  areas: Pick<PracticeArea, 'id' | 'slug' | 'title' | 'description' | 'icon'>[]
}

export function PracticeAreasGrid({ areas }: Props) {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  const pa = t.practiceAreas as unknown as Record<string, { title: string; desc: string }>
  const areaKeys = ['commercial', 'corporate', 'litigation', 'realEstate', 'family', 'inheritance'] as const
  const areaSlugs: Record<string, string> = {
    commercial: 'commercial-law',
    corporate: 'corporate-law',
    litigation: 'litigation',
    realEstate: 'real-estate-law',
    family: 'family-law',
    inheritance: 'inheritance-law',
  }
  const defaultAreas = areas.length > 0 ? areas : areaKeys.map((key) => ({
    id: key,
    slug: areaSlugs[key] || `${key}-law`,
    title: pa[key]?.title || key,
    description: pa[key]?.desc || '',
    icon: key === 'commercial' ? 'Briefcase' : key === 'corporate' ? 'Building2' : key === 'litigation' ? 'Scale' : key === 'realEstate' ? 'Home' : key === 'family' ? 'Heart' : 'BookOpen',
  }))

  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="flex justify-center mb-4">
            <EyebrowTag label={t.nav.practiceAreas} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark leading-[1.15] mb-4 text-balance">
            {t.home.practiceAreasTitle}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t.home.practiceAreasDesc}
          </p>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:snap-none">
          {defaultAreas.map((area, i) => {
            const Icon = area.icon && iconMap[area.icon] ? iconMap[area.icon] : Briefcase
            const areaKey = areaKeys[i] || 'commercial'
            const gradientClass = categoryColors[areaKey] || 'from-primary-light/20 to-primary-light/5'
            return (
              <motion.div
                key={area.id}
                className="flex flex-col min-w-[80vw] sm:min-w-0 snap-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="group flex flex-col h-full bg-white rounded-surface border border-border/60 hover:border-accent-gold/30 hover:shadow-raised transition-all duration-300 hover-lift overflow-hidden"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${gradientClass}`} />
                  <div className="p-5 md:p-7 flex flex-col flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-control bg-accent-gold/10 flex items-center justify-center mb-5 group-hover:bg-accent-gold/20 transition-all duration-300">
                      <Icon aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent-gold" />
                    </div>
                    <h3 className="font-heading font-semibold text-text-dark mb-3 text-xl group-hover:text-accent-gold transition-colors duration-300">
                      {area.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-[1.8] grow">{area.description}</p>
                    <div className="mt-auto flex items-center gap-1.5 text-accent-gold text-xs font-medium">
                      <span>{t.nav.viewAll}</span>
                      {isRtl ? (
                        <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 md:mt-12"
        >
          <Link
            href="/practice-areas"
            className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group"
          >
            {t.nav.viewAllAreas}
            {isRtl ? (
              <ArrowLeft aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
