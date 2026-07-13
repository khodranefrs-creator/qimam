import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rate-limit"

const careerSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().optional(),
  position: z.string().min(2, "الوظيفة مطلوبة"),
  coverLetter: z.string().optional(),
})

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const rl = rateLimit({ identifier: `careers:${ip}`, maxRequests: 3, windowMs: 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "طلبات كثيرة جداً. الرجاء الانتظار دقيقة قبل المحاولة مرة أخرى." },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const parsed = careerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "بيانات غير صحيحة", details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { name, email, phone, position, coverLetter } = parsed.data

    await prisma.careerApplication.create({
      data: {
        name,
        email,
        phone: phone || null,
        position,
        coverLetter: coverLetter || null,
      },
    })

    return NextResponse.json(
      { message: "تم إرسال طلب التوظيف بنجاح. سنتواصل معك في حال كانت مؤهلاتك مناسبة." },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى." },
      { status: 500 }
    )
  }
}
