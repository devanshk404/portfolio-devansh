import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { PortfolioBackground } from "@/components/PortfolioBackground";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Devansh Kaushik — Strategy, stories & things for the internet",
    template: "%s — Devansh Kaushik",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url || "http://localhost:3000"),
  openGraph: {
    title: "Devansh Kaushik — A curious corner of the internet",
    description:
      "Creative strategist. Storyteller. Engineer by education, internet person by choice.",
    type: "website",
    locale: "en_IN",
    ...(siteConfig.url
      ? {
          url: siteConfig.url,
          images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Devansh Kaushik",
    description: "Strategy, stories & things for the internet.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PortfolioBackground />
        <Header />
        {children}
        <Contact />
      </body>
    </html>
  );
}
