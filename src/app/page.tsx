import { prisma } from "@/lib/prisma"
import { Hero } from "@/components/home/hero"
import { StatsBar } from "@/components/home/stats-bar"
import { AboutTeaser } from "@/components/home/about-teaser"
import { WhyQimam } from "@/components/home/why-qimam"
import { LawyerTeaser } from "@/components/home/lawyer-teaser"
import { PracticeAreasGrid } from "@/components/home/practice-areas-grid"
import { ProcessTimeline } from "@/components/home/process-timeline"
import TestimonialsSlider from "@/components/home/testimonials-slider"
import { CtaBanner } from "@/components/home/cta-banner"
import { BlogPreview } from "@/components/home/blog-preview"
import { FaqPreview } from "@/components/home/faq-preview"
import { ContactStrip } from "@/components/home/contact-strip"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'
import type { Metadata } from "next"

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.home.heroTitle,
    description: `${t.site.fullName} — ${t.home.heroDesc}`,
  }
}

async function getHomeData() {
  try {
    const [practiceAreas, testimonials, posts, faqs] = await Promise.all([
      prisma.practiceArea.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
      prisma.testimonial.findMany({ where: { approved: true, featured: true } }),
      prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
      prisma.faq.findMany({ where: { published: true }, orderBy: { order: 'asc' }, take: 5 }),
    ])
    return { practiceAreas, testimonials, posts, faqs }
  } catch {
    console.warn("Failed to fetch homepage data, using empty fallback")
    return { practiceAreas: [], testimonials: [], posts: [], faqs: [] }
  }
}

export default async function HomePage() {
  const { practiceAreas, testimonials, posts, faqs } = await getHomeData()

  return (
    <>
      <Hero />
      <StatsBar />
      <AboutTeaser />
      <WhyQimam />
      <LawyerTeaser />
      <PracticeAreasGrid areas={practiceAreas} />
      <ProcessTimeline />
      <TestimonialsSlider testimonials={testimonials} />
      <CtaBanner />
      <BlogPreview posts={posts} />
      <FaqPreview faqs={faqs} />
      <ContactStrip />
    </>
  )
}
