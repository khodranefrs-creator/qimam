'use client'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ThumbsUp, ThumbsDown, Trash2, X, Loader2, Search, ChevronLeft, ChevronRight, FileText, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  name: string
  role: string | null
  content: string
  rating: number | null
  source: string | null
  sourceUrl: string | null
  featured: boolean
  approved: boolean
  createdAt: string
  updatedAt: string
}

interface PageData {
  data: Testimonial[]
  total: number
  page: number
  limit: number
  totalPages: number
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

function renderStars(rating: number | null) {
  const count = rating || 0
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= count ? "text-warning fill-warning" : "text-gray-200"}
        />
      ))}
    </div>
  )
}

export default function AdminTestimonialsPage() {
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [approvedFilter, setApprovedFilter] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", page.toString())
      params.set("limit", "20")
      if (approvedFilter) params.set("approved", approvedFilter)
      if (searchQuery) params.set("search", searchQuery)

      const res = await fetch(`/api/admin/testimonials?${params}`)
      const json = await res.json()
      if (res.ok) setPageData(json)
    } catch {
      setPageData(null)
    } finally {
      setLoading(false)
    }
  }, [page, approvedFilter, searchQuery])

  useEffect(() => { fetchData() }, [fetchData])

  async function toggleApproval(testimonial: Testimonial, approved: boolean) {
    setActionLoading(testimonial.id)
    try {
      await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      })
      fetchData()
    } catch {}
    setActionLoading(null)
  }

  async function handleDelete(id: string) {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" })
      if (res.ok) {
        setDeleteConfirm(null)
        fetchData()
      }
    } catch {}
    setDeleting(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">آراء العملاء</h1>
          <p className="text-text-muted text-sm mt-1">إدارة آراء العملاء والتوصيات</p>
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
                placeholder="بحث بالاسم أو المحتوى..."
                className="w-full rounded-[8px] border border-border/60 bg-white px-3 py-2 pr-9 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-text-muted mb-1">حالة الموافقة</label>
            <select
              value={approvedFilter}
              onChange={(e) => { setApprovedFilter(e.target.value); setPage(1) }}
              className="w-full rounded-[8px] border border-border/60 bg-white px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-gold appearance-none cursor-pointer"
            >
              <option value="">الكل</option>
              <option value="true">معتمدة</option>
              <option value="false">بانتظار الموافقة</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-accent-gold" />
          </div>
        ) : !pageData || pageData.data.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <Star size={40} className="mx-auto mb-3 opacity-40" />
            <p>لا توجد آراء</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-border/40">
              {pageData.data.map((t) => (
                <div key={t.id} className="px-4 py-4 hover:bg-gray-50/50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-text-dark">{t.name}</span>
                        {t.role && (
                          <span className="text-xs text-text-muted">- {t.role}</span>
                        )}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          t.approved
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }`}>
                          {t.approved ? <CheckCircle size={10} /> : <XCircle size={10} />}
                          {t.approved ? "معتمدة" : "بانتظار الموافقة"}
                        </span>
                        {t.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-gold/10 text-accent-gold border border-accent-gold/20">
                            ★ مميز
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-muted mt-1.5 line-clamp-2">{t.content}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {t.rating && <div className="flex items-center">{renderStars(t.rating)}</div>}
                        <span className="text-[11px] text-text-muted">{formatDate(t.createdAt)}</span>
                      </div>
                      {t.source && (
                        <span className="text-[11px] text-text-muted mt-1 block">المصدر: {t.source}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {actionLoading === t.id ? (
                        <Loader2 size={16} className="animate-spin text-text-muted" />
                      ) : (
                        <>
                          {!t.approved ? (
                            <button
                              onClick={() => toggleApproval(t, true)}
                              className="p-1.5 rounded-lg hover:bg-success/10 transition text-success"
                              title="اعتماد"
                            >
                              <ThumbsUp size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleApproval(t, false)}
                              className="p-1.5 rounded-lg hover:bg-warning/10 transition text-warning"
                              title="إلغاء الاعتماد"
                            >
                              <ThumbsDown size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteConfirm(t.id)}
                            className="p-1.5 rounded-lg hover:bg-error/10 transition text-error"
                            title="حذف"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pageData.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                <span className="text-xs text-text-muted">إجمالي {pageData.total} رأي</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-1.5 rounded-[6px] hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={16} className="text-text-muted" />
                  </button>
                  <span className="text-xs text-text-muted px-2">{pageData.page} من {pageData.totalPages}</span>
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
        {deleteConfirm && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setDeleteConfirm(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="bg-white rounded-xl border border-border/60 shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={24} className="text-error" />
                </div>
                <h3 className="text-lg font-heading font-bold text-primary mb-2">تأكيد الحذف</h3>
                <p className="text-sm text-text-muted mb-6">هل أنت متأكد من حذف هذا الرأي؟ لا يمكن التراجع عن هذا الإجراء.</p>
                <div className="flex items-center gap-3 justify-center">
                  <Button variant="outline" size="md" onClick={() => setDeleteConfirm(null)}>إلغاء</Button>
                  <Button variant="primary" size="md" onClick={() => handleDelete(deleteConfirm)} disabled={deleting} className="gap-2 bg-error hover:bg-error/90">
                    {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    حذف
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
