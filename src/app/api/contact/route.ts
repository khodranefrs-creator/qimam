import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rate-limit"

const contactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "الرسالة يجب أن تكون ١٠ أحرف على الأقل"),
})

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const rl = rateLimit({ identifier: `contact:${ip}`, maxRequests: 3, windowMs: 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "طلبات كثيرة جداً. الرجاء الانتظار دقيقة قبل المحاولة مرة أخرى." },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "بيانات غير صحيحة", details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message } = parsed.data

    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    })

    return NextResponse.json(
      { message: "تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت." },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى." },
      { status: 500 }
    )
  }
}
