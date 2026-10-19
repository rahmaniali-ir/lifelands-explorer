import { Geist_Mono, Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Lifelands | دنیای بازی‌ها",
    template: "%s | Lifelands",
  },
  description: "بازی‌های جدید را کشف کنید.",
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={cn(
        `${vazirmatn.variable} antialiased`,
        fontMono.variable,
        "font-sans",
        inter.variable,
        "dark"
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
