'use client'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronLeft, ChevronRight, Calendar, Clock, Phone, Mail, User, FileText, X, ExternalLink, MessageSquare, Save, Filter, Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type ConsultationStatus = "PENDING" | "CONFIRMED" | "RESCHEDULED" | "CANCELLED" | "COMPLETED"

interface PracticeAreaRef {
  id: string
  title: string
}

interface Consultation {
  id: string
  name: string
  phone: string
  email: string | null
  practiceAreaId: string | null
  practiceArea: PracticeAreaRef | null
  preferredDate: string | null
  preferredTime: string | null
  details: string | null
  contactMethod: string | null
  status: ConsultationStatus
  adminNotes: string | null
  createdAt: string
  updatedAt: string
}

interface PageData {
  data: Consultation[]
  total: number
  page: number
  limit: number
  totalPages: number
}

const statusLabels: Record<ConsultationStatus, string> = {
  PENDING: "قيد الانتظار",
  CONFIRMED: "مؤكدة",
  RESCHEDULED: "أعيد جدولتها",
  CANCELLED: "ملغية",
  COMPLETED: "مكتملة",
}

const statusColors: Record<ConsultationStatus, string> = {
  PENDING: "bg-warning/10 text-warning border-warning/20",
  CONFIRMED: "bg-success/10 text-success border-success/20",
  RESCHEDULED: "bg-info/10 text-info border-info/20",
  CANCELLED: "bg-error/10 text-error border-error/20",
  COMPLETED: "bg-info/10 text-info border-info/20",
}

const statusOptions: ConsultationStatus[] = ["PENDING", "CONFIRMED", "RESCHEDULED", "CANCELLED", "COMPLETED"]

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-"
  const d = new Date(dateStr)
  return d.toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" })
}

function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return "-"
  const d = new Date(dateStr)
  return d.toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

function getContactMethodIcon(method: string | null) {
  switch (method) {
    case "whatsapp": return <MessageSquare size={14} className="text-success" />
    case "email": return <Mail size={14} className="text-info" />
    default: return <Phone size={14} className="text-accent-gold" />
  }
}

const contactMethodLabels: Record<string, string> = {
  phone: "اتصال هاتفي",
  whatsapp: "واتساب",
  email: "بريد إلكتروني",
}

