'use client'

import Link from "next/link"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qimam-lilac.vercel.app"

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const id = item.href ? `${siteUrl}${item.href}` : undefined
      return {
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        ...(id ? { item: id } : {}),
      }
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center gap-2 text-sm text-text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-accent-gold transition-colors">{item.label}</Link>
              ) : (
                <span className={isLast ? "text-accent-gold" : ""}>{item.label}</span>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}
