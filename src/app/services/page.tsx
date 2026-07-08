import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {
  MessageSquare, FileEdit, Scale, Stamp, Handshake, ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "الخدمات القانونية",
  description: "خدمات قانونية احترافية في مكة المكرمة — استشارات، صياغة عقود، تمثيل قانوني، توثيق معتمد، تحكيم تجاري.",
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare, FileEdit, Scale, Stamp, Handshake,
}

async function getServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div>
      <div className="bg-primary text-text-light py-4">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">الرئيسية</Link>
            <span>/</span>
            <span className="text-accent-gold">الخدمات</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-6">خدماتنا القانونية</h1>
            <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-8" />
            <p className="text-lg leading-[1.8] text-text-muted">
              نقدم مجموعة متكاملة من الخدمات القانونية التي تلبي احتياجات الأفراد والشركات في مكة المكرمة وجميع مناطق المملكة.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-text-muted">لا توجد خدمات منشورة حاليًا.</p>
              </div>
            )}
            {services.map((service) => {
              const Icon = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Scale
              return (
                <div
                  key={service.id}
                  className="group p-6 bg-white rounded-card border border-border/60 hover:border-accent-gold/30 hover:shadow-gold transition-all duration-300 hover-lift"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-dark mb-2 text-lg">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  {service.content && (
                    <div className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.content}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-heading font-bold mb-6">هل تبحث عن خدمة قانونية محددة؟</h2>
          <p className="text-text-muted mb-8">تواصل معنا وسنقدم لك الحل القانوني المناسب</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/consultation">
              <Button variant="primary" size="lg">اطلب الخدمة الآن</Button>
            </Link>
            <Link href="/practice-areas">
              <Button variant="secondary" size="lg">
                مجالات الممارسة
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
