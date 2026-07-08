import type { Metadata } from "next"
import Link from "next/link"
import { Award, BadgeCheck, BookOpen, Scale, Phone, MessageCircle, Briefcase, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "المحامي والموثّق ماجد بن خالد السواط",
  description: "السيرة الذاتية للمحامي والموثّق المعتمد ماجد بن خالد السواط — محامي مرخّص من هيئة المحامين السعودية وموثّق معتمد من وزارة العدل.",
}

const certifications = [
  { icon: BadgeCheck, label: "محامي مرخّص — هيئة المحامين السعودية" },
  { icon: BadgeCheck, label: "موثّق معتمد — وزارة العدل" },
  { icon: BadgeCheck, label: "وسيط عقاري معتمد — الهيئة العامة للعقار" },
  { icon: BadgeCheck, label: "محكم تجاري معتمد — مركز التحكيم التجاري" },
]

const skills = [
  "صياغة العقود التجارية والمدنية",
  "الترافع أمام جميع درجات المحاكم",
  "التوثيق المعتمد للمعاملات",
  "التحكيم التجاري وتسوية المنازعات",
  "تأسيس الشركات وهياكل الحوكمة",
  "الاستشارات العقارية والتثمين",
  "قضايا الأحوال الشخصية والمواريث",
  "الوساطة العقارية والتفاوض",
]

