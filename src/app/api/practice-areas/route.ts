import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const fallbackAreas = [
  { slug: "commercial-law", title: "القانون التجاري" },
  { slug: "corporate-law", title: "قانون الشركات وتأسيسها" },
  { slug: "litigation", title: "التقاضي والمرافعات" },
  { slug: "real-estate-law", title: "القانون العقاري" },
  { slug: "family-law", title: "الأحوال الشخصية" },
  { slug: "inheritance-law", title: "المواريث والوصايا" },
]

export async function GET() {
  try {
    const areas = await prisma.practiceArea.findMany({
      where: { published: true },
      select: { id: true, title: true, slug: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(areas)
  } catch {
    const areas = fallbackAreas.map((a, i) => ({
      id: `fallback-${a.slug}`,
      slug: a.slug,
      title: a.title,
    }))
    return NextResponse.json(areas)
  }
}
