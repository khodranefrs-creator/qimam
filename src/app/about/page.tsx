import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Zap, Users, FileCheck, Scale, Building2, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "من نحن",
  description: "شركة قمم اليقين للمحاماة والاستشارات القانونية — خبرة قانونية رفيعة في مكة المكرمة.",
}

const values = [
  { icon: Shield, title: "المصداقية أولاً", desc: "شفافية كاملة في كل خطوة من خطوات التعامل مع قضيتكم، دون وعود غير واقعية." },
  { icon: Zap, title: "سرعة في الاستجابة والإنجاز", desc: "فريق عمل متجاوب يتعامل مع استفساراتكم وقضاياكم دون تأخير." },
  { icon: Users, title: "خبرة قانونية متعددة التخصصات", desc: "تغطية شاملة لأبرز مجالات الممارسة القانونية تحت سقف واحد." },
  { icon: FileCheck, title: "التوثيق المعتمد داخليًا", desc: "بصفته موثّقًا مرخّصًا، يمنحكم المحامي ماجد السواط ميزة نادرة: صياغة العقد وتوثيقه في مكان واحد." },
]

const highlights = [
  { icon: Scale, label: "محاماة وترافع أمام جميع درجات المحاكم" },
  { icon: Building2, label: "تأسيس الشركات وصياغة العقود" },
  { icon: Gavel, label: "توثيق العقود والمعاملات الشرعية" },
]

export default function AboutPage() {
  return (
    <div>
      <div className="bg-primary text-text-light py-4">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">الرئيسية</Link>
            <span>/</span>
            <span className="text-accent-gold">من نحن</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-6">من نحن</h1>
            <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-8" />
            <p className="text-lg leading-[1.8] text-text-muted">
              شركة قمم اليقين للمحاماة والاستشارات القانونية — حيث تلتقي الخبرة القانونية بالثقة المطلقة.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-[1.8] mb-6">
              شركة قمم اليقين للمحاماة والاستشارات القانونية هي مكتب محاماة سعودي مرخص يقع في مكة المكرمة، تأسس على أساس من المهنية العالية والالتزام بالقيم الإسلامية السمحة. نقدم خدمات قانونية شاملة تغطي مختلف التخصصات الشرعية والنظامية، حيث يجمع فريقنا بين الخبرة القانونية العميقة والفهم الدقيق للثقافة المحلية والبيئة القضائية السعودية.
            </p>
            <p className="text-lg leading-[1.8] mb-6">
              نؤمن في شركة قمم اليقين بأن العميل هو محور اهتمامنا، ولذا نحرص على تقديم استشارات دقيقة وحلول قانونية مبتكرة تلبي احتياجاته وتحقق أهدافه بأعلى معايير الجودة. نضع نصب أعيننا مبدأ الشفافية والنزاهة في جميع تعاملاتنا، ونسعى دائماً لبناء علاقات طويلة الأمد مع عملائنا تقوم على الثقة والاحترام المتبادل.
            </p>
            <p className="text-lg leading-[1.8] mb-6">
              مكتبنا مجهز بأحدث التقنيات القانونية لضمان تقديم خدمات متميزة، ومحامونا مسجلون في الهيئة السعودية للمحامين ولديهم تراخيص مزاولة المهنة. نغطي جميع مناطق المملكة من خلال مكتبنا الرئيسي في مكة المكرمة وشبكة شراكاتنا مع مكاتب المحاماة في مختلف المدن السعودية.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-xl border border-border-dark bg-primary-light">
              <h2 className="text-2xl font-heading font-bold mb-4 text-accent-gold">رؤيتنا</h2>
              <p className="leading-[1.8] text-text-muted">
                أن نكون الخيار القانوني الأول والأكثر ثقة في مكة المكرمة والمملكة العربية السعودية، من خلال تقديم خدمات قانونية استثنائية تجمع بين العمق المعرفي والالتزام الأخلاقي.
              </p>
            </div>
            <div className="p-8 rounded-xl border border-border-dark bg-primary-light">
              <h2 className="text-2xl font-heading font-bold mb-4 text-accent-gold">رسالتنا</h2>
              <p className="leading-[1.8] text-text-muted">
                نلتزم بتقديم استشارات وحلول قانونية دقيقة وسريعة، مبنية على فهم عميق للأنظمة السعودية، مع وضع مصلحة العميل في صميم كل قرار قانوني نتخذه.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto mb-16">
            <div>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold mb-6">لماذا تختار قمم اليقين؟</h2>
              <div className="space-y-4">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-accent-gold" />
                      </div>
                      <span className="text-text-dark text-sm">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="aspect-[4/3] rounded-card bg-primary overflow-hidden border border-border-dark/50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-8 h-8 text-accent-gold" />
                </div>
                <p className="text-text-light/60 text-sm">صورة المكتب</p>
              </div>
            </div>
          </div>

          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold text-center mb-12">لماذا شركة قمم اليقين؟</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="p-6 rounded-xl bg-white border border-border shadow-card hover-lift transition-all">
                  <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-2">{v.title}</h3>
                  <p className="text-sm leading-[1.7] text-text-muted">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-heading font-bold mb-6">نحن هنا لمساعدتكم</h2>
          <p className="text-text-muted mb-8">تواصل معنا اليوم لحجز استشارة قانونية</p>
          <Link href="/consultation">
            <Button variant="primary" size="lg">احجز استشارتك الآن</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
