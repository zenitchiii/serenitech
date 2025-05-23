"use client"

import { SignIn } from "@clerk/nextjs"
import { motion } from "framer-motion"

export default function SignInPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left side - Image and overlay text */}
      <motion.div
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-teal-500 to-emerald-700 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img
          src="/therapy1.png?height=800&width=600"
          alt="Mental health illustration"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90"
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/10 to-transparent opacity-50"></div>

        <div className="relative z-20 flex flex-col justify-center px-12 text-white h-full">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Your Mental Wellness Journey
          </motion.h1>
          <motion.p
            className="text-lg opacity-90 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Join our community dedicated to supporting mental health and wellbeing for students.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-sm sm:text-base">Personalized resources</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-sm sm:text-base">Expert guidance</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute top-1/4 -right-8 w-32 h-32 rounded-full bg-white/10 blur-lg"></div>
      </motion.div>

      {/* Right side - Sign In */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-background"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Sign in to access your account</p>
          </div>

          <div className="bg-card/40 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-border/50">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "text-xl",
                  headerSubtitle: "text-muted-foreground text-sm",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 transition-colors duration-200",
                  formFieldInput: "rounded-lg border-border focus:ring-2 focus:ring-primary/20",
                  footerActionLink: "text-primary hover:text-primary/90 transition-colors duration-200",
                  formFieldLabel: "text-foreground",
                  identityPreviewText: "text-foreground",
                  formHeaderTitle: "text-foreground",
                  formHeaderSubtitle: "text-muted-foreground",
                },
              }}
            />
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  )
}
