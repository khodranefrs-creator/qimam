import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminSession, errorResponse, successResponse } from "@/app/admin/api-helpers"
import { Prisma } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    await getAdminSession()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")))
    const status = searchParams.get("status")
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const search = searchParams.get("search")

    const where: Prisma.ConsultationWhereInput = {}
    if (status && ["PENDING", "CONFIRMED", "RESCHEDULED", "CANCELLED", "COMPLETED"].includes(status)) {
      where.status = status as any
    }
    if (from || to) {
      where.createdAt = {}
      if (from) where.createdAt.gte = new Date(from)
      if (to) where.createdAt.lte = new Date(to + "T23:59:59.999Z")
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        include: { practiceArea: { select: { id: true, title: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.consultation.count({ where }),
    ])

    return successResponse({ data, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء جلب الاستشارات", 500)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await getAdminSession()
    const body = await request.json()
    const { ids, status } = body

    if (!Array.isArray(ids) || ids.length === 0) {
      return errorResponse("يرجى تحديد استشارة واحدة على الأقل")
    }
    if (status && !["PENDING", "CONFIRMED", "RESCHEDULED", "CANCELLED", "COMPLETED"].includes(status)) {
      return errorResponse("حالة غير صالحة")
    }

    await prisma.consultation.updateMany({
      where: { id: { in: ids } },
      data: { status: status || undefined },
    })

    return successResponse({ success: true, updatedCount: ids.length })
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء تحديث الاستشارات", 500)
  }
}
