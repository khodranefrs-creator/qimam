'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
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

export function BlogPreview({ posts }: Props) {
  const locale = useLocale()
  const t = getTranslations(locale)

  if (!posts || posts.length === 0) {
    return (
      <section className="bg-secondary section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent-gold/60" />
              <span className="text-accent-gold text-sm font-medium">{t.nav.blog}</span>
              <span className="w-8 h-px bg-accent-gold/60" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
              {t.home.blogTitle}
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              {t.home.blogDesc}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-lg mx-auto text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-accent-gold/5 border border-accent-gold/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen aria-hidden="true" className="w-7 h-7 text-accent-gold/30" />
            </div>
            <p className="text-text-muted text-sm">{t.blog.noPosts}</p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent-gold/60" />
            <span className="text-accent-gold text-sm font-medium">{t.nav.blog}</span>
            <span className="w-8 h-px bg-accent-gold/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
            {t.home.blogTitle}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t.home.blogDesc}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-card border border-border/60 hover:border-accent-gold/30 hover:shadow-gold transition-all duration-300 hover-lift overflow-hidden"
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200">
            {t.home.blogLink}
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
