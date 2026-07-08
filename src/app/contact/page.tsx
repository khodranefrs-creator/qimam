import { Metadata } from "next"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: "تواصل مع شركة قمم اليقين للمحاماة والاستشارات القانونية",
}

export default function ContactPage() {
  return (
    <div>
      <div className="bg-primary text-text-light py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">الرئيسية</Link>
            <span>/</span>
            <span className="text-accent-gold">اتصل بنا</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">اتصل بنا</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">نحن هنا للإجابة على استفساراتك وتقديم المساعدة القانونية التي تحتاجها</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl border border-border p-6 shadow-card text-center hover-lift transition-all">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">العنوان</h3>
              <p className="text-text-muted text-sm leading-[1.7]">شارع النسيم العام، مكة المكرمة<br />المملكة العربية السعودية</p>
            </div>

            <div className="bg-white rounded-xl border border-border p-6 shadow-card text-center hover-lift transition-all">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">الهاتف</h3>
              <p className="text-text-muted text-sm" dir="ltr">+966 56 555 5437</p>
            </div>

            <div className="bg-white rounded-xl border border-border p-6 shadow-card text-center hover-lift transition-all">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">البريد الإلكتروني</h3>
              <p className="text-text-muted text-sm">info@qimam-law.com</p>
            </div>

            <div className="bg-white rounded-xl border border-border p-6 shadow-card text-center hover-lift transition-all">
              <div className="w-14 h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">ساعات العمل</h3>
              <p className="text-text-muted text-sm">السبت - الخميس<br />٩:٠٠ صباحاً - ٩:٠٠ مساءً</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ContactForm />
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.5!2d39.8!3d21.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI0JzAwLjAiTiAzOcKwNDgnMDAuMCJF!5e0!3m2!1sar!2ssa!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع شركة قمم اليقين للمحاماة"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
