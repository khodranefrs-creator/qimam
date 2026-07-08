import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { SkipToContent } from "@/components/shared";
import { ScrollToTop } from "@/components/shared";
import { WhatsAppButton } from "@/components/shared";
import { getLocale } from "@/i18n/get-locale";
import { localeDirections } from "@/i18n/config";
import { getTranslations } from "@/i18n/get-translations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);

  return {
    title: {
      template: `%s | ${t.site.fullName}`,
      default: t.site.fullName,
    },
    description: `${t.site.fullName} — ${t.site.tagline} في مكة المكرمة. ${t.footer.description}`,
    openGraph: {
      title: t.site.fullName,
      description: `${t.site.fullName} — ${t.site.tagline} في مكة المكرمة.`,
      url: siteUrl,
      siteName: t.site.fullName,
      locale: locale === 'ar' ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t.site.fullName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.site.fullName,
      description: `${t.site.fullName} — ${t.site.tagline} في مكة المكرمة.`,
      images: [`${siteUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = localeDirections[locale];
  const t = getTranslations(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t.site.fullName,
    alternateName: "Qimam Al-Yaqin Law Firm",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    telephone: "+966565555437",
    address: {
      "@type": "PostalAddress",
      streetAddress: "شارع النسيم العام",
      addressLocality: "مكة المكرمة",
      addressRegion: "مكة المكرمة",
      postalCode: "24221",
      addressCountry: "SA",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "85",
      bestRating: "5",
    },
    priceRange: "$$",
    areaServed: "SA",
    sameAs: ["https://wa.me/966565555437"],
    hasMap: `https://www.google.com/maps/search/?api=1&query=شارع+النسيم+العام+مكة+المكرمة`,
  };

  return (
    <html dir={dir} lang={locale} className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-full flex flex-col font-body antialiased ${dir === 'ltr' ? 'text-left' : ''}`} style={{ fontFamily: "'Tajawal', sans-serif" }}>
        <Providers>
          <SkipToContent />
          <Header />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <WhatsAppButton />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
