import type React from "react"
import type { Metadata } from "next"
import { Onest } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-context"
import { LocaleProvider } from "@/lib/locale-context"
import { ScrollAnimationProvider } from "@/components/scroll-animation-provider"
import { CookiesConsent } from "@/components/cookies-consent"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ClientOnlyPopups } from "@/components/client-only-popups"
import "./globals.css"
import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google';  // якщо вже встановив @next/third-parties

// або вручну:

import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CNTQ2P0HEG"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CNTQ2P0HEG');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-onest",
  display: "swap",
})

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
      </head>
      <body className={`${onest.variable} font-sans antialiased`}>
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
