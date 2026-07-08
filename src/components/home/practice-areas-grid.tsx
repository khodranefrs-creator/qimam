'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Building2, Scale, Briefcase, Home, Heart, BookOpen, Gavel, FileText, Landmark, Users, Shield } from 'lucide-react'
import type { PracticeArea } from '@prisma/client'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Scale, Briefcase, Home, Heart, BookOpen, Gavel, FileText, Landmark, Users, Shield,
}

interface Props {
  areas: Pick<PracticeArea, 'id' | 'slug' | 'title' | 'description' | 'icon'>[]
}

export function PracticeAreasGrid({ areas }: Props) {
  const defaultAreas = areas.length > 0 ? areas : [
    { id: '1', slug: 'commercial-law', title: 'القانون التجاري', description: 'استشارات وحلول قانونية متكاملة في المنازعات التجارية والتعاقدات.', icon: 'Briefcase' },
    { id: '2', slug: 'corporate-law', title: 'قانون الشركات وتأسيسها', description: 'تأسيس وإدارة الشركات وهياكل الحوكمة والاندماج والاستحواذ.', icon: 'Building2' },
    { id: '3', slug: 'litigation', title: 'التقاضي والمرافعات', description: 'تمثيل قانوني أمام المحاكم السعودية في جميع درجات التقاضي.', icon: 'Scale' },
    { id: '4', slug: 'real-estate-law', title: 'القانون العقاري', description: 'استشارات عقارية شاملة في البيع والشراء والإيجار والتطوير.', icon: 'Home' },
    { id: '5', slug: 'family-law', title: 'الأحوال الشخصية', description: 'قضايا الأسرة والنفقة والحضانة والطلاق والخلع.', icon: 'Heart' },
    { id: '6', slug: 'inheritance-law', title: 'المواريث والوصايا', description: 'تقسيم التركات وتوثيق الوصايا وفق الشريعة الإسلامية.', icon: 'BookOpen' },
  ]

  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent-gold/60" />
            <span className="text-accent-gold text-sm font-medium">مجالات الممارسة</span>
            <span className="w-8 h-px bg-accent-gold/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
            مجالات خبرتنا القانونية
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات القانونية في مختلف التخصصات لتلبية احتياجات عملائنا
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultAreas.map((area, i) => {
            const Icon = area.icon && iconMap[area.icon] ? iconMap[area.icon] : Briefcase
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
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
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link href="/practice-areas" className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200">
            عرض جميع مجالات الممارسة
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
