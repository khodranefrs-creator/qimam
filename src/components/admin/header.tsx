"use client"

import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { LogOut, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/admin/sidebar-context"

const breadcrumbLabels: Record<string, string> = {
  dashboard: "لوحة التحكم",
  consultations: "الاستشارات",
  messages: "الرسائل",
  blog: "المقالات",
  testimonials: "آراء العملاء",
  faqs: "الأسئلة الشائعة",
  settings: "الإعدادات",
  login: "تسجيل الدخول",
}

interface AdminHeaderProps {
  user: { id: string; role: string; email: string; name?: string }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const { toggle } = useSidebar()
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const currentLabel = segments.length >= 2 ? breadcrumbLabels[segments[1]] || segments[1] : ""

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email.charAt(0).toUpperCase()

  const roleLabels: Record<string, string> = {
    SUPER_ADMIN: "مشرف عام",
    ADMIN: "مدير",
    EDITOR: "محرر",
    VIEWER: "مشاهد",
  }

  return (
    <header className="h-16 bg-white border-b border-border/60 flex items-center justify-between px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="lg:hidden text-text-muted hover:text-text-dark transition" aria-label="فتح القائمة">
          <Menu size={20} />
        </button>
        <nav className="flex items-center gap-1.5 text-sm text-text-muted">
          <span className="text-text-dark font-medium">الإدارة</span>
          {currentLabel && (
            <>
              <span>/</span>
              <span>{currentLabel}</span>
            </>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-xs font-bold text-accent-gold">
            {initials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-text-dark" dir="ltr">{user.name || user.email}</div>
            <div className="text-[10px] text-text-muted">
              <span className={cn(
                "inline-block px-1.5 py-0.5 rounded",
                user.role === "SUPER_ADMIN" && "bg-accent-gold/10 text-accent-gold",
                user.role === "ADMIN" && "bg-info/10 text-info",
                user.role === "EDITOR" && "bg-success/10 text-success",
                user.role === "VIEWER" && "bg-gray-100 text-gray-500"
              )}>
                {roleLabels[user.role] || user.role}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-error transition px-2 py-1.5 rounded-lg hover:bg-error/5"
          title="تسجيل الخروج"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">خروج</span>
        </button>
      </div>
    </header>
  )
}
