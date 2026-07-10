import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export const dynamic = 'force-dynamic'

type Params = Promise<{ slug: string }>

async function getPracticeArea(slug: string) {
  try {
    return await prisma.practiceArea.findUnique({
      where: { slug, published: true },
    })
  } catch {
    console.warn("Database unavailable for practice area detail")
    return null
  }
}

async function getRelatedFaqs() {
  try {
    return await prisma.faq.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      take: 5,
    })
  } catch {
    console.warn("Database unavailable for related FAQs")
    return []
  }
}

export async function generateStaticParams() {
  try {
    const areas = await prisma.practiceArea.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return areas.map((a) => ({ slug: a.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const { slug } = await params
    const locale = await getLocale()
    const t = getTranslations(locale)
    const area = await prisma.practiceArea.findUnique({ where: { slug } })
    if (!area) return {}

    return {
      title: area.metaTitle || `${area.title} | ${t.site.fullName}`,
      description: area.metaDescription || `${t.practiceAreas.description} — ${area.title}.`,
      ...(area.ogImage && {
        openGraph: { images: [{ url: area.ogImage }] },
        twitter: { images: [area.ogImage] },
      }),
    }
  } catch {
    return {}
  }
}

export default async function PracticeAreaPage({ params }: { params: Params }) {
  const { slug } = await params
  const locale = await getLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  const area = await getPracticeArea(slug)
  if (!area) notFound()

  const faqs = await getRelatedFaqs()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${area.title} — ${t.site.fullName}`,
    description: area.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/practice-areas/${slug}`,
    provider: {
      "@type": "Organization",
      name: t.site.fullName,
      address: {
        "@type": "PostalAddress",
        streetAddress: "شارع النسيم العام",
        addressLocality: "مكة المكرمة",
        addressRegion: "مكة المكرمة",
        postalCode: "24221",
        addressCountry: "SA",
      },
      telephone: "+966565555437",
    },
    areaServed: "SA",
    serviceType: area.title,
    ...(faqs.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: t.faq.title,
        itemListElement: faqs.map((f, i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: f.question,
            description: f.answer,
          },
          position: i + 1,
        })),
      },
    }),
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted text-muted-on-dark">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <Link href="/practice-areas" className="hover:text-accent-gold transition-colors">{t.practiceAreas.title}</Link>
            <span>/</span>
            <span className="text-accent-gold">{area.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-1 text-text-muted text-muted-on-dark hover:text-accent-gold text-sm transition-colors mb-6"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {t.practiceAreas.backToAreas}
            </Link>
            <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-6">{area.title}</h1>
            <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mb-8" />
            <p className="text-lg leading-[1.8] text-text-muted text-muted-on-dark">{area.description}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {area.content ? (
              <div className="prose prose-lg max-w-none">
                {area.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="leading-[1.9] mb-6 text-text-dark">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-center py-12">{t.practiceAreas.contentComingSoon}</p>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-10 rounded-2xl bg-secondary border border-border/60">
              <h2 className="text-2xl font-heading font-bold mb-6 text-center">{t.practiceAreas.whyChooseTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  t.practiceAreas.checklist1,
                  t.practiceAreas.checklist2,
                  t.practiceAreas.checklist3,
                  t.practiceAreas.checklist4,
                  t.practiceAreas.checklist5,
                  t.practiceAreas.checklist6,
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0" />
                    <span className="text-text-dark text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-center mb-10">{t.faq.title}</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.id}
                    className="group bg-white rounded-card border border-border/60 shadow-sm overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer text-text-dark font-medium hover:text-accent-gold transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <span>{faq.question}</span>
                      <span className="text-accent-gold transition-transform duration-300 group-open:rotate-180 shrink-0 mr-2">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 1.5L6 6.5L11 1.5" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-text-muted text-sm leading-relaxed border-t border-border/40 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1 text-accent-gold text-sm font-medium hover:text-accent-gold-light transition-colors"
                >
                  {t.practiceAreas.viewAllFaqs}
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-heading font-bold mb-6">{t.practiceAreas.ctaAreaTitle} {area.title}؟</h2>
          <p className="text-text-muted text-muted-on-dark mb-8">{t.practiceAreas.ctaAreaDesc}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/consultation">
                  <Button variant="primary" size="lg">{t.nav.consultation}</Button>
            </Link>
            <a href="https://wa.me/966565555437" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                <MessageCircle className="w-4 h-4" />
                {t.common.contactWhatsapp}
              </Button>
            </a>
            <a href="tel:+966565555437">
              <Button variant="ghost" size="lg">
                <Phone className="w-4 h-4" />
                +966 56 555 5437
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
