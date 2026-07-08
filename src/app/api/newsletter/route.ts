import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const newsletterSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = newsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "البريد الإلكتروني غير صحيح" },
        { status: 400 }
      )
    }

    const { email } = parsed.data

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    })

    if (existing) {
      if (!existing.active) {
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { active: true },
        })
        return NextResponse.json(
          { message: "تم إعادة تفعيل اشتراكك في النشرة البريدية." },
          { status: 200 }
        )
      }
      return NextResponse.json(
        { message: "البريد الإلكتروني مسجل بالفعل في النشرة البريدية." },
        { status: 200 }
      )
    }

    await prisma.newsletterSubscriber.create({
      data: { email },
    })

    return NextResponse.json(
      { message: "تم الاشتراك في النشرة البريدية بنجاح." },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ. الرجاء المحاولة مرة أخرى." },
      { status: 500 }
    )
  }
}
