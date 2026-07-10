import { prisma } from "@/lib/prisma"
import type { BlogPostData } from "@/types/prisma-models"
import Link from "next/link"
import { Metadata } from "next"
import { Calendar, Clock } from "lucide-react"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.blog.title,
    description: t.blog.description,
  }
}

function formatReadingTime(minutes: number | null, locale: string, t: ReturnType<typeof getTranslations>): string {
  if (!minutes) return ""
  if (minutes < 1) return t.blog.lessThanMin
  return `${minutes} ${t.blog.readTime}`
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; q?: string }>
}) {
  const locale = await getLocale()
  const t = getTranslations(locale)
  const { page: pageStr, category, q: searchQuery } = await searchParams
  const currentPage = Math.max(1, Number(pageStr) || 1)
  const perPage = 9

  const where: { published: boolean; category?: string; title?: { contains: string; mode: "insensitive" } } = { published: true }
  if (category) where.category = category
  if (searchQuery) where.title = { contains: searchQuery, mode: "insensitive" }

  let posts: BlogPostData[] = []
  let total = 0
  let categoryList: string[] = []
  try {
    const [rawPosts, totalCount, rawCategories] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * perPage,
        take: perPage,
      }),
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where: { published: true, category: { not: null } },
        select: { category: true },
        distinct: ["category"],
      }),
    ])
    posts = rawPosts as BlogPostData[]
    total = totalCount
    categoryList = [...new Set((rawCategories as { category: string | null }[]).map((c) => c.category).filter(Boolean))] as string[]
  } catch {
    console.warn("Database unavailable for blog page, showing empty state")
  }
  const totalPages = Math.ceil(total / perPage)

  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.blog.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.blog.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.blog.description}</p>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <form method="GET" className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery || ""}
                  placeholder={t.blog.searchPlaceholder}
                  className="w-full px-4 py-3 ps-10 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark placeholder:text-text-muted"
                />
                <button type="submit" aria-label={t.blog.searchPlaceholder} className="absolute end-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent-gold transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </form>
          </div>

          {categoryList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm transition-colors border ${
                  !category ? "bg-accent-gold text-primary border-accent-gold" : "bg-white text-text-muted border-border hover:border-accent-gold"
                }`}
              >
                {t.blog.all}
              </Link>
              {categoryList.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full text-sm transition-colors border ${
                    category === cat ? "bg-accent-gold text-primary border-accent-gold" : "bg-white text-text-muted border-border hover:border-accent-gold"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              <p>{t.blog.noPosts}</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <div className="bg-white rounded-panel border border-border overflow-hidden shadow-subtle hover-lift transition-all">
                      <div className="h-48 bg-gray-200 flex items-center justify-center text-text-muted">
                        {post.coverImage ? (
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <span>{t.home.articleImage}</span>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.createdAt).toLocaleDateString(locale)}
                          </span>
                          {post.readingTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatReadingTime(post.readingTime, locale, t)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-accent-gold transition-colors">{post.title}</h3>
                        <p className="text-sm text-text-muted leading-[1.7]">{post.excerpt?.substring(0, 120)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}${category ? `&category=${encodeURIComponent(category)}` : ""}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
                      className="px-4 py-2 bg-white border border-border rounded-xl text-sm hover:border-accent-gold transition-colors"
                    >
                      {t.blog.prev}
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/blog?page=${p}${category ? `&category=${encodeURIComponent(category)}` : ""}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm transition-colors ${
                        p === currentPage
                          ? "bg-accent-gold text-primary"
                          : "bg-white border border-border hover:border-accent-gold"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
                      className="px-4 py-2 bg-white border border-border rounded-xl text-sm hover:border-accent-gold transition-colors"
                    >
                      {t.blog.next}
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
