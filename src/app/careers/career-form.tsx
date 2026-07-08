"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"

const positions = [
  "محامٍ ممارس",
  "محامٍ مساعد",
  "باحث قانوني",
  "مستشار قانوني",
  "متدرب قانوني",
  "مساعد إداري",
  "مسؤول موارد بشرية",
  "مسؤول تسويق",
  "أخرى",
]

export function CareerForm() {
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
        setFeedback({ type: "error", text: data.error || "حدث خطأ" })
      }
    } catch {
      setFeedback({ type: "error", text: "حدث خطأ في الاتصال" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-border p-8 md:p-12 shadow-card">
      <h2 className="text-2xl font-heading font-bold text-primary mb-6">تقديم طلب توظيف</h2>

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
          <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1">الاسم الكامل *</label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark"
            placeholder="أدخل اسمك الكامل"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1">البريد الإلكتروني *</label>
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
            <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-1">رقم الهاتف</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark"
              placeholder="05xxxxxxxx"
            />
          </div>
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-text-dark mb-1">الوظيفة المطلوبة *</label>
          <select
            id="position"
            required
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark"
          >
            <option value="">-- اختر الوظيفة --</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-text-dark mb-1">خطاب التقديم</label>
          <textarea
            id="coverLetter"
            rows={5}
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark resize-y"
            placeholder="اكتب نبذة عن مؤهلاتك وخبراتك ودوافعك للتقديم"
          />
        </div>

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin ml-2" /> جاري الإرسال...</>
          ) : (
            <><Send className="w-4 h-4 ml-2" /> إرسال الطلب</>
          )}
        </Button>
      </form>
    </div>
  )
}