export default function AdminConsultationsPage() {
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<ConsultationStatus | "">("")
  const [adminNotes, setAdminNotes] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", page.toString())
      params.set("limit", "20")
      if (statusFilter) params.set("status", statusFilter)
      if (searchQuery) params.set("search", searchQuery)
      if (dateFrom) params.set("from", dateFrom)
      if (dateTo) params.set("to", dateTo)

      const res = await fetch(`/api/admin/consultations?${params}`)
      const json = await res.json()
      if (res.ok) setPageData(json)
    } catch {
      setPageData(null)
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, searchQuery, dateFrom, dateTo])

  useEffect(() => { fetchData() }, [fetchData])

  function openDrawer(c: Consultation) {
    setSelectedConsultation(c)
    setNewStatus(c.status)
    setAdminNotes(c.adminNotes || "")
    setSaveMessage("")
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
    setSelectedConsultation(null)
  }

  async function handleSave() {
    if (!selectedConsultation) return
    setSaving(true)
    setSaveMessage("")
    try {
      const body: any = {}
      if (newStatus && newStatus !== selectedConsultation.status) body.status = newStatus
      if (adminNotes !== (selectedConsultation.adminNotes || "")) body.adminNotes = adminNotes

      if (Object.keys(body).length === 0) {
        setSaveMessage("لم يتم إجراء أي تغييرات")
        setSaving(false)
        return
      }

      const res = await fetch(`/api/admin/consultations/${selectedConsultation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setSaveMessage("success")
        fetchData()
        setSelectedConsultation((prev) => prev ? { ...prev, ...body } : prev)
      } else {
        const data = await res.json()
        setSaveMessage(data.error || "حدث خطأ")
      }
    } catch {
      setSaveMessage("حدث خطأ في الاتصال")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">الاستشارات</h1>
          <p className="text-text-muted text-sm mt-1">إدارة طلبات الاستشارات القانونية</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-card p-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-text-muted mb-1">بحث</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
                placeholder="بحث بالاسم أو الجوال أو البريد..."
                className="w-full rounded-[8px] border border-border/60 bg-white px-3 py-2 pr-9 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-text-muted mb-1">الحالة</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
              className="w-full rounded-[8px] border border-border/60 bg-white px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-gold appearance-none cursor-pointer"
            >
              <option value="">الكل</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{statusLabels[s]}</option>
              ))}
            </select>
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-text-muted mb-1">من تاريخ</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setPage(1) }}
              className="w-full rounded-[8px] border border-border/60 bg-white px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-gold"
            />
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-text-muted mb-1">إلى تاريخ</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setPage(1) }}
              className="w-full rounded-[8px] border border-border/60 bg-white px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-gold"
            />
          </div>
          <Button variant="secondary" size="sm" onClick={() => { setStatusFilter(""); setSearchQuery(""); setDateFrom(""); setDateTo(""); setPage(1) }}>
            <X size={14} />
            مسح
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-accent-gold" />
          </div>
        ) : !pageData || pageData.data.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <FileText size={40} className="mx-auto mb-3 opacity-40" />
            <p>لا توجد استشارات</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-gray-50/50">
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">الاسم</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">الجوال</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">التخصص</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">التاريخ</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">الحالة</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">تاريخ الطلب</th>
                    <th className="text-left px-4 py-3 font-medium text-text-muted text-xs">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.data.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-border/40 hover:bg-gray-50/50 transition cursor-pointer"
                      onClick={() => openDrawer(c)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-text-muted shrink-0" />
                          <span className="font-medium text-text-dark">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-muted" dir="ltr">{c.phone}</td>
                      <td className="px-4 py-3 text-text-muted">{c.practiceArea?.title || "-"}</td>
                      <td className="px-4 py-3 text-text-muted">
                        {c.preferredDate ? (
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-text-muted" />
                            <span>{formatDate(c.preferredDate)}</span>
                            {c.preferredTime && (
                              <>
                                <Clock size={12} className="text-text-muted mr-1" />
                                <span>{c.preferredTime}</span>
                              </>
                            )}
                          </div>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[c.status]}`}>
                          {c.status === "PENDING" && <AlertCircle size={12} />}
                          {c.status === "CONFIRMED" && <CheckCircle size={12} />}
                          {c.status === "CANCELLED" && <XCircle size={12} />}
                          {statusLabels[c.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-text-muted text-xs">{formatDateTime(c.createdAt)}</td>
                      <td className="px-4 py-3 text-left">
                        <button
                          onClick={(e) => { e.stopPropagation(); openDrawer(c) }}
                          className="text-accent-gold hover:text-accent-gold/80 transition text-xs font-medium"
                        >
                          تفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pageData.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                <span className="text-xs text-text-muted">
                  إجمالي {pageData.total} استشارة
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-1.5 rounded-[6px] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={16} className="text-text-muted" />
                  </button>
                  <span className="text-xs text-text-muted px-2">
                    {pageData.page} من {pageData.totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(pageData.totalPages, p + 1))}
                    disabled={page >= pageData.totalPages}
                    className="p-1.5 rounded-[6px] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={16} className="text-text-muted" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {drawerOpen && selectedConsultation && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={closeDrawer} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-border/60 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-heading font-bold text-primary">تفاصيل الاستشارة</h2>
                <button onClick={closeDrawer} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="bg-gray-50 rounded-[12px] border border-border/60 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-accent-gold" />
                      <span className="font-medium text-text-dark">{selectedConsultation.name}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusColors[selectedConsultation.status]}`}>
                      {statusLabels[selectedConsultation.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted" dir="ltr">
                    <Phone size={14} />
                    {selectedConsultation.phone}
                  </div>
                  {selectedConsultation.email && (
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Mail size={14} />
                      {selectedConsultation.email}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    {getContactMethodIcon(selectedConsultation.contactMethod)}
                    {contactMethodLabels[selectedConsultation.contactMethod || ""] || selectedConsultation.contactMethod || "-"}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-[12px] border border-border/60 p-4 space-y-3">
                  <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider">تفاصيل القضية</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText size={14} className="text-text-muted" />
                    <span className="text-text-muted">التخصص:</span>
                    <span className="font-medium text-text-dark">{selectedConsultation.practiceArea?.title || "غير محدد"}</span>
                  </div>
                  {selectedConsultation.details && (
                    <div>
                      <span className="text-sm text-text-muted block mb-1">تفاصيل إضافية:</span>
                      <p className="text-sm text-text-dark bg-white rounded-[8px] p-3 border border-border/40">{selectedConsultation.details}</p>
                    </div>
                  )}
                </div>

                {selectedConsultation.preferredDate && (
                  <div className="bg-gray-50 rounded-[12px] border border-border/60 p-4 space-y-2">
                    <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider">الموعد المفضل</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-text-muted" />
                      <span className="text-text-muted">التاريخ:</span>
                      <span className="font-medium text-text-dark">{formatDate(selectedConsultation.preferredDate)}</span>
                    </div>
                    {selectedConsultation.preferredTime && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={14} className="text-text-muted" />
                        <span className="text-text-muted">الوقت:</span>
                        <span className="font-medium text-text-dark">{selectedConsultation.preferredTime}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-gray-50 rounded-[12px] border border-border/60 p-4 space-y-3">
                  <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider">تحديث الحالة</h3>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setNewStatus(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          newStatus === s
                            ? "bg-accent-gold text-primary border-accent-gold shadow-gold"
                            : "bg-white text-text-muted border-border/60 hover:border-accent-gold/40"
                        }`}
                      >
                        {statusLabels[s]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-accent-gold uppercase tracking-wider">ملاحظات داخلية</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="أضف ملاحظات داخلية (تظهر للمشرفين فقط)..."
                    rows={4}
                    className="w-full rounded-[8px] border border-border/60 bg-white px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold resize-none"
                  />
                </div>

                {saveMessage && (
                  <div className={`text-sm px-4 py-2 rounded-lg ${
                    saveMessage === "success"
                      ? "bg-success/10 text-success border border-success/20"
                      : saveMessage === "لم يتم إجراء أي تغييرات"
                      ? "bg-warning/10 text-warning border border-warning/20"
                      : "bg-error/10 text-error border border-error/20"
                  }`}>
                    {saveMessage === "success" ? "تم الحفظ بنجاح" : saveMessage}
                  </div>
                )}

                <Button variant="primary" size="lg" className="w-full gap-2" onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  حفظ التغييرات
                </Button>

                <div className="text-[11px] text-text-muted text-center">
                  تاريخ الطلب: {formatDateTime(selectedConsultation.createdAt)}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
