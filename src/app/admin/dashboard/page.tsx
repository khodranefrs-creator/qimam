import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import DashboardClient from "./client"

export default async function AdminDashboardPage() {
  const session = await auth()

  const [
    consultationsThisWeek,
    unreadMessages,
    publishedPosts,
    pendingTestimonials,
    totalConsultations,
    totalMessages,
    totalPosts,
    totalTestimonials,
    recentActivity,
    pendingConsultations,
    confirmedConsultations,
  ] = await Promise.all([
    prisma.consultation.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 86400000) } } }),
    prisma.contactMessage.count({ where: { read: false, archived: false } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.testimonial.count({ where: { approved: false } }),
    prisma.consultation.count(),
    prisma.contactMessage.count({ where: { archived: false } }),
    prisma.blogPost.count(),
    prisma.testimonial.count(),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { user: { select: { name: true, email: true } } } }),
    prisma.consultation.count({ where: { status: "PENDING" } }),
    prisma.consultation.count({ where: { status: "CONFIRMED" } }),
  ])

  const stats = [
    { label: "استشارات هذا الأسبوع", value: consultationsThisWeek, total: totalConsultations, color: "from-accent-gold to-amber-600", icon: "📋" },
    { label: "رسائل غير مقروءة", value: unreadMessages, total: totalMessages, color: "from-info to-blue-600", icon: "✉️" },
    { label: "مقالات منشورة", value: publishedPosts, total: totalPosts, color: "from-success to-green-600", icon: "📝" },
    { label: "آراء بانتظار الموافقة", value: pendingTestimonials, total: totalTestimonials, color: "from-warning to-amber-600", icon: "⭐" },
  ]

  return (
    <DashboardClient
      session={session}
      stats={stats}
      recentActivity={recentActivity}
      pendingConsultations={pendingConsultations}
      confirmedConsultations={confirmedConsultations}
    />
  )
}
