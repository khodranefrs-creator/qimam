import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminSession, errorResponse, successResponse } from "@/app/admin/api-helpers"
import sanitizeHtml from "sanitize-html"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getAdminSession()
    const { id } = await params
    const body = await request.json()

    const existing = await prisma.blogPost.findUnique({ where: { id } })
    if (!existing) return errorResponse("المقال غير موجود", 404)

    const { title, slug, excerpt, content, coverImage, category, tags, author, metaTitle, metaDescription, ogImage, published, featured } = body

    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.blogPost.findUnique({ where: { slug: slug.trim() } })
      if (slugExists) return errorResponse("الرابط المختصر مستخدم مسبقاً")
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = sanitizeHtml(title.trim())
    if (slug !== undefined) updateData.slug = slug.trim()
    if (excerpt !== undefined) updateData.excerpt = excerpt ? sanitizeHtml(excerpt.trim()) : null
    if (content !== undefined) updateData.content = sanitizeHtml(content)
    if (coverImage !== undefined) updateData.coverImage = coverImage
    if (category !== undefined) updateData.category = category
    if (tags !== undefined) updateData.tags = tags
    if (author !== undefined) updateData.author = author
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription
    if (ogImage !== undefined) updateData.ogImage = ogImage
    if (published !== undefined) updateData.published = published
    if (featured !== undefined) updateData.featured = featured

    const updated = await prisma.blogPost.update({ where: { id }, data: updateData })
    return successResponse(updated)
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    if (error.code === "P2002") return errorResponse("الرابط المختصر مستخدم مسبقاً")
    return errorResponse("حدث خطأ أثناء تحديث المقال", 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getAdminSession()
    const { id } = await params

    const existing = await prisma.blogPost.findUnique({ where: { id } })
    if (!existing) return errorResponse("المقال غير موجود", 404)

    await prisma.blogPost.delete({ where: { id } })
    return successResponse({ success: true })
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء حذف المقال", 500)
  }
}
