import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const consultationSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  phone: z.string().min(7, "رقم الهاتف غير صحيح"),
  email: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  practiceAreaId: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  details: z.string().optional(),
  contactMethod: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = consultationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "بيانات غير صحيحة", details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { name, phone, email, practiceAreaId, preferredDate, preferredTime, details, contactMethod } = parsed.data

    await prisma.consultation.create({
      data: {
        name,
        phone,
        email: email || null,
        practiceAreaId: practiceAreaId || null,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime: preferredTime || null,
        details: details || null,
        contactMethod: contactMethod || null,
      },
    })

    return NextResponse.json(
      { message: "تم إرسال طلب الاستشارة بنجاح. سنتواصل معك قريباً." },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى." },
      { status: 500 }
    )
  }
}
