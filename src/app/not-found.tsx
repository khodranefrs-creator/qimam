import Link from "next/link";
import { Search } from "lucide-react";
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export default async function NotFound() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return (
    <div className="relative min-h-screen bg-primary flex flex-col items-center justify-center overflow-hidden">
      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #C6A15B 12%, transparent 12.5%, transparent 87%, #C6A15B 87.5%, #C6A15B),
            linear-gradient(150deg, #C6A15B 12%, transparent 12.5%, transparent 87%, #C6A15B 87.5%, #C6A15B),
            linear-gradient(30deg, #C6A15B 12%, transparent 12.5%, transparent 87%, #C6A15B 87.5%, #C6A15B),
            linear-gradient(150deg, #C6A15B 12%, transparent 12.5%, transparent 87%, #C6A15B 87.5%, #C6A15B),
            linear-gradient(60deg, rgba(198,161,91,0.08) 25%, transparent 25.5%, transparent 75%, rgba(198,161,91,0.08) 75%, rgba(198,161,91,0.08))
          `,
          backgroundSize: "80px 140px",
        }}
      />

      {/* Gold gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        {/* Large 404 */}
        <h1 className="text-[120px] md:text-[180px] font-heading font-bold leading-none mb-2">
          <span className="gradient-text-gold">404</span>
        </h1>

        {/* Diamond divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-accent-gold/60" />
          <span className="text-accent-gold text-lg">◆</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-accent-gold/60" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-3">
          {t.notFound.title}
        </h2>

        {/* Description */}
        <p className="text-text-muted text-muted-on-dark text-lg mb-8 leading-relaxed">
          {t.notFound.desc}
        </p>

        {/* Search bar */}
        <form action="/blog" className="relative mb-10 max-w-sm mx-auto">
          <button type="submit" aria-label={t.common.search} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent-gold transition-colors" tabIndex={-1}>
            <Search className="w-5 h-5" />
          </button>
          <input
            type="text"
            name="q"
            placeholder={t.common.search}
            className="w-full h-12 bg-primary-light/60 border border-border-dark/50 rounded-control pr-12 pl-4 text-text-light placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-all"
          />
        </form>

        {/* Navigation links */}
        <nav className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 px-6 rounded-control bg-accent-gold text-primary text-sm font-medium hover:bg-accent-gold/90 transition-colors"
          >
            {t.notFound.home}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-11 px-6 rounded-control border border-accent-gold/30 text-accent-gold text-sm font-medium hover:bg-accent-gold/10 transition-colors"
          >
            {t.notFound.services}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-control border border-border-dark/50 text-text-muted text-sm font-medium hover:border-accent-gold/30 hover:text-accent-gold transition-colors"
          >
            {t.notFound.contact}
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-text-muted/40 text-xs">
        &copy; {new Date().getFullYear()} {t.site.fullName}
      </div>
    </div>
  );
}
