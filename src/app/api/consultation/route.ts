import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rate-limit"
import { sendAdminNotification, sendClientConfirmation } from "@/lib/email"

const consultationSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  phone: z.string().min(7, "رقم الهاتف غير صحيح"),
  email: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  practiceAreaId: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  details: z.string().optional(),
  contactMethod: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, { message: "يجب الموافقة على سياسة الخصوصية" }),
})

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const rl = rateLimit({ identifier: `consultation:${ip}`, maxRequests: 3, windowMs: 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "طلبات كثيرة جداً. الرجاء الانتظار دقيقة قبل المحاولة مرة أخرى." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    )
  }

  try {
    const body = await request.json()
    const parsed = consultationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "بيانات غير صحيحة", details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { name, phone, email, practiceAreaId, preferredDate, preferredTime, details, contactMethod, consent } = parsed.data

    const consultation = await prisma.consultation.create({
      data: {
        name,
        phone,
        email: email || null,
        practiceAreaId: practiceAreaId || null,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime: preferredTime || null,
        details: details || null,
        contactMethod: contactMethod || null,
        consent,
      },
      include: { practiceArea: { select: { title: true } } },
    })

    const emailData = {
      name: consultation.name,
      phone: consultation.phone,
      email: consultation.email,
      practiceAreaTitle: consultation.practiceArea?.title || null,
      preferredDate: consultation.preferredDate,
      preferredTime: consultation.preferredTime,
      details: consultation.details,
      contactMethod: consultation.contactMethod,
    }

    Promise.all([
      sendAdminNotification(emailData),
      sendClientConfirmation(emailData),
    ]).catch((err) => console.warn('[consultation] Email notification error:', err))

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
