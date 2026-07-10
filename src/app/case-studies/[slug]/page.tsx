import { prisma } from "@/lib/prisma"
import type { CaseStudyData } from "@/types/prisma-models"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return (caseStudies as { slug: string }[]).map((cs) => ({ slug: cs.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const cs = await prisma.caseStudy.findUnique({ where: { slug } })
    if (!cs) return {}
    return {
      title: cs.metaTitle || cs.title,
      description: cs.metaDescription || cs.excerpt || "",
    }
  } catch {
    return {}
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  let cs: CaseStudyData | null = null
  try {
    cs = await prisma.caseStudy.findUnique({ where: { slug } }) as CaseStudyData | null
  } catch {
    console.warn("Database unavailable for case study detail")
  }
  if (!cs || !cs.published) notFound()

  let relatedCaseStudies: CaseStudyData[] = []
  try {
    relatedCaseStudies = await prisma.caseStudy.findMany({
      where: { published: true, id: { not: cs.id } },
      orderBy: { createdAt: "desc" },
      take: 2,
    }) as CaseStudyData[]
  } catch {
    console.warn("Database unavailable for related case studies")
  }

  return (
    <article>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-accent-gold transition-colors">{t.caseStudies.title}</Link>
            <span>/</span>
            <span className="text-accent-gold truncate">{cs.title}</span>
          </div>
        </div>
      </div>

      <div className="bg-primary text-text-light pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {cs.coverImage && (
            <div className="rounded-xl overflow-hidden mb-8 shadow-warm">
              <img src={cs.coverImage} alt={cs.title} className="w-full h-64 md:h-96 object-cover" />
            </div>
          )}

          <Link href="/case-studies" className="inline-flex items-center gap-1 text-accent-gold hover:text-accent-gold/80 transition-colors mb-6 text-sm">
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.caseStudies.backToStudies}</span>
          </Link>

          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold mb-4">{cs.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(cs.createdAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {cs.category && (
              <span className="px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full text-xs">{cs.category}</span>
            )}
          </div>

          {cs.excerpt && (
            <p className="text-text-muted text-lg leading-[1.8]">{cs.excerpt}</p>
          )}
        </div>
      </div>

      <section className="section-padding bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-border p-8 md:p-12 shadow-card">
            {cs.outcomeSummary && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                <h2 className="font-heading font-bold text-green-800 mb-2">{t.caseStudies.outcome}</h2>
                <p className="text-green-700 leading-[1.7]">{cs.outcomeSummary}</p>
              </div>
            )}

            <div
              className="prose prose-lg max-w-none text-text-dark leading-[1.9]"
              dangerouslySetInnerHTML={{ __html: cs.content }}
            />
          </div>

          {relatedCaseStudies.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-bold text-primary mb-8">{t.caseStudies.title}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedCaseStudies.map((rcs) => (
                  <Link key={rcs.id} href={`/case-studies/${rcs.slug}`} className="group">
                    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-card hover-lift transition-all">
                      <div className="p-6">
                        <h3 className="font-heading font-bold group-hover:text-accent-gold transition-colors">{rcs.title}</h3>
                        <p className="text-sm text-text-muted mt-2 leading-[1.7]">{rcs.excerpt?.substring(0, 120)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  )
}
