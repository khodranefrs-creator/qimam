import { Metadata } from "next"
import Link from "next/link"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.terms.title,
    description: t.terms.description,
  }
}

const termsContent = {
  ar: {
    sections: [
      { key: 'intro', heading: 'مقدمة', paragraphs: ['مرحباً بكم في الموقع الإلكتروني لشركة قمم اليقين للمحاماة والاستشارات القانونية. باستخدامكم لهذا الموقع، فإنكم توافقون على الالتزام بشروط الخدمة هذه. يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع. إذا كنتم لا توافقون على أي من هذه الشروط، يرجى عدم استخدام الموقع.', 'شركة قمم اليقين للمحاماة والاستشارات القانونية هي شركة محاماة مرخصة وممارسة في المملكة العربية السعودية، ويخضع هذا الموقع وجميع الخدمات المقدمة من خلاله لأحكام الشريعة الإسلامية والأنظمة واللوائح المعمول بها في المملكة العربية السعودية.'] },
      { key: 'useOfSite', heading: 'استخدام الموقع', content: true },
      { key: 'services', heading: 'الخدمات', content: true },
      { key: 'intellectualProperty', heading: 'الملكية الفكرية', content: true },
      { key: 'limitation', heading: 'حدود المسؤولية', content: true },
      { key: 'changes', heading: 'التحديثات', content: true },
      { key: 'governingLaw', heading: 'القانون المطبق', content: true },
    ],
    contact: 'للاستفسارات المتعلقة بشروط الخدمة هذه، يرجى التواصل معنا عبر:',
    contactItems: [
      { label: 'الهاتف', value: '٠٥٦٥٥٥٥٤٣٧' },
      { label: 'العنوان', value: 'مكة المكرمة، المملكة العربية السعودية' },
    ],
  },
  en: {
    sections: [
      { key: 'intro', heading: 'Introduction', paragraphs: ['Welcome to the website of Qimam Al-Yaqin Law Firm & Legal Consultations. By using this website, you agree to be bound by these Terms of Service. Please read these terms carefully before using the website. If you do not agree to any of these terms, please do not use the website.', 'Qimam Al-Yaqin Law Firm & Legal Consultations is a licensed law firm practicing in the Kingdom of Saudi Arabia. This website and all services provided through it are subject to the provisions of Islamic Sharia and the laws and regulations in force in the Kingdom of Saudi Arabia.'] },
      { key: 'useOfSite', heading: 'Use of the Website', content: true },
      { key: 'services', heading: 'Services', content: true },
      { key: 'intellectualProperty', heading: 'Intellectual Property', content: true },
      { key: 'limitation', heading: 'Limitation of Liability', content: true },
      { key: 'changes', heading: 'Changes to Terms', content: true },
      { key: 'governingLaw', heading: 'Governing Law', content: true },
    ],
    contact: 'For inquiries regarding these Terms of Service, please contact us:',
    contactItems: [
      { label: 'Phone', value: '+966 56 555 5437' },
      { label: 'Address', value: 'Makkah, Kingdom of Saudi Arabia' },
    ],
  },
}

export default async function TermsOfServicePage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  const content = termsContent[locale === 'ar' ? 'ar' : 'en']
  const dateStr = locale === 'ar' ? '١ يناير ٢٠٢٦' : 'January 1, 2026'

  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.terms.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.terms.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.terms.lastUpdated}: {dateStr}</p>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-panel border border-border p-8 md:p-12 space-y-8 text-text-dark leading-[1.8]">
            {content.sections.map((section) => (
              <div key={section.key}>
                <h2 className="text-2xl font-heading font-bold leading-[1.15] mb-4 text-primary">{section.heading}</h2>
                {section.paragraphs ? (
                  section.paragraphs.map((p, i) => (
                    <p key={i} className={i > 0 ? 'mt-3' : ''}>{p}</p>
                  ))
                ) : (
                  <p>{t.terms[`${section.key}Desc` as keyof typeof t.terms] as string}</p>
                )}
              </div>
            ))}
            <div>
              <h2 className="text-2xl font-heading font-bold leading-[1.15] mb-4 text-primary">{t.terms.contact}</h2>
              <p>{content.contact}</p>
              <ul className="list-disc pr-6 mt-3 space-y-2">
                {content.contactItems.map((item, i) => (
                  <li key={i}>
                    <strong>{item.label}:</strong>{' '}
                    <span dir="ltr" className="inline-block text-left rtl:text-right">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
