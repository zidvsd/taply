import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
