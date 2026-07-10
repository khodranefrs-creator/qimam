import type { Metadata } from "next"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.consultation.title,
    description: t.consultation.description,
  }
}

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return children
}
