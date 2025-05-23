"use client";

import React from "react";
import { motion } from "framer-motion";
import UserReviews from "@/components/UserReviews";
import AboutAI from "@/components/AboutAI";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
        exit="hidden"
        transition={{ duration: 1.1 }}
        className="relative z-10 py-24 flex-grow"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* Left Side - Hero Text */}
            <div className="lg:col-span-7 space-y-8 relative">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block text-foreground">An AI Companion</span>
                <span className="block text-primary">For Every Student</span>
                <span className="block pt-2">
                  <span className="block text-foreground">Balance, Focus,</span>
                  <span className="text-foreground">Guided by Care</span>
                </span>
              </h1>

              {/* Separator Line */}
              <div className="w-full h-1 bg-primary rounded-full mb-4 bg-gradient-to-r from-primary via-secondary to-primary" />

              <p className="text-xl text-muted-foreground w-2/3">
                Your AI companion for calm, clarity, and emotional wellness.
              </p>

              {/* Statistics */}
              <div className="flex flex-wrap gap-8 py-6 font-mono text-center">
                <div className="flex flex-col min-w-[90px]">
                  <div className="text-2xl font-bold text-foreground">99.9%</div>
                  <div className="text-xs uppercase tracking-wider">Satisfaction Rate</div>
                </div>

                <div className="flex flex-col min-w-[90px]">
                  <div className="text-2xl font-bold text-foreground">1000+</div>
                  <div className="text-xs uppercase tracking-wider">Happy Users</div>
                </div>

                <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>

                <div className="flex flex-col min-w-[90px]">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-xs uppercase tracking-wider">Support</div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/hero3.png"
                    alt="Hero Image"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About AI Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={slideLeft}
        exit="hidden"
        transition={{ duration: 1 }}
      >
        <AboutAI />
      </motion.div>

      {/* User Reviews Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
        exit="hidden"
        transition={{ duration: 1 }}
      >
        <UserReviews />
      </motion.div>
    </div>
  );
};

export default Homepage;
