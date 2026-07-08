'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Scale, Building2, Gavel } from 'lucide-react'

const highlights = [
  { icon: Scale, label: 'محاماة وترافع أمام جميع درجات المحاكم' },
  { icon: Building2, label: 'تأسيس الشركات وصياغة العقود' },
  { icon: Gavel, label: 'توثيق العقود والمعاملات الشرعية' },
]

export function AboutTeaser() {
  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent-gold/60" />
              <span className="text-accent-gold text-sm font-medium">من نحن</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6">
              شريكك القانوني الموثوق في مكة المكرمة
            </h2>
            <p className="text-text-muted leading-relaxed mb-8">
              شركة قمم اليقين للمحاماة والاستشارات القانونية، بقيادة المحامي والموثق
              عبدالعزيز حمود المطيري، نقدم خدمات قانونية شاملة تجمع بين الخبرة القضائية
              العميقة والفهم المتطور لمتطلبات السوق القانوني في المملكة العربية السعودية.
              نلتزم بأعلى معايير المهنة ونحرص على تحقيق العدالة بأقصى درجات الكفاءة
              والأمانة.
            </p>
            <div className="space-y-4 mb-8">
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
            <Link href="/about" className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200">
              اقرأ المزيد عنا
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-card bg-primary overflow-hidden border border-border-dark/50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-8 h-8 text-accent-gold" />
                  </div>
                  <p className="text-text-light/60 text-sm">صورة المكتب</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-accent-gold/20 rounded-card -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
