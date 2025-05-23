"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Pages that should not have navbar and footer
  const authPages = ["/sign-in", "/sign-up"]
  const isAuthPage = authPages.includes(pathname)

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
