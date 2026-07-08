import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { SkipToContent } from "@/components/shared";
import { ScrollToTop } from "@/components/shared";
import { WhatsAppButton } from "@/components/shared";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    template: "%s | شركة قمم اليقين للمحاماة",
    default: "شركة قمم اليقين للمحاماة والاستشارات القانونية",
  },
  description:
    "شركة قمم اليقين للمحاماة والاستشارات القانونية — خبرة قانونية رفيعة في مكة المكرمة. نقدم حلولاً قانونية متكاملة في القضايا التجارية والمدنية والجزائية.",
  openGraph: {
    title: "شركة قمم اليقين للمحاماة والاستشارات القانونية",
    description:
      "شركة قمم اليقين للمحاماة والاستشارات القانونية — خبرة قانونية رفيعة في مكة المكرمة.",
    url: siteUrl,
    siteName: "شركة قمم اليقين للمحاماة والاستشارات القانونية",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "شركة قمم اليقين للمحاماة والاستشارات القانونية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة قمم اليقين للمحاماة والاستشارات القانونية",
    description:
      "شركة قمم اليقين للمحاماة والاستشارات القانونية — خبرة قانونية رفيعة في مكة المكرمة.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "شركة قمم اليقين للمحاماة والاستشارات القانونية",
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
    <html dir="rtl" lang="ar" className="h-full">
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
      <body className="min-h-full flex flex-col font-body antialiased" style={{ fontFamily: "'Tajawal', sans-serif" }}>
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
