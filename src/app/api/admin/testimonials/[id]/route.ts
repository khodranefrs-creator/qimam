import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminSession, errorResponse, successResponse } from "@/app/admin/api-helpers"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getAdminSession()
    const { id } = await params
    const body = await request.json()
    const { approved, featured, name, role, content, rating, source, sourceUrl } = body

    const existing = await prisma.testimonial.findUnique({ where: { id } })
    if (!existing) return errorResponse("الرأي غير موجود", 404)

    const updateData: any = {}
    if (approved !== undefined) updateData.approved = approved
    if (featured !== undefined) updateData.featured = featured
    if (name !== undefined) updateData.name = name
    if (role !== undefined) updateData.role = role
    if (content !== undefined) updateData.content = content
    if (rating !== undefined) updateData.rating = rating
    if (source !== undefined) updateData.source = source
    if (sourceUrl !== undefined) updateData.sourceUrl = sourceUrl

    const updated = await prisma.testimonial.update({ where: { id }, data: updateData })
    return successResponse(updated)
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء تحديث الرأي", 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getAdminSession()
    const { id } = await params

    const existing = await prisma.testimonial.findUnique({ where: { id } })
    if (!existing) return errorResponse("الرأي غير موجود", 404)

    await prisma.testimonial.delete({ where: { id } })
    return successResponse({ success: true })
  } catch (error: any) {
    if (error.message === "Unauthorized") return errorResponse("غير مصرح", 401)
    return errorResponse("حدث خطأ أثناء حذف الرأي", 500)
  }
}
