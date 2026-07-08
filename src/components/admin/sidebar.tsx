"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, FileText, Newspaper, Briefcase, Scale,
  Handshake, Star, HelpCircle, CalendarClock, Mail,
  Image, Search, Users, Download, ChevronDown, X,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/admin/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/consultations", label: "الاستشارات", icon: CalendarClock },
  { href: "/admin/messages", label: "الرسائل", icon: Mail },
  { href: "/admin/blog", label: "المقالات", icon: Newspaper },
  { href: "/admin/testimonials", label: "آراء العملاء", icon: Star },
  { href: "/admin/faqs", label: "الأسئلة الشائعة", icon: HelpCircle },
  { href: "/admin/settings", label: "الإعدادات", icon: Search },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={cn(
        "fixed lg:static inset-y-0 right-0 z-50 w-64 bg-primary border-l border-border-dark transform transition-transform duration-300 flex flex-col",
        open ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-border-dark shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center">
              <span className="text-sm font-heading font-bold text-accent-gold">ق</span>
            </div>
            <div>
              <div className="text-sm font-heading font-bold text-white leading-tight">قمم اليقين</div>
              <div className="text-[10px] text-accent-gold-light/60">لوحة التحكم</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-accent-gold lg:hidden transition">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                  active
                    ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <item.icon size={18} className={cn("shrink-0", active ? "text-accent-gold" : "text-gray-500 group-hover:text-accent-gold transition")} />
                <span>{item.label}</span>
                {active && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-accent-gold" />}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-border-dark shrink-0">
          <div className="text-[10px] text-gray-600 text-center">v1.0.0 &copy; {new Date().getFullYear()}</div>
        </div>
      </aside>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-30 lg:hidden w-12 h-12 rounded-full bg-accent-gold text-primary shadow-lg flex items-center justify-center"
      >
        <ChevronDown size={20} className="rotate-90" />
      </button>
    </>
  )
}
