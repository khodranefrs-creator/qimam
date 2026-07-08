"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function CareerForm() {
  const locale = useLocale()
  const t = getTranslations(locale)

  const positions = [
    t.careers.legalConsultant,
    t.careers.associateLawyer,
    t.careers.legalResearcher,
    t.careers.paralegal,
    t.careers.adminAssistant,
  ]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
  })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setFeedback({ type: "success", text: data.message })
        setFormData({ name: "", email: "", phone: "", position: "", coverLetter: "" })
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
    <div className="bg-white rounded-xl border border-border p-8 md:p-12 shadow-card">
      <h2 className="text-2xl font-heading font-bold text-primary mb-6">{t.careers.title}</h2>

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

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1">{t.careers.nameLabel} *</label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark"
            placeholder={t.careers.namePlaceholder}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1">{t.careers.emailLabel} *</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-1">{t.careers.phoneLabel}</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark"
              placeholder={t.careers.phonePlaceholder}
            />
          </div>
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-text-dark mb-1">{t.careers.positionLabel} *</label>
          <select
            id="position"
            required
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark"
          >
            <option value="">-- {t.careers.positionPlaceholder} --</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-text-dark mb-1">{t.careers.coverLetterLabel}</label>
          <textarea
            id="coverLetter"
            rows={5}
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark resize-y"
            placeholder={t.careers.coverLetterPlaceholder}
          />
        </div>

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin ml-2" /> {t.common.loading}</>
          ) : (
            <><Send className="w-4 h-4 ml-2" /> {t.careers.submit}</>
          )}
        </Button>
      </form>
    </div>
  )
}
