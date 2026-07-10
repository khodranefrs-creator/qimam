'use client'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Edit2, Trash2, X, Loader2, Check, Eye, EyeOff, Save, ChevronLeft, ChevronRight, ExternalLink, FileText, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  coverImage: string | null
  category: string | null
  tags: any
  author: string | null
  readingTime: number | null
  metaTitle: string | null
  metaDescription: string | null
  ogImage: string | null
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface PageData {
  data: BlogPost[]
  total: number
  page: number
  limit: number
  totalPages: number
}

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "",
  tags: "",
  author: "",
  metaTitle: "",
  metaDescription: "",
  ogImage: "",
  published: false,
  featured: false,
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function AdminBlogPage() {
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [publishedFilter, setPublishedFilter] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [form, setForm] = useState<Record<string, any>>(emptyPost)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", page.toString())
      params.set("limit", "20")
      if (publishedFilter) params.set("published", publishedFilter)
      if (searchQuery) params.set("search", searchQuery)

      const res = await fetch(`/api/admin/blog?${params}`)
      const json = await res.json()
      if (res.ok) setPageData(json)
    } catch {
      setPageData(null)
    } finally {
      setLoading(false)
    }
  }, [page, publishedFilter, searchQuery])

  useEffect(() => { fetchData() }, [fetchData])

  function openCreateModal() {
    setEditingPost(null)
    setForm(emptyPost)
    setFormError("")
    setModalOpen(true)
  }

  function openEditModal(post: BlogPost) {
    setEditingPost(post)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      coverImage: post.coverImage || "",
      category: post.category || "",
      tags: post.tags ? (Array.isArray(post.tags) ? post.tags.join(", ") : "") : "",
      author: post.author || "",
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
      ogImage: post.ogImage || "",
      published: post.published,
      featured: post.featured,
    })
    setFormError("")
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingPost(null)
  }

  function updateForm(field: string, value: any) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === "title" && !editingPost) {
        next.slug = slugify(value)
      }
      return next
    })
    setFormError("")
  }

  async function handleSave() {
    setSaving(true)
    setFormError("")
    try {
      const body: any = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        coverImage: form.coverImage || null,
        category: form.category || null,
        tags: form.tags ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : null,
        author: form.author || null,
        metaTitle: form.metaTitle || null,
        metaDescription: form.metaDescription || null,
        ogImage: form.ogImage || null,
        published: form.published,
        featured: form.featured,
      }

      let res
      if (editingPost) {
        res = await fetch(`/api/admin/blog/${editingPost.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      } else {
        res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }

      const data = await res.json()
      if (res.ok) {
        closeModal()
        fetchData()
      } else {
        setFormError(data.error || "حدث خطأ")
      }
    } catch {
      setFormError("حدث خطأ في الاتصال")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" })
      if (res.ok) {
        setDeleteConfirm(null)
        fetchData()
      }
    } catch {}
    setDeleting(false)
  }

  async function togglePublished(post: BlogPost) {
    try {
      await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      })
      fetchData()
    } catch {}
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">المقالات</h1>
          <p className="text-text-muted text-sm mt-1">إدارة مقالات المدونة</p>
        </div>
        <Button variant="primary" size="md" onClick={openCreateModal} className="gap-2">
          <Plus size={16} />
          مقال جديد
        </Button>
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
                placeholder="بحث بالعنوان..."
                className="w-full rounded-control border border-border/60 bg-white px-3 py-2 pr-9 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-text-muted mb-1">الحالة</label>
            <select
              value={publishedFilter}
              onChange={(e) => { setPublishedFilter(e.target.value); setPage(1) }}
              className="w-full rounded-control border border-border/60 bg-white px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-gold appearance-none cursor-pointer"
            >
              <option value="">الكل</option>
              <option value="true">منشور</option>
              <option value="false">مسودة</option>
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
            <FileText size={40} className="mx-auto mb-3 opacity-40" />
            <p>لا توجد مقالات</p>
            <button onClick={openCreateModal} className="text-accent-gold hover:underline text-sm mt-2">إنشاء أول مقال</button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-gray-50/50">
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">العنوان</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">التصنيف</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">الحالة</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">مميز</th>
                    <th className="text-right px-4 py-3 font-medium text-text-muted text-xs">التاريخ</th>
                    <th className="text-left px-4 py-3 font-medium text-text-muted text-xs">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.data.map((post) => (
                    <tr key={post.id} className="border-b border-border/40 hover:bg-gray-50/50 transition">
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-medium text-text-dark">{post.title}</span>
                          <div className="text-[11px] text-text-muted mt-0.5">/{post.slug}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-muted">{post.category || "-"}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => togglePublished(post)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                            post.published
                              ? "bg-success/10 text-success border-success/20 hover:bg-success/20"
                              : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20"
                          }`}
                        >
                          {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                          {post.published ? "منشور" : "مسودة"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        {post.featured ? (
                          <span className="text-accent-gold text-xs">★ مميز</span>
                        ) : (
                          <span className="text-text-muted text-xs">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-text-muted text-xs">{formatDate(post.createdAt)}</td>
                      <td className="px-4 py-3 text-left">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditModal(post)}
                            className="p-1.5 rounded-lg hover:bg-accent-gold/10 transition text-accent-gold"
                            title="تعديل"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(post.id)}
                            className="p-1.5 rounded-lg hover:bg-error/10 transition text-error"
                            title="حذف"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pageData.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                <span className="text-xs text-text-muted">إجمالي {pageData.total} مقال</span>
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
        {modalOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={closeModal} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto"
            >
              <div className="bg-white rounded-xl border border-border/60 shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-border/60 px-6 py-4 flex items-center justify-between z-10 rounded-t-xl">
                  <h2 className="text-lg font-heading font-bold text-primary">
                    {editingPost ? "تعديل المقال" : "مقال جديد"}
                  </h2>
                  <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                    <X size={20} className="text-text-muted" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-dark mb-1">العنوان <span className="text-error">*</span></label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => updateForm("title", e.target.value)}
                        placeholder="عنوان المقال"
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">الرابط المختصر <span className="text-error">*</span></label>
                      <input
                        type="text"
                        value={form.slug}
                        onChange={(e) => updateForm("slug", e.target.value)}
                        placeholder="post-slug"
                        dir="ltr"
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">التصنيف</label>
                      <input
                        type="text"
                        value={form.category}
                        onChange={(e) => updateForm("category", e.target.value)}
                        placeholder="مثلاً: قضايا تجارية"
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-dark mb-1">نبذة مختصرة</label>
                      <textarea
                        value={form.excerpt}
                        onChange={(e) => updateForm("excerpt", e.target.value)}
                        placeholder="نبذة قصيرة عن المقال..."
                        rows={2}
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-dark mb-1">المحتوى <span className="text-error">*</span></label>
                      <textarea
                        value={form.content}
                        onChange={(e) => updateForm("content", e.target.value)}
                        placeholder="اكتب محتوى المقال هنا..."
                        rows={12}
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">المؤلف</label>
                      <input
                        type="text"
                        value={form.author}
                        onChange={(e) => updateForm("author", e.target.value)}
                        placeholder="اسم الكاتب"
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">الكلمات المفتاحية</label>
                      <input
                        type="text"
                        value={form.tags}
                        onChange={(e) => updateForm("tags", e.target.value)}
                        placeholder="قانون, محاماة (مفصولة بفاصلة)"
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">رابط الصورة الرئيسية</label>
                      <input
                        type="text"
                        value={form.coverImage}
                        onChange={(e) => updateForm("coverImage", e.target.value)}
                        placeholder="https://..."
                        dir="ltr"
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">رابط الصورة لـ OG</label>
                      <input
                        type="text"
                        value={form.ogImage}
                        onChange={(e) => updateForm("ogImage", e.target.value)}
                        placeholder="https://..."
                        dir="ltr"
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-dark mb-1">عنوان SEO</label>
                      <input
                        type="text"
                        value={form.metaTitle}
                        onChange={(e) => updateForm("metaTitle", e.target.value)}
                        placeholder="عنوان لمحركات البحث"
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-dark mb-1">وصف SEO</label>
                      <textarea
                        value={form.metaDescription}
                        onChange={(e) => updateForm("metaDescription", e.target.value)}
                        placeholder="وصف لمحركات البحث"
                        rows={2}
                        className="w-full rounded-control border border-border/60 bg-white px-4 py-2.5 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.published}
                            onChange={(e) => updateForm("published", e.target.checked)}
                            className="w-4 h-4 rounded border-border/60 text-accent-gold focus:ring-accent-gold"
                          />
                          <span className="text-sm text-text-dark">منشور</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(e) => updateForm("featured", e.target.checked)}
                            className="w-4 h-4 rounded border-border/60 text-accent-gold focus:ring-accent-gold"
                          />
                          <span className="text-sm text-text-dark">مميز</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {formError && (
                    <div className="text-sm text-error bg-error/5 border border-error/20 rounded-control px-4 py-2">
                      {formError}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <Button variant="outline" size="md" onClick={closeModal}>إلغاء</Button>
                    <Button variant="primary" size="md" onClick={handleSave} disabled={saving} className="gap-2">
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {editingPost ? "حفظ التغييرات" : "نشر المقال"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                <p className="text-sm text-text-muted mb-6">هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.</p>
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
