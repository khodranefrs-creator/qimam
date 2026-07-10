'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowLeft, ArrowRight, Briefcase, Building2, Scale, Home, Heart, BookOpen, Gavel, FileText, Users, Shield, Handshake, Lightbulb, DollarSign, MessageSquare, Stamp } from 'lucide-react'
import type { PracticeArea } from '@prisma/client'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Scale, Briefcase, Home, Heart, BookOpen, Gavel, FileText, Users, Shield, Handshake, Lightbulb, DollarSign, MessageSquare, Stamp,
}

interface Props {
  areas: Pick<PracticeArea, 'id' | 'slug' | 'title' | 'description' | 'icon' | 'content'>[]
}

export function PracticeAreasClient({ areas }: Props) {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  const [query, setQuery] = useState('')

  const filtered = query
    ? areas.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase())
      )
    : areas

  return (
    <>
      <div className="relative max-w-md mx-auto mb-12">
        <div className="absolute end-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.practiceAreas.searchPlaceholder}
          className="w-full h-12 bg-white border border-border/60 rounded-[8px] ps-12 pe-4 text-text-dark placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-all shadow-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-text-muted">{t.practiceAreas.noAreas}</p>
          </div>
        ) : (
          filtered.map((area) => {
            const Icon = area.icon && iconMap[area.icon] ? iconMap[area.icon] : Briefcase
            return (
              <Link
                key={area.id}
                href={`/practice-areas/${area.slug}`}
                className="group block p-6 bg-white rounded-card border border-border/60 hover:border-accent-gold/30 hover:shadow-gold transition-all duration-300 hover-lift"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-accent-gold" />
                </div>
                <h3 className="font-heading font-semibold text-text-dark mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{area.description}</p>
                {area.content && (
                  <div className="mt-3 pt-3 border-t border-border/40">
                    <span className="text-accent-gold text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t.common.readMore}
                      {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </span>
                  </div>
                )}
              </Link>
            )
          })
        )}
      </div>
    </>
  )
}