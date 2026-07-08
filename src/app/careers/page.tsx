import { Metadata } from "next"
import Link from "next/link"
import { CareerForm } from "./career-form"

export const metadata: Metadata = {
  title: "الوظائف",
  description: "انضم إلى فريق شركة قمم اليقين للمحاماة والاستشارات القانونية",
}

export default function CareersPage() {
  return (
    <div>
      <div className="bg-primary text-text-light py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">الرئيسية</Link>
            <span>/</span>
            <span className="text-accent-gold">الوظائف</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">انضم إلى فريقنا</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">نبحث دائماً عن الكفاءات القانونية والإدارية المتميزة للانضمام إلى فريق شركة قمم اليقين</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareerForm />
        </div>
      </section>
    </div>
  )
}
