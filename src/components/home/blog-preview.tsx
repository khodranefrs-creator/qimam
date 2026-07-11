import type { Locale } from '@/i18n/config'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { getTranslations } from '@/i18n/get-translations'

interface BlogPreviewPost {
  slug: string
  title: string
  excerpt?: string | null
  coverImage?: string | null
  readingTime?: number | null
  createdAt: string | Date
}

interface Props {
  posts: BlogPreviewPost[]
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '…'
}

function formatDate(date: string | Date, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogPreview({ posts, locale }: Props & { locale: Locale }) {
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <div
          className="animate-fade-up-sm mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark leading-[1.15]">
            {t.home.blogTitle}
          </h2>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post, idx) => (
            <div key={post.slug} className="animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-surface border border-border/60 hover:border-accent-gold/30 hover:shadow-raised transition-all duration-300 hover-lift overflow-hidden"
              >
                <div className="h-[200px] bg-border rounded-t-card flex items-center justify-center overflow-hidden relative">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-text-muted/40 text-sm">{t.home.articleImage}</span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-text-muted text-xs">{formatDate(post.createdAt, locale)}</span>
                    {post.readingTime && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-accent-gold bg-accent-gold/5 px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} {t.blog.readTime}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-semibold text-text-dark mb-2 group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {truncate(post.excerpt ?? '', 100)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div
          className="animate-fade-in text-center mt-10 md:mt-12"
          style={{ animationDelay: '0.3s' }}
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group">
            <span>{t.home.blogLink}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>
    </section>
  )
}
