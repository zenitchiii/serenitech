"use client"

import { useEffect, useState } from "react"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { Brain, Clapperboard, HomeIcon, PenIcon as UserPen, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const { isSignedIn } = useUser()
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false) // scrolling down
      } else {
        setShowNavbar(true) // scrolling up
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isActivePath = (path: string) => pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border py-3 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded-lg">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold font-sans">
            Sereni<span className="text-primary">Tech</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5">
          {isSignedIn ? (
            <>
              <Link
                href="/"
                className={`flex items-center gap-1.5 text-sm transition-colors px-3 py-2 rounded-md ${
                  isActivePath("/") ? "text-primary bg-primary/10" : "hover:text-primary hover:bg-primary/5"
                }`}
              >
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>

              <Link
                href="/profile"
                className={`flex items-center gap-1.5 text-sm transition-colors px-3 py-2 rounded-md ${
                  isActivePath("/profile") ? "text-primary bg-primary/10" : "hover:text-primary hover:bg-primary/5"
                }`}
              >
                <UserPen size={16} />
                <span>Profile</span>
              </Link>

              <Link
                href="/vid"
                className={`flex items-center gap-1.5 text-sm transition-colors px-3 py-2 rounded-md ${
                  isActivePath("/vid") ? "text-primary bg-primary/10" : "hover:text-primary hover:bg-primary/5"
                }`}
              >
                <Clapperboard size={16} />
                <span>Videos</span>
              </Link>

              <Button
                asChild
                variant="outline"
                className="ml-2 border-primary/50 text-sm hover:bg-primary hover:text-green-700 hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 ease-out"
              >
                <Link href="/ai">Talk with Us</Link>
              </Button>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {isSignedIn ? (
              <>
                <Link
                  href="/"
                  className={`flex items-center gap-2 text-sm transition-colors px-3 py-2 rounded-md ${
                    isActivePath("/") ? "text-primary bg-primary/10" : "hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <HomeIcon size={16} />
                  <span>Home</span>
                </Link>

                <Link
                  href="/profile"
                  className={`flex items-center gap-2 text-sm transition-colors px-3 py-2 rounded-md ${
                    isActivePath("/profile") ? "text-primary bg-primary/10" : "hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <UserPen size={16} />
                  <span>Profile</span>
                </Link>

                <Link
                  href="/vid"
                  className={`flex items-center gap-2 text-sm transition-colors px-3 py-2 rounded-md ${
                    isActivePath("/vid") ? "text-primary bg-primary/10" : "hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <Clapperboard size={16} />
                  <span>Videos</span>
                </Link>

                <Button
                  asChild
                  variant="outline"
                  className="border-primary/50 text-sm hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 ease-out justify-start"
                >
                  <Link href="/ai">Talk with Us</Link>
                </Button>

                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-sm text-muted-foreground">Account:</span>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                      },
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <SignInButton>
                  <Button
                    variant="outline"
                    className="border-primary/50 text-primary hover:text-foreground hover:bg-primary/10 transition-all duration-200 justify-start"
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 justify-start">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
