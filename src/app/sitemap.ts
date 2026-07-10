export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qimam-lilac.vercel.app"

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/testimonials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/lawyer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/practice-areas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/consultation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ]

  let blogRoutes: MetadataRoute.Sitemap = []
  let caseStudyRoutes: MetadataRoute.Sitemap = []
  let practiceAreaRoutes: MetadataRoute.Sitemap = []

  try {
    const [posts, caseStudies, practiceAreas] = await Promise.all([
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.caseStudy.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.practiceArea.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ])

    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    caseStudyRoutes = caseStudies.map((cs) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: cs.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    practiceAreaRoutes = practiceAreas.map((pa) => ({
      url: `${baseUrl}/practice-areas/${pa.slug}`,
      lastModified: pa.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  } catch {
    console.warn("Failed to fetch dynamic routes for sitemap")
  }

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes, ...practiceAreaRoutes]
}