export default function LawyerPage() {
  return (
    <div>
      <div className="bg-primary text-text-light py-4">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">الرئيسية</Link>
            <span>/</span>
            <span className="text-accent-gold">المحامي والموثّق</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-accent-gold bg-primary-light flex items-center justify-center overflow-hidden">
                  <span className="text-6xl font-heading font-bold text-accent-gold">م</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-accent-gold flex items-center justify-center shadow-gold animate-pulse-ring-subtle">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full border-2 border-accent-gold/40 bg-primary flex items-center justify-center">
                  <span className="text-accent-gold text-xs font-heading font-bold">✓</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 text-center lg:text-right">
              <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                <span className="w-8 h-px bg-accent-gold/60" />
                <span className="text-accent-gold text-sm font-medium tracking-widest">السيرة الذاتية</span>
              </div>
              <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold mb-2 leading-tight">
                المحامي والموثّق ماجد بن خالد السواط
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-sm font-medium mb-6">
                <BadgeCheck className="w-4 h-4" />
                <span>محامي مرخّص | موثّق معتمد</span>
              </div>
              <p className="text-text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
                محامٍ مرخّص من هيئة المحامين السعودية وموثّق معتمد من وزارة العدل،
                يتمتع بخبرة قانونية واسعة تمتد لأكثر من 12 عامًا في مجالات التقاضي
                والتحكيم والاستشارات القانونية للشركات والأفراد. يجمع بين الدراية
                العميقة بالأنظمة السعودية والفهم المتطور لمتطلبات السوق القانوني.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-8 justify-center lg:justify-start">
                <Link href="/consultation">
                  <Button variant="primary" size="lg">احجز استشارة</Button>
                </Link>
                <a
                  href="https://wa.me/966565555437?text=مرحباً، أرغب بالاستفسار عن خدماتكم القانونية"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    <MessageCircle className="w-4 h-4" />
                    واتساب
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">لمحة عن المسيرة المهنية</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  المحامي ماجد بن خالد السواط هو محامٍ مرخّص وممارس أمام جميع درجات المحاكم في المملكة العربية السعودية،
                  حاصل على ترخيص مزاولة المهنة من الهيئة السعودية للمحامين. يمتد خبرته لأكثر من 12 عامًا
                  في مختلف مجالات القانون، شغل خلالها مناصب قانونية في عدد من الشركات والمؤسسات الكبرى قبل
                  أن يتفرغ لمزاولة المهنة كمحامٍ مستقل ومؤسس لشركة قمم اليقين للمحاماة والاستشارات القانونية.
                </p>
                <p>
                  حصل على شهادة البكالوريوس في الأنظمة (القانون) من جامعة الملك عبدالعزيز بجدة،
                  وأكمل العديد من الدورات التدريبية المتخصصة في مجالات التحكيم التجاري والوساطة العقارية
                  وصياغة العقود الدولية. كما أنه حاصل على شهادة الموثّق المعتمد من وزارة العدل السعودية،
                  مما يتيح له تقديم خدمات التوثيق الرسمية داخل مكتبه مباشرة.
                </p>
                <p>
                  يتمتع المحامي ماجد السواط بسمعة مهنية مرموقة انعكست في التقييمات المتميزة التي حصل عليها
                  من عملائه، حيث حصل مكتبه على تقييم 5 نجوم من أكثر من 85 عميلاً، معربين عن ثقتهم
                  في احترافيته ومصداقيته وسرعة إنجازه للمعاملات.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className="text-xs text-text-muted">يمكن التعديل من لوحة التحكم</span>
                <span className="w-1 h-1 rounded-full bg-text-muted/40" />
                <span className="text-xs text-text-muted">آخر تحديث: مستمر</span>
              </div>
            </div>
            <div>
              <div className="bg-primary rounded-card p-6 border border-border-dark mb-8">
                <h3 className="font-heading font-bold text-text-light mb-5 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-gold" />
                  <span>الاعتمادات والتراخيص</span>
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert) => {
                    const Icon = cert.icon
                    return (
                      <div key={cert.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-accent-gold" />
                        </div>
                        <span className="text-text-muted text-sm">{cert.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="bg-primary rounded-card p-6 border border-border-dark">
                <h3 className="font-heading font-bold text-text-light mb-5 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent-gold" />
                  <span>مجالات الخبرة</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="w-8 h-px bg-accent-gold/60" />
              <span className="text-accent-gold text-sm font-medium tracking-widest">كلمة المحامي</span>
            </div>
            <div className="relative p-8 md:p-12 rounded-2xl bg-secondary border border-border/60">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-accent-gold/10" />
              <p className="text-lg md:text-xl leading-[1.9] text-text-dark relative z-10 mb-6">
                &quot;شرف خدمة العملاء وحماية حقوقهم هو ما يدفعني شخصيًا وفريق العمل في شركة قمم اليقين
                لتقديم أفضل ما لدينا. نؤمن بأن الثقة هي أساس أي علاقة قانونية ناجحة، ونسعى دائمًا
                لنكون عند حسن ظن عملائنا من خلال الشفافية والإتقان والسرعة في الأداء.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-accent-gold flex items-center justify-center">
                  <span className="text-lg font-heading font-bold text-accent-gold">م</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-text-dark">ماجد بن خالد السواط</div>
                  <div className="text-text-muted text-sm">محامي وموثّق معتمد</div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 justify-center">
              <span className="text-xs text-text-muted">يمكن التعديل من لوحة التحكم</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-white border border-border shadow-card text-center hover-lift">
              <div className="text-3xl font-heading font-bold text-accent-gold mb-1">12+</div>
              <div className="text-text-muted text-sm">سنة خبرة</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border shadow-card text-center hover-lift">
              <div className="text-3xl font-heading font-bold text-accent-gold mb-1">500+</div>
              <div className="text-text-muted text-sm">قضية ناجحة</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-border shadow-card text-center hover-lift">
              <div className="text-3xl font-heading font-bold text-accent-gold mb-1">85+</div>
              <div className="text-text-muted text-sm">تقييم 5 نجوم</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-heading font-bold mb-6">تواصل مع المحامي ماجد السواط مباشرة</h2>
          <p className="text-text-muted mb-8">نحن هنا للإجابة على استفساراتكم وتقديم المشورة القانونية</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/consultation">
              <Button variant="primary" size="lg">احجز استشارتك الآن</Button>
            </Link>
            <a href="tel:+966565555437">
              <Button variant="secondary" size="lg">
                <Phone className="w-4 h-4" />
                +966 56 555 5437
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
