"use client"

import React from "react"
import { motion } from "framer-motion"
import { Brain, Cpu, Shield, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react"

export default function AboutAI() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Emotional Intelligence",
      description: "Understands and responds to your emotional needs with empathy and care.",
      benefits: ["Stress reduction", "Emotional support", "Mindfulness guidance"],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safe & Private",
      description: "Your conversations are private and secure, with no data stored or shared.",
      benefits: ["End-to-end encryption", "No data retention", "GDPR compliant"],
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Advanced AI",
      description: "Powered by cutting-edge AI technology for natural, helpful interactions.",
      benefits: ["Natural language processing", "Contextual understanding", "Continuous learning"],
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Personalized Support",
      description: "Adapts to your unique needs and learning style over time.",
      benefits: ["Special Awareness", "Adaptive learning", "Progress tracking"],
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background/0 -z-10" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles size={16} className="mr-2" />
              <span className="text-sm font-medium">Powered by advanced AI</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our AI Companion Works</h2>
            <p className="text-muted-foreground text-lg">
              Designed with students in mind, our AI companion provides personalized support to help you navigate
              academic challenges and maintain emotional well-being.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl blur-xl -z-10"></div>

              <div className="bg-primary/10 p-3 rounded-lg inline-block mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {React.cloneElement(feature.icon, { className: "h-6 w-6 text-primary relative z-10" })}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>

              <div className="mt-4 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                <p className="text-sm font-medium mb-2">Key Benefits:</p>
                <ul className="space-y-1">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-primary/70" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
