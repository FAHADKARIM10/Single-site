import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE_DOMAIN, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { JsonLd, organizationSchema, webSiteSchema } from "@/components/seo/JsonLd";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DOMAIN),
  title: {
    default: `${SITE_NAME} — Casino & Real-Earning Game Reviews for Pakistan`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
      </head>
      <body className="min-h-screen flex flex-col">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
