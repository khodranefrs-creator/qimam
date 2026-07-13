import { prisma } from "@/lib/prisma"
import { Suspense } from "react"
import { Hero } from "@/components/home/hero"
import { AboutTeaser } from "@/components/home/about-teaser"
import { WhyQimam } from "@/components/home/why-qimam"
import { LawyerTeaser } from "@/components/home/lawyer-teaser"
import { PracticeAreasGrid } from "@/components/home/practice-areas-grid"
import { ProcessTimeline } from "@/components/home/process-timeline"
import TestimonialsSlider from "@/components/home/testimonials-slider"
import { BlogPreview } from "@/components/home/blog-preview"
import { FaqPreview } from "@/components/home/faq-preview"
import { FinalCTASection } from "@/components/home/final-cta"

import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'
import type { Locale } from '@/i18n/config'
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

async function PracticeAreasSection({ locale }: { locale: Locale }) {
  let areas: Awaited<ReturnType<typeof prisma.practiceArea.findMany>> = []
  try {
    areas = await prisma.practiceArea.findMany({ where: { published: true }, orderBy: { order: 'asc' } })
  } catch {}
  return <PracticeAreasGrid areas={areas} locale={locale} />
}

async function TestimonialsSection({ locale }: { locale: Locale }) {
  let testimonials: Awaited<ReturnType<typeof prisma.testimonial.findMany>> = []
  try {
    testimonials = await prisma.testimonial.findMany({ where: { approved: true, featured: true } })
  } catch {}
  if (testimonials.length > 0) return <TestimonialsSlider testimonials={testimonials} locale={locale} />
  return null
}

async function BlogSection({ locale }: { locale: Locale }) {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = []
  try {
    posts = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 3 })
  } catch {}
  if (posts.length > 0) return <BlogPreview posts={posts} locale={locale} />
  return null
}

async function FaqSection({ locale }: { locale: Locale }) {
  let faqs: Awaited<ReturnType<typeof prisma.faq.findMany>> = []
  try {
    faqs = await prisma.faq.findMany({ where: { published: true }, orderBy: { order: 'asc' }, take: 5 })
  } catch {}
  if (faqs.length > 0) return <FaqPreview faqs={faqs} locale={locale} />
  return null
}

export default async function HomePage() {
  const locale = await getLocale()

  return (
    <>
      <Hero locale={locale} />
      <AboutTeaser locale={locale} />
      <LawyerTeaser locale={locale} />
      <FinalCTASection locale={locale} />
      <Suspense fallback={<PracticeAreasGrid areas={[]} locale={locale} />}>
        <PracticeAreasSection locale={locale} />
      </Suspense>
      <ProcessTimeline locale={locale} />
      <WhyQimam locale={locale} />
      <Suspense fallback={null}>
        <TestimonialsSection locale={locale} />
      </Suspense>
      <Suspense fallback={null}>
        <BlogSection locale={locale} />
      </Suspense>
      <Suspense fallback={null}>
        <FaqSection locale={locale} />
      </Suspense>
    </>
  )
}
