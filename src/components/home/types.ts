export interface PracticeArea { id: string; slug: string; title: string; description: string; icon?: string }
export type PracticeAreaItem = PracticeArea
export interface Testimonial { id: string; name: string; content: string; rating: number; source?: string }
export interface TestimonialItem { id: string; name: string; role?: string | null; content: string; rating?: number | null; source?: string | null }
export interface BlogPost { id: string; slug: string; title: string; excerpt?: string; coverImage?: string; readingTime?: string; createdAt: Date }
export interface BlogPostItem { id: string; slug: string; title: string; excerpt?: string | null; coverImage?: string | null; readingTime?: number | null; createdAt: string | Date }
export interface FaqItem { id: string; question: string; answer: string; category?: string }
