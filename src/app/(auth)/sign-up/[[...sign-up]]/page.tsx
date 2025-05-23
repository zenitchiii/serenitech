"use client"

import { SignUp } from "@clerk/nextjs"
import { motion } from "framer-motion"

export default function SignUpPage() {
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
          src="/therapy2.jpg?height=800&width=600"
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
            Begin Your Wellness Journey
          </motion.h1>
          <motion.p
            className="text-lg opacity-90 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Create an account to access personalized mental health resources and support designed for students.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-sm sm:text-base">Confidential support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-sm sm:text-base">Student-focused</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute top-1/4 -right-8 w-32 h-32 rounded-full bg-white/10 blur-lg"></div>
      </motion.div>

      {/* Right side - Sign Up */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 bg-background"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md">
          <div className="mb-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">Create Your Account</h2>
            <p className="text-muted-foreground mt-1 text-sm">Quick sign-up to get started</p>
          </div>

          <div className="bg-card/40 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-border/50 max-h-[70vh] overflow-y-auto">
            <SignUp
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent p-2 max-w-sm",
                  headerTitle: "text-base",
                  headerSubtitle: "text-muted-foreground text-xs hidden",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 transition-colors duration-200 py-1 text-sm h-8",
                  formFieldInput: "rounded-md border-border focus:ring-1 focus:ring-primary/20 py-1 text-xs h-8",
                  footerActionLink: "text-primary hover:text-primary/90 transition-colors duration-200 text-xs",
                  formFieldLabel: "text-foreground text-xs mb-0.5",
                  identityPreviewText: "text-foreground text-xs",
                  formHeaderTitle: "text-foreground text-base",
                  formHeaderSubtitle: "text-muted-foreground text-xs hidden",
                  formFieldAction: "text-xs",
                  formFieldInputShowPasswordButton: "scale-75",
                  form: "gap-2",
                  formFieldLabelRow: "mb-0",
                  formFieldRow: "mb-1.5",
                  otpCodeFieldInput: "h-7 w-7 text-xs",
                  main: "gap-1 p-2",
                  footer: "gap-1 mt-1 text-xs",
                  socialButtonsIconButton: "scale-75 h-7 w-7",
                  socialButtonsBlockButton: "py-1 text-xs h-7",
                  dividerLine: "my-1",
                  dividerText: "text-xs",
                  formFieldSuccessText: "text-xs",
                  formFieldErrorText: "text-xs",
                  formFieldWarningText: "text-xs",
                  formFieldHintText: "text-xs",
                  alertText: "text-xs",
                  formResendCodeLink: "text-xs",
                  formFieldInputGroup: "gap-1",
                },
                layout: {
                  socialButtonsVariant: "iconButton",
                  socialButtonsPlacement: "bottom",
                  showOptionalFields: false,
                },
              }}
            />
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  )
}
