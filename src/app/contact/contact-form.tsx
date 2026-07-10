"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function ContactForm() {
  const locale = useLocale()
  const t = getTranslations(locale)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setFeedback({ type: "success", text: data.message })
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setFeedback({ type: "error", text: data.error || t.common.error })
      }
    } catch {
      setFeedback({ type: "error", text: t.common.error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-panel border border-border p-8 md:p-12 shadow-subtle">
      <h2 className="text-2xl font-heading font-bold leading-[1.15] text-primary mb-6">{t.contact.formTitle}</h2>

      {feedback && (
        <div
          className={`p-4 rounded-lg mb-6 text-sm ${
            feedback.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {feedback.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1">{t.contact.nameLabel} *</label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold"
              placeholder={t.contact.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1">{t.contact.emailLabel} *</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold"
              placeholder="example@email.com"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-1">{t.contact.phoneLabel}</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold"
              placeholder={t.contact.phonePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-text-dark mb-1">{t.contact.subjectLabel}</label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold"
              placeholder={t.contact.subjectPlaceholder}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-1">{t.contact.messageLabel} *</label>
          <textarea
            id="message"
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold resize-y"
            placeholder={t.contact.messagePlaceholder}
          />
        </div>
        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin ms-2" /> {t.common.loading}</>
          ) : (
            <><Send className="w-4 h-4 ms-2" /> {t.contact.submit}</>
          )}
        </Button>
      </form>
    </div>
  )
}
