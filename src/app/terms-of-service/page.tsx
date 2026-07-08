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

export default async function TermsOfServicePage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return (
    <div>
      <div className="bg-primary text-text-light py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.terms.title}</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.terms.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.terms.lastUpdated}: ١ يناير ٢٠٢٦</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-border p-8 md:p-12 space-y-8 text-text-dark leading-[1.8]">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">{t.terms.intro}</h2>
              <p>مرحباً بكم في الموقع الإلكتروني لشركة قمم اليقين للمحاماة والاستشارات القانونية. باستخدامكم لهذا الموقع، فإنكم توافقون على الالتزام بشروط الخدمة هذه. يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع. إذا كنتم لا توافقون على أي من هذه الشروط، يرجى عدم استخدام الموقع.</p>
              <p className="mt-3">شركة قمم اليقين للمحاماة والاستشارات القانونية هي شركة محاماة مرخصة وممارسة في المملكة العربية السعودية، ويخضع هذا الموقع وجميع الخدمات المقدمة من خلاله لأحكام الشريعة الإسلامية والأنظمة واللوائح المعمول بها في المملكة العربية السعودية.</p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">{t.terms.useOfSite}</h2>
              <p>{t.terms.useOfSiteDesc}</p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">{t.terms.services}</h2>
              <p>{t.terms.servicesDesc}</p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">{t.terms.intellectualProperty}</h2>
              <p>{t.terms.intellectualPropertyDesc}</p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">{t.terms.limitation}</h2>
              <p>{t.terms.limitationDesc}</p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">{t.terms.changes}</h2>
              <p>{t.terms.changesDesc}</p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">{t.terms.governingLaw}</h2>
              <p>{t.terms.governingLawDesc}</p>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">{t.terms.contact}</h2>
              <p>للاستفسارات المتعلقة بشروط الخدمة هذه، يرجى التواصل معنا عبر:</p>
              <ul className="list-disc pr-6 mt-3 space-y-2">
                <li><strong>{t.contact.emailLabel}:</strong> info@qimam-law.com</li>
                <li><strong>{t.contact.phoneLabel}:</strong> ٠٥٦٥٥٥٥٤٣٧</li>
                <li><strong>{t.contact.address}:</strong> {t.contact.address}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
