import type { Metadata } from "next";
import { Header, SiteFooter } from "@/components/SiteChrome";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pravarontechnologies.com"),
  title: {
    default: "Pravaron Technologies Pvt. Ltd.",
    template: "%s — Pravaron Technologies"
  },
  description:
    "Agentic AI infrastructure, automation systems, custom software, AI integration, and technology strategy for future-ready businesses.",
  openGraph: {
    title: "Pravaron Technologies Pvt. Ltd.",
    description:
      "Pravaron builds intelligent AI-native systems that automate work, improve decisions, and help businesses operate with Agentic AI."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <SmoothScroll />
          <Header />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
