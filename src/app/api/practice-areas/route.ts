import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const areas = await prisma.practiceArea.findMany({
      where: { published: true },
      select: { id: true, title: true, slug: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(areas)
  } catch {
    return NextResponse.json({ error: "حدث خطأ أثناء جلب التخصصات" }, { status: 500 })
  }
}
