import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminSession, errorResponse, successResponse } from "@/app/admin/api-helpers"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getAdminSession()
    const { id } = await params
    const body = await request.json()
    const { read, replied, archived } = body

    const existing = await prisma.contactMessage.findUnique({ where: { id } })
    if (!existing) return errorResponse("الرسالة غير موجودة", 404)

    const updateData: any = {}
    if (read !== undefined) updateData.read = read
    if (replied !== undefined) updateData.replied = replied
    if (archived !== undefined) updateData.archived = archived

    const updated = await prisma.contactMessage.update({ where: { id }, data: updateData })
    return successResponse(updated)
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء تحديث الرسالة", 500)
  }
}
