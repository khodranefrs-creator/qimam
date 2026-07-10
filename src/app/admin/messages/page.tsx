'use client'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Mail, MailOpen, Archive, ArchiveRestore, ChevronLeft, ChevronRight, X, Loader2, User, Phone, Calendar, Clock, FileText, Inbox, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactMessage {
  id: string
  name: string
  phone: string | null
  email: string
  subject: string | null
  message: string
  read: boolean
  replied: boolean
  archived: boolean
  createdAt: string
  updatedAt: string
}

interface PageData {
  data: ContactMessage[]
  total: number
  page: number
  limit: number
  totalPages: number
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

export default function AdminMessagesPage() {
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [readFilter, setReadFilter] = useState<string>("")
  const [archivedFilter, setArchivedFilter] = useState<string>("false")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", page.toString())
      params.set("limit", "20")
      if (readFilter) params.set("read", readFilter)
      if (archivedFilter) params.set("archived", archivedFilter)
      if (searchQuery) params.set("search", searchQuery)

      const res = await fetch(`/api/admin/messages?${params}`)
      const json = await res.json()
      if (res.ok) setPageData(json)
    } catch {
      setPageData(null)
    } finally {
      setLoading(false)
    }
  }, [page, readFilter, archivedFilter, searchQuery])

  useEffect(() => { fetchData() }, [fetchData])

  function openDetail(msg: ContactMessage) {
    setSelectedMessage(msg)
    setDetailOpen(true)
    if (!msg.read) markRead(msg)
  }

  function closeDetail() {
    setDetailOpen(false)
    setSelectedMessage(null)
  }

  async function markRead(msg: ContactMessage) {
    try {
      await fetch(`/api/admin/messages/${msg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      })
      fetchData()
    } catch {}
  }

  async function toggleArchive(msg: ContactMessage) {
    setActionLoading(true)
    try {
      await fetch(`/api/admin/messages/${msg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived: !msg.archived }),
      })
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage((prev) => prev ? { ...prev, archived: !prev.archived } : prev)
      }
      fetchData()
    } catch {}
    setActionLoading(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">الرسائل الواردة</h1>
          <p className="text-text-muted text-sm mt-1">رسائل التواصل من الزوار</p>
        </div>
      </div>

      <div className="bg-white rounded-panel border border-border/60 shadow-subtle p-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-text-muted mb-1">بحث</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
                placeholder="بحث بالاسم أو البريد أو الموضوع..."
                className="w-full rounded-control border border-border/60 bg-white px-3 py-2 pr-9 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </div>
          <div className="w-36">
            <label className="block text-xs font-medium text-text-muted mb-1">الحالة</label>
            <select
              value={readFilter}
              onChange={(e) => { setReadFilter(e.target.value); setPage(1) }}
              className="w-full rounded-control border border-border/60 bg-white px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-gold appearance-none cursor-pointer"
            >
              <option value="">الكل</option>
              <option value="false">غير مقروءة</option>
              <option value="true">مقروءة</option>
            </select>
          </div>
          <div className="w-36">
            <label className="block text-xs font-medium text-text-muted mb-1">الأرشيف</label>
            <select
              value={archivedFilter}
              onChange={(e) => { setArchivedFilter(e.target.value); setPage(1) }}
              className="w-full rounded-control border border-border/60 bg-white px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-gold appearance-none cursor-pointer"
            >
              <option value="false">غير مؤرشفة</option>
              <option value="true">مؤرشفة</option>
              <option value="">الكل</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-panel border border-border/60 shadow-subtle overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-accent-gold" />
          </div>
        ) : !pageData || pageData.data.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <Inbox size={40} className="mx-auto mb-3 opacity-40" />
            <p>لا توجد رسائل</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-border/40">
              {pageData.data.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => openDetail(msg)}
                  className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition hover:bg-gray-50/50 ${
                    !msg.read ? "bg-accent-gold/[0.02]" : ""
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {msg.read ? (
                      <MailOpen size={18} className="text-text-muted" />
                    ) : (
                      <Mail size={18} className="text-accent-gold" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm truncate ${!msg.read ? "font-bold text-text-dark" : "font-medium text-text-dark"}`}>
                        {msg.name}
                      </span>
                      <span className="text-[11px] text-text-muted shrink-0">{formatDate(msg.createdAt)}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${!msg.read ? "font-medium text-text-dark" : "text-text-muted"}`}>
                      {msg.subject || "(بدون موضوع)"}
                    </p>
                    <p className="text-xs text-text-muted truncate mt-0.5">{msg.message.substring(0, 100)}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {msg.archived && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-warning/10 text-warning border border-warning/20">مؤرشف</span>
                    )}
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-accent-gold" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {pageData.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                <span className="text-xs text-text-muted">إجمالي {pageData.total} رسالة</span>
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
        {detailOpen && selectedMessage && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={closeDetail} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto"
            >
              <div className="bg-white rounded-xl border border-border/60 shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-border/60 px-6 py-4 flex items-center justify-between z-10 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-heading font-bold text-primary">تفاصيل الرسالة</h2>
                    {!selectedMessage.read && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-gold/10 text-accent-gold border border-accent-gold/20">جديد</span>
                    )}
                  </div>
                  <button onClick={closeDetail} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                    <X size={20} className="text-text-muted" />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  <div className="bg-gray-50 rounded-panel border border-border/60 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-accent-gold" />
                      <span className="font-medium text-text-dark">{selectedMessage.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Mail size={14} />
                      {selectedMessage.email}
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 text-sm text-text-muted" dir="ltr">
                        <Phone size={14} />
                        {selectedMessage.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Calendar size={14} />
                      {formatDate(selectedMessage.createdAt)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-text-dark mb-2">
                      {selectedMessage.subject || "(بدون موضوع)"}
                    </h3>
                    <div className="bg-gray-50 rounded-panel border border-border/60 p-4">
                      <p className="text-sm text-text-dark leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={closeDetail}
                    >
                      إغلاق
                    </Button>
                    <Button
                      variant={selectedMessage.archived ? "secondary" : "primary"}
                      size="md"
                      onClick={() => toggleArchive(selectedMessage)}
                      disabled={actionLoading}
                      className="gap-2"
                    >
                      {actionLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : selectedMessage.archived ? (
                        <ArchiveRestore size={16} />
                      ) : (
                        <Archive size={16} />
                      )}
                      {selectedMessage.archived ? "إلغاء الأرشفة" : "أرشفة"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
