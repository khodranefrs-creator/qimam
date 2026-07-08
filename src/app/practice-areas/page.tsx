import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Search, ArrowLeft, Briefcase, Building2, Scale, Home, Heart, BookOpen, Gavel, FileText, Users, Shield, Handshake, Lightbulb, DollarSign, MessageSquare, Stamp } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "مجالات الممارسة القانونية",
  description: "مجالات خبرتنا القانونية في مكة المكرمة — القانون التجاري، قانون الشركات، التقاضي، القانون العقاري، الأحوال الشخصية، المواريث، وأكثر.",
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Scale, Briefcase, Home, Heart, BookOpen, Gavel, FileText, Users, Shield, Handshake, Lightbulb, DollarSign, MessageSquare, Stamp,
}

async function getPracticeAreas() {
  return prisma.practiceArea.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  })
}

export default async function PracticeAreasPage() {
  const areas = await getPracticeAreas()

  return (
    <div>
      <div className="bg-primary text-text-light py-4">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">الرئيسية</Link>
            <span>/</span>
            <span className="text-accent-gold">مجالات الممارسة</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-6">مجالات الممارسة القانونية</h1>
            <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-8" />
            <p className="text-lg leading-[1.8] text-text-muted">
              نقدم مجموعة شاملة من الخدمات القانونية في مختلف التخصصات لتلبية احتياجات عملائنا في مكة المكرمة وجميع مناطق المملكة العربية السعودية.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="relative max-w-md mx-auto mb-12">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="ابحث في مجالات الممارسة..."
              className="w-full h-12 bg-white border border-border/60 rounded-[8px] pr-12 pl-4 text-text-dark placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-all shadow-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {areas.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-text-muted">لا توجد مجالات ممارسة منشورة حاليًا.</p>
              </div>
            )}
            {areas.map((area) => {
              const Icon = area.icon && iconMap[area.icon] ? iconMap[area.icon] : Briefcase
              return (
                <Link
                  key={area.id}
                  href={`/practice-areas/${area.slug}`}
                  className="group block p-6 bg-white rounded-card border border-border/60 hover:border-accent-gold/30 hover:shadow-gold transition-all duration-300 hover-lift"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-dark mb-2 group-hover:text-accent-gold transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{area.description}</p>
                  {area.content && (
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <span className="text-accent-gold text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        اقرأ المزيد
                        <ArrowLeft className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-heading font-bold mb-6">لم تجد مجال تخصصك؟</h2>
          <p className="text-text-muted mb-8">نحن نغطي مجموعة واسعة من التخصصات القانونية، تواصل معنا لاستشارة مخصصة</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/consultation">
              <Button variant="primary" size="lg">احجز استشارة مجانية</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">تواصل معنا</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
