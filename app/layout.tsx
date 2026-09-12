import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Taply — Your business, one tap away.",
  description:
    "A digital business profile platform for local businesses. Customers tap an NFC card or scan a QR code to reach your services, reviews, and booking.",

  icons: {
    icon: [
      // Sized PNGs actually present in /public.
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
      // Scalable favicon; browsers that support SVG favicons prefer this.
      { url: "/icon.svg", type: "image/svg+xml" },
      // Do NOT list favicon.ico or app/icon.png here — Next.js
      // auto-detects those from their fixed filenames in /app and
      // injects its own <link> tag for them. Declaring them again
      // here would produce duplicate/conflicting tags.
    ],
    // Point Apple's touch icon at the /public version explicitly,
    // since app/apple-icon.png would ALSO be auto-detected by Next.js
    // and the two would otherwise both render. Rename or delete
    // app/apple-icon.png to avoid the duplicate — see note below.
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
