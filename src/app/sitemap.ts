export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma"
import { MetadataRoute } from "next"

const locales = ["ar", "en"] as const

function localize(url: string, baseUrl: string, locale: string): string {
  const path = url.replace(baseUrl, "")
  return `${baseUrl}/${locale}${path === "" ? "" : path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qimam-lilac.vercel.app"

  const staticPaths = [
    "", "/about", "/blog", "/testimonials", "/faq", "/contact",
    "/careers", "/privacy-policy", "/terms-of-service", "/case-studies",
    "/services", "/lawyer", "/practice-areas", "/consultation",
  ]

  const staticRoutes: MetadataRoute.Sitemap = []
  for (const locale of locales) {
    for (const path of staticPaths) {
      staticRoutes.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "/blog" ? "weekly" as const : "monthly" as const,
        priority: path === "" ? 1.0 : 0.8,
      })
    }
  }

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

    for (const locale of locales) {
      blogRoutes.push(...posts.map((post) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })))

      caseStudyRoutes.push(...caseStudies.map((cs) => ({
        url: `${baseUrl}/${locale}/case-studies/${cs.slug}`,
        lastModified: cs.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })))

      practiceAreaRoutes.push(...practiceAreas.map((pa) => ({
        url: `${baseUrl}/${locale}/practice-areas/${pa.slug}`,
        lastModified: pa.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })))
    }
  } catch {
    console.warn("Failed to fetch dynamic routes for sitemap")
  }

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes, ...practiceAreaRoutes]
}
