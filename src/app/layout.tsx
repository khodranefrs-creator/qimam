import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const headingFont = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

import { Providers } from "@/components/providers";
import { LocaleProvider } from "@/i18n/locale-context";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { SkipToContent } from "@/components/shared";
import { ScrollToTop } from "@/components/shared";
import { WhatsAppButton } from "@/components/shared";
import { StickyConsultBar } from "@/components/shared";
import { getLocale } from "@/i18n/get-locale";
import { localeDirections } from "@/i18n/config";
import { getTranslations } from "@/i18n/get-translations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qimam-lilac.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);

  return {
    title: {
      template: `%s | ${t.site.fullName}`,
      default: t.site.fullName,
    },
    description: `${t.site.fullName} — ${t.site.tagline}${locale === 'ar' ? ' في مكة المكرمة' : ' in Makkah'}. ${t.footer.description}`,
    openGraph: {
      title: t.site.fullName,
      description: `${t.site.fullName} — ${t.site.tagline}${locale === 'ar' ? ' في مكة المكرمة' : ' in Makkah'}.`,
      url: siteUrl,
      siteName: t.site.fullName,
      locale: locale === 'ar' ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: t.site.fullName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.site.fullName,
      description: `${t.site.fullName} — ${t.site.tagline}${locale === 'ar' ? ' في مكة المكرمة' : ' in Makkah'}.`,
      images: [`${siteUrl}/og-image.svg`],
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
    priceRange: "$$",
    areaServed: "SA",
    sameAs: ["https://wa.me/966565555437"],
    hasMap: `https://www.google.com/maps/search/?api=1&query=شارع+النسيم+العام+مكة+المكرمة`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "الخدمات القانونية",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "القانون التجاري" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "قانون الشركات" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "التقاضي والمرافعات" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "القانون العقاري" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "الأحوال الشخصية" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "المواريث والوصايا" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "التحكيم التجاري" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "التوثيق العدلي" } },
      ],
    },
    legalName: t.site.fullName,
  };

  return (
      <html dir={dir} lang={locale} className={`${headingFont.variable} ${bodyFont.variable} min-h-dvh`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" href={siteUrl} hrefLang="x-default" />
        <link rel="alternate" href={siteUrl} hrefLang="ar" />
        <link rel="alternate" href={siteUrl} hrefLang="en" />
      </head>
      <body className={`min-h-dvh flex flex-col font-body antialiased ${dir === 'ltr' ? 'text-left' : ''}`}>
        <Providers>
          <LocaleProvider locale={locale}>
          <SkipToContent locale={locale} />
          <Header />
          <main className="flex-1 pb-24 lg:pb-0 bg-primary" id="main-content">
            {children}
          </main>
          <Footer locale={locale} />
          <ScrollToTop />
          <WhatsAppButton locale={locale} />
          <StickyConsultBar locale={locale} />
          <Toaster />
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}
