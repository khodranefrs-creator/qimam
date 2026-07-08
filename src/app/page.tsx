export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma"
import { Hero } from "@/components/home/hero"
import { StatsBar } from "@/components/home/stats-bar"
import { AboutTeaser } from "@/components/home/about-teaser"
import { LawyerTeaser } from "@/components/home/lawyer-teaser"
import { PracticeAreasGrid } from "@/components/home/practice-areas-grid"
import { ProcessTimeline } from "@/components/home/process-timeline"
import TestimonialsSlider from "@/components/home/testimonials-slider"
import { CtaBanner } from "@/components/home/cta-banner"
import { BlogPreview } from "@/components/home/blog-preview"
import { FaqPreview } from "@/components/home/faq-preview"
import { ContactStrip } from "@/components/home/contact-strip"

export default async function HomePage() {
  const [practiceAreas, testimonials, posts, faqs] = await Promise.all([
    prisma.practiceArea.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
    prisma.testimonial.findMany({ where: { approved: true, featured: true } }),
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.faq.findMany({ where: { published: true }, orderBy: { order: 'asc' }, take: 5 }),
  ])

  return (
    <>
      <Hero />
      <StatsBar />
      <AboutTeaser />
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
