import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminSession, errorResponse, successResponse } from "@/app/admin/api-helpers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getAdminSession()
    const { id } = await params
    const consultation = await prisma.consultation.findUnique({
      where: { id },
      include: { practiceArea: { select: { id: true, title: true } } },
    })
    if (!consultation) return errorResponse("الاستشارة غير موجودة", 404)
    return successResponse(consultation)
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء جلب الاستشارة", 500)
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getAdminSession()
    const { id } = await params
    const body = await request.json()
    const { status, adminNotes } = body

    const existing = await prisma.consultation.findUnique({ where: { id } })
    if (!existing) return errorResponse("الاستشارة غير موجودة", 404)

    if (status && !["PENDING", "CONFIRMED", "RESCHEDULED", "CANCELLED", "COMPLETED"].includes(status)) {
      return errorResponse("حالة غير صالحة")
    }

    const updated = await prisma.consultation.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
      include: { practiceArea: { select: { id: true, title: true } } },
    })

    return successResponse(updated)
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء تحديث الاستشارة", 500)
  }
}
