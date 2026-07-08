"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils"
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

interface FaqItem {
  id: string
  question: string
  answer: string
  category?: string | null
}

export function FaqClient({
  faqs,
  categories,
}: {
  faqs: FaqItem[]
  categories: string[]
}) {
  const locale = useLocale()
  const t = getTranslations(locale)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openItems, setOpenItems] = useState<string[]>([])

  const filtered = faqs.filter((faq) => {
    const matchesSearch =
      !search ||
      faq.question.includes(search) ||
      faq.answer.includes(search)
    const matchesCategory = !activeCategory || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <div className="relative mb-8">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          placeholder={t.faq.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-12 pl-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark placeholder:text-text-muted"
        />
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-colors border",
              !activeCategory
                ? "bg-accent-gold text-primary border-accent-gold"
                : "bg-white text-text-muted border-border hover:border-accent-gold"
            )}
          >
            {t.faq.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-colors border",
                activeCategory === cat
                  ? "bg-accent-gold text-primary border-accent-gold"
                  : "bg-white text-text-muted border-border hover:border-accent-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          <p>{t.faq.noResults}</p>
        </div>
      ) : (
        <Accordion.Root
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="space-y-3"
        >
          {filtered.map((faq) => (
            <Accordion.Item
              key={faq.id}
              value={faq.id}
              className="bg-white rounded-xl border border-border overflow-hidden shadow-card"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between p-5 text-right font-heading font-bold text-primary hover:text-accent-gold transition-colors group">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-accent-gold shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 pb-5 text-text-muted leading-[1.8] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pt-2 border-t border-border">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      )}
    </>
  )
}
