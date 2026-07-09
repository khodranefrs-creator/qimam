import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminSession, errorResponse, successResponse } from "@/app/admin/api-helpers"

export async function GET(request: NextRequest) {
  try {
    await getAdminSession()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")))
    const approved = searchParams.get("approved")
    const search = searchParams.get("search")

    const where: any = {}
    if (approved === "true") where.approved = true
    else if (approved === "false") where.approved = false
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.testimonial.count({ where }),
    ])

    return successResponse({ data, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء جلب آراء العملاء", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    await getAdminSession()
    const body = await request.json()
    const { name, role, content, rating, source, sourceUrl, featured, approved } = body

    if (!name || !content) {
      return errorResponse("الاسم والمحتوى مطلوبان")
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role: role || null,
        content,
        rating: rating ? parseInt(rating) : null,
        source: source || null,
        sourceUrl: sourceUrl || null,
        featured: featured === true,
        approved: approved === true,
      },
    })

    return successResponse(testimonial, 201)
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء إضافة الرأي", 500)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await getAdminSession()
    const body = await request.json()
    const { ids, approved } = body

    if (!Array.isArray(ids) || ids.length === 0) {
      return errorResponse("يرجى تحديد رأي واحد على الأقل")
    }
    if (typeof approved !== "boolean") {
      return errorResponse("قيمة الموافقة غير صالحة")
    }

    await prisma.testimonial.updateMany({
      where: { id: { in: ids } },
      data: { approved },
    })

    return successResponse({ success: true, updatedCount: ids.length })
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء تحديث آراء العملاء", 500)
  }
}
