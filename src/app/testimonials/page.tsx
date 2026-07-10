import { prisma } from "@/lib/prisma"
import type { TestimonialData } from "@/types/prisma-models"
import { Metadata } from "next"
import Link from "next/link"
import { Star } from "lucide-react"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.testimonials.title,
    description: t.testimonials.description,
  }
}

export default async function TestimonialsPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  let testimonials: TestimonialData[] = []
  try {
    const rawTestimonials = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    })
    testimonials = rawTestimonials as TestimonialData[]
  } catch {
    console.warn("Database unavailable for testimonials page, showing empty state")
  }

  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.testimonials.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.testimonials.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.testimonials.description}</p>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              <p>{t.testimonials.noTestimonials}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-border p-6 shadow-card hover-lift transition-all">
                  {item.rating && (
                    <div className="flex items-center gap-1 mb-4" dir="ltr">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < item.rating! ? "text-accent-gold fill-accent-gold" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-text-muted leading-[1.8] mb-6">&ldquo;{item.content}&rdquo;</p>
                  <div>
                    <p className="font-heading font-bold text-primary">{item.name}</p>
                    {item.role && <p className="text-sm text-text-muted">{item.role}</p>}
                    {item.source && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-accent-gold/5 text-accent-gold border border-accent-gold/15 font-medium mt-1.5">
                        {item.source}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
