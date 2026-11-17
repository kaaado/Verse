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
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isBlocked = function(name) {
                    return name === 'bis_skin_checked' ||
                      name === 'bis_register' ||
                      (typeof name === 'string' && name.indexOf('__processed_') === 0);
                  };

                  var origSetAttr = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, val) {
                    if (isBlocked(name)) return;
                    return origSetAttr.apply(this, arguments);
                  };

                  if (typeof MutationObserver !== 'undefined') {
                    var observer = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        if (m.type === 'attributes' && isBlocked(m.attributeName)) {
                          m.target.removeAttribute(m.attributeName);
                        }
                      }
                    });
                    var target = document.documentElement || document;
                    observer.observe(target, {
                      attributes: true,
                      subtree: true,
                      attributeFilter: ['bis_skin_checked', 'bis_register']
                    });
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#0B0F19] text-[#F8FAFC]"
      >
        {children}
      </body>
    </html>
  );
}
