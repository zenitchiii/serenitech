import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css"
import ConvexClerkProvider from "@/providers/ConverClerkProvider"
import { ThemeProvider } from "@/components/theme-provider"
import { ConditionalLayout } from "@/components/conditional-layout"

const geistSans = GeistSans
const geistMono = GeistMono
export const metadata: Metadata = {
  title: "SereniTech",
  description: "A mental health AI companion for LSPU students",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  )
}
