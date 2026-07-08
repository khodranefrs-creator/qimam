import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminSession, errorResponse, successResponse } from "@/app/admin/api-helpers"

export async function GET(request: NextRequest) {
  try {
    await getAdminSession()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")))
    const archived = searchParams.get("archived")
    const read = searchParams.get("read")
    const search = searchParams.get("search")

    const where: any = {}
    if (archived === "true") where.archived = true
    else if (archived === "false" || !archived) where.archived = false
    if (read === "true") where.read = true
    else if (read === "false") where.read = false
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ])

    return successResponse({ data, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء جلب الرسائل", 500)
  }
}
