import type { Metadata, Viewport } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE YACINEVERSE — A journey through the mind of a builder",
  description: "Dynamic personal platform, cosmic architecture portfolio, and executive professional dossier of Yacine Abdelsoltane Kermame (Kaaado). Systems engineer, AI builder, and software architect.",
  keywords: ["Yacine Kermame", "Kaaado", "Software Architect", "Next.js", "TypeScript", "AI Systems", "Engineering Portfolio"],
  authors: [{ name: "Yacine Abdelsoltane Kermame" }],
  openGraph: {
    title: "THE YACINEVERSE — A journey through the mind of a builder",
    description: "Explore the systems, AI platforms, and engineering achievements of Yacine Abdelsoltane Kermame.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE YACINEVERSE",
    description: "A journey through the mind of a builder.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
