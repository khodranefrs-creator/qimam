import { prisma } from "@/lib/prisma"
import type { BlogPostData } from "@/types/prisma-models"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { ShareButtons } from "@/components/blog/share-buttons"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export const dynamic = 'force-dynamic'

function formatReadingTime(minutes: number | null, t: ReturnType<typeof getTranslations>): string {
  if (!minutes) return ""
  if (minutes < 1) return t.blog.lessThanMin
  return `${minutes} ${t.blog.readTime}`
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return (posts as { slug: string }[]).map((post) => ({ slug: post.slug }))
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
    const post = await prisma.blogPost.findUnique({ where: { slug } })
    if (!post) return {}
    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || "",
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt || "",
        ...(post.ogImage || post.coverImage ? { images: [{ url: post.ogImage || post.coverImage! }] } : {}),
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()
  const t = getTranslations(locale)
  let post: BlogPostData | null = null
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } }) as BlogPostData | null
  } catch {
    console.warn("Database unavailable for blog post")
  }
  if (!post || !post.published) notFound()

  let relatedPosts: BlogPostData[] = []
  try {
    relatedPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        id: { not: post.id },
        ...(post.category ? { category: post.category } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    }) as BlogPostData[]
  } catch {
    console.warn("Database unavailable for related blog posts")
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const postUrl = `${siteUrl}/blog/${post.slug}`

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || post.ogImage,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author || t.site.fullName,
    },
    publisher: {
      "@type": "Organization",
      name: t.site.fullName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  }

  return (
    <article>
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-accent-gold transition-colors">{t.blog.title}</Link>
            <span>/</span>
            <span className="text-accent-gold truncate">{post.title}</span>
          </div>
        </div>
      </div>

      <div className="bg-primary text-text-light pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.coverImage && (
            <div className="rounded-xl overflow-hidden mb-8 shadow-warm">
              <img src={post.coverImage} alt={post.title} loading="lazy" className="w-full h-64 md:h-96 object-cover" />
            </div>
          )}

          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8">
            {post.author && (
              <span className="flex items-center gap-1">
                <span className="w-6 h-6 bg-accent-gold/20 rounded-full flex items-center justify-center text-xs text-accent-gold font-bold">
                  {post.author.charAt(0)}
                </span>
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatReadingTime(post.readingTime, t)}
              </span>
            )}
            {post.category && (
              <Link
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full text-xs hover:bg-accent-gold/20 transition-colors"
              >
                {post.category}
              </Link>
            )}
          </div>

          <ShareButtons url={postUrl} title={post.title} />
        </div>
      </div>

      <section className="section-padding bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-panel border border-border p-8 md:p-12 shadow-subtle">
            <div
              className="prose prose-lg max-w-none text-text-dark leading-[1.9]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-bold leading-[1.15] text-primary mb-8">{t.blog.relatedPosts}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                    <div className="bg-white rounded-panel border border-border overflow-hidden shadow-subtle hover-lift transition-all">
                      <div className="h-36 bg-gray-200 flex items-center justify-center text-text-muted text-sm">
                        {rp.coverImage ? (
                          <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover" />
                        ) : (
                          <span>{t.common.noData}</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-sm group-hover:text-accent-gold transition-colors line-clamp-2">{rp.title}</h3>
                        <p className="text-xs text-text-muted mt-2">{new Date(rp.createdAt).toLocaleDateString(locale)}</p>
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
