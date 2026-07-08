"use client"

import { useState, FormEvent } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError("يرجى إدخال البريد الإلكتروني وكلمة المرور"); return }
    setLoading(true)
    setError("")
    const result = await signIn("credentials", { email, password, redirect: false })
    if (result?.error) {
      setError("بريد إلكتروني أو كلمة مرور غير صحيحة")
      setLoading(false)
    } else {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent-gold blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent-gold blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/10 border border-accent-gold/30 mb-4">
            <span className="text-2xl font-heading font-bold text-accent-gold">ق</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">قمم اليقين</h1>
          <p className="text-accent-gold-light/70 text-sm mt-1">لوحة التحكم</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-primary-light/80 backdrop-blur-sm border border-border-dark rounded-2xl p-8 space-y-5 shadow-warm">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error text-sm rounded-lg px-4 py-3 text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-accent-gold-light mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@qimamlaw.com"
              className="w-full bg-primary border border-border-dark rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent-gold-light mb-1.5">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-primary border border-border-dark rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold transition"
                dir="ltr"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent-gold transition">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-gold text-primary font-bold py-2.5 rounded-lg hover:bg-accent-gold/90 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  )
}
