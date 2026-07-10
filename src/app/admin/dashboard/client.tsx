"use client"

import Link from "next/link"
import { ArrowLeft, CalendarClock, Mail, Newspaper, Star, TrendingUp, Users, CheckCircle, Clock } from "lucide-react"
import { Session } from "next-auth"
import { AuditLog } from "@prisma/client"

interface StatItem {
  label: string
  value: number
  total: number
  color: string
  icon: string
}

interface DashboardClientProps {
  session: Session | null
  stats: StatItem[]
  recentActivity: (AuditLog & { user: { name: string | null; email: string | null } | null })[]
  pendingConsultations: number
  confirmedConsultations: number
}

export default function DashboardClient({ session, stats, recentActivity, pendingConsultations, confirmedConsultations }: DashboardClientProps) {
  const quickActions = [
    { href: "/admin/consultations", label: "عرض الاستشارات", icon: CalendarClock, color: "text-accent-gold" },
    { href: "/admin/messages", label: "الرسائل الواردة", icon: Mail, color: "text-info" },
    { href: "/admin/blog", label: "إدارة المقالات", icon: Newspaper, color: "text-success" },
    { href: "/admin/testimonials", label: "آراء العملاء", icon: Star, color: "text-warning" },
  ]

  const actionLabels: Record<string, string> = {
    CREATE: "إنشاء",
    UPDATE: "تحديث",
    DELETE: "حذف",
    LOGIN: "تسجيل دخول",
    APPROVE: "موافقة",
    REJECT: "رفض",
    ARCHIVE: "أرشفة",
    SEND: "إرسال",
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">لوحة التحكم</h1>
          <p className="text-text-muted text-sm mt-1">مرحباً بك {session?.user?.name || "المشرف"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-panel border border-border/60 p-5 shadow-subtle hover:shadow-raised transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-muted">{stat.label}</p>
                <p className="text-3xl font-bold text-primary mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="mt-3">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all`} style={{ width: `${stat.total > 0 ? (stat.value / stat.total) * 100 : 0}%` }} />
              </div>
              <p className="text-[11px] text-text-muted mt-1">من أصل {stat.total} إجمالي</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-panel border border-border/60 p-5 shadow-subtle">
          <h2 className="text-lg font-heading font-bold text-primary mb-4">النشاطات الأخيرة</h2>
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-text-muted text-sm">لا توجد نشاطات حديثة</div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((log) => (
                <div key={log.id} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center shrink-0">
                    <span className="text-xs">{actionLabels[log.action] || log.action}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-dark">
                      <span className="font-medium">{log.user?.name || "مستخدم"}</span>
                      {" "}{actionLabels[log.action]?.toLowerCase() || log.action.toLowerCase()}{" "}
                      <span className="text-text-muted">{log.entityType}</span>
                    </p>
                    <p className="text-[11px] text-text-muted">{new Date(log.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-panel border border-border/60 p-5 shadow-subtle">
            <h2 className="text-lg font-heading font-bold text-primary mb-4">إجراءات سريعة</h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition group"
                >
                  <action.icon size={18} className={action.color} />
                  <span className="text-sm text-text-dark group-hover:text-accent-gold transition">{action.label}</span>
                  <ArrowLeft size={14} className="mr-auto text-text-muted group-hover:text-accent-gold transition" />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-panel border border-border/60 p-5 shadow-subtle">
            <h2 className="text-lg font-heading font-bold text-primary mb-4">ملخص الاستشارات</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-warning" />
                  <span className="text-sm text-text-muted">قيد الانتظار</span>
                </div>
                <span className="text-lg font-bold text-warning">{pendingConsultations}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm text-text-muted">مؤكدة</span>
                </div>
                <span className="text-lg font-bold text-success">{confirmedConsultations}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-info" />
                  <span className="text-sm text-text-muted">إجمالي</span>
                </div>
                <span className="text-lg font-bold text-primary">{stats.reduce((a, s) => a + s.total, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
