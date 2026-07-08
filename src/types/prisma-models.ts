export interface BlogPostData {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  coverImage: string | null
  category: string | null
  tags: unknown
  author: string | null
  readingTime: number | null
  metaTitle: string | null
  metaDescription: string | null
  ogImage: string | null
  published: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CaseStudyData {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  outcomeSummary: string | null
  coverImage: string | null
  category: string | null
  metaTitle: string | null
  metaDescription: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FaqData {
  id: string
  question: string
  answer: string
  category: string | null
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TestimonialData {
  id: string
  name: string
  role: string | null
  content: string
  rating: number | null
  source: string | null
  sourceUrl: string | null
  featured: boolean
  approved: boolean
  createdAt: Date
  updatedAt: Date
}
