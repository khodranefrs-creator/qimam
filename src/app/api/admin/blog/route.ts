import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminSession, errorResponse, successResponse } from "@/app/admin/api-helpers"
import sanitizeHtml from "sanitize-html"

export async function GET(request: NextRequest) {
  try {
    await getAdminSession()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")))
    const published = searchParams.get("published")
    const search = searchParams.get("search")

    const where: any = {}
    if (published === "true") where.published = true
    else if (published === "false") where.published = false
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ])

    return successResponse({ data, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء جلب المقالات", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    await getAdminSession()
    const body = await request.json()
    const { title, slug, excerpt, content, coverImage, category, tags, author, metaTitle, metaDescription, ogImage, published, featured } = body

    if (!title || !title.trim()) return errorResponse("عنوان المقال مطلوب")
    if (!slug || !slug.trim()) return errorResponse("الرابط المختصر مطلوب")

    const existing = await prisma.blogPost.findUnique({ where: { slug: slug.trim() } })
    if (existing) return errorResponse("الرابط المختصر مستخدم مسبقاً")

    const post = await prisma.blogPost.create({
      data: {
        title: sanitizeHtml(title.trim()),
        slug: slug.trim(),
        excerpt: excerpt ? sanitizeHtml(excerpt.trim()) : null,
        content: sanitizeHtml(content || ""),
        coverImage: coverImage || null,
        category: category || null,
        tags: tags || null,
        author: author || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        ogImage: ogImage || null,
        published: published || false,
        featured: featured || false,
      },
    })

    return successResponse(post, 201)
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    if (error.code === "P2002") return errorResponse("الرابط المختصر مستخدم مسبقاً")
    return errorResponse("حدث خطأ أثناء إنشاء المقال", 500)
  }
}
