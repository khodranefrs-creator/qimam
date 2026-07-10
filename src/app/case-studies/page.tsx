import { prisma } from "@/lib/prisma"
import type { CaseStudyData } from "@/types/prisma-models"
import { Metadata } from "next"
import Link from "next/link"
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.caseStudies.title,
    description: t.caseStudies.description,
  }
}

export default async function CaseStudiesPage() {
  const locale = await getLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  let caseStudies: CaseStudyData[] = []
  try {
    const rawCaseStudies = await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
    caseStudies = rawCaseStudies as CaseStudyData[]
  } catch {
    console.warn("Database unavailable for case studies page, showing empty state")
  }

  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.caseStudies.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.caseStudies.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.caseStudies.description}</p>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              <p>{t.caseStudies.noStudies}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((cs) => (
                <Link key={cs.id} href={`/case-studies/${cs.slug}`} className="group">
                  <div className="bg-white rounded-xl border border-border overflow-hidden shadow-card hover-lift transition-all">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-48 sm:h-auto bg-gray-200 flex items-center justify-center text-text-muted shrink-0">
                        {cs.coverImage ? (
                          <img src={cs.coverImage} alt={cs.title} className="w-full h-full object-cover" />
                        ) : (
                          <span>{t.common.noData}</span>
                        )}
                      </div>
                      <div className="p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(cs.createdAt).toLocaleDateString(locale)}</span>
                            {cs.category && (
                              <span className="px-2 py-0.5 bg-accent-gold/10 text-accent-gold rounded-full">{cs.category}</span>
                            )}
                          </div>
                          <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-accent-gold transition-colors">{cs.title}</h3>
                          <p className="text-sm text-text-muted leading-[1.7]">{cs.excerpt?.substring(0, 150)}...</p>
                          {cs.outcomeSummary && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-xs text-green-700 font-bold mb-1">{t.caseStudies.outcome}:</p>
                              <p className="text-sm text-green-600">{cs.outcomeSummary}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-accent-gold text-sm font-medium group-hover:gap-2 transition-all">
                          <span>{t.caseStudies.readStudy}</span>
                          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
