import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-context"
import { LocaleProvider } from "@/lib/locale-context"
import { ScrollAnimationProvider } from "@/components/scroll-animation-provider"
import { CookiesConsent } from "@/components/cookies-consent"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ClientOnlyPopups } from "@/components/client-only-popups"
import "./globals.css"

export const metadata: Metadata = {
  title: "Software Development Company | Hire Expert Engineers",
  description: "Grow your team with skilled developers. Flexible staff augmentation, fast onboarding, custom web & mobile development",
  icons: {
    icon: [
      {
        url: "/icon2.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon2.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon2.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon2.svg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />

        {/* Google Analytics (gtag.js) – додано статично, щоб було видно в початковому HTML */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CNTQ2P0HEG"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CNTQ2P0HEG');
            `,
          }}
        />
      </head>

      <body className="font-sans antialiased">
        <ThemeProvider>
          <LocaleProvider>
            <ScrollAnimationProvider>{children}</ScrollAnimationProvider>
            <Analytics />
            <CookiesConsent />
            <ClientOnlyPopups />
            <ScrollToTop />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
