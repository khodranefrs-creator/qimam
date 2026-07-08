'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Scale, Shield, Award } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const badges = [
  { icon: Scale, label: 'خبرة قانونية رفيعة' },
  { icon: Shield, label: 'ترخيص هيئة المحامين' },
  { icon: Award, label: 'توثيق وزارة العدل' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen bg-primary flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `linear-gradient(30deg, #B08D57 12%, transparent 12.5%, transparent 87%, #B08D57 87.5%, #B08D57), linear-gradient(150deg, #B08D57 12%, transparent 12.5%, transparent 87%, #B08D57 87.5%, #B08D57), linear-gradient(30deg, #B08D57 12%, transparent 12.5%, transparent 87%, #B08D57 87.5%, #B08D57), linear-gradient(150deg, #B08D57 12%, transparent 12.5%, transparent 87%, #B08D57 87.5%, #B08D57), linear-gradient(60deg, rgba(176,141,87,0.08) 25%, transparent 25.5%, transparent 75%, rgba(176,141,87,0.08) 75%, rgba(176,141,87,0.08))`,
        backgroundSize: '80px 140px',
      }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

      <div className="relative z-10 container-custom pt-32 pb-20 md:pt-40 md:pb-28">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-accent-gold/60" />
            <span className="text-accent-gold text-sm font-medium tracking-widest uppercase">Qimam Al-Yaqin Law Firm</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light leading-tight mb-6">
            خبرة قانونية{' '}
            <span className="gradient-text-gold">رفيعة</span>
            {' '}في مكة المكرمة
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mb-10">
            شركة قمم اليقين للمحاماة والاستشارات القانونية — نقدم حلولاً قانونية متكاملة
            في القضايا التجارية والمدنية والجزائية بخبرة تمتد لسنوات في المحاكم السعودية.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link href="/consultation" className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gold text-primary font-semibold text-base rounded-[8px] hover:bg-accent-gold/90 transition-all duration-300 shadow-gold hover:shadow-[0_4px_25px_rgba(176,141,87,0.35)]">
              احجز استشارة مجانية
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/about" className="inline-flex items-center px-8 py-4 border border-accent-gold/30 text-accent-gold font-medium text-base rounded-[8px] hover:bg-accent-gold/10 transition-all duration-300">
              تعرف علينا
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border-dark/50">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-accent-gold/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent-gold" />
                  </div>
                  <span className="text-text-muted text-sm">{badge.label}</span>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
    </section>
  )
}
