"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, MessageSquare, ChevronRight, ChevronLeft, Sparkles, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api } from "../../../convex/_generated/api"

const quotes = [
  "Believe you can and you're halfway there.",
  "Every day is a second chance.",
  "Progress, not perfection.",
  "You are stronger than you think.",
  "Keep going, you're doing great!",
  "Dream it. Wish it. Do it.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't stop when you're tired. Stop when you're done.",
  "Great things never come from comfort zones.",
  "Push yourself, because no one else is going to do it for you.",
  "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
  "Believe in yourself and all that you are.",
  "Stay positive, work hard, make it happen.",
  "You don't have to be perfect to be amazing.",
  "Your only limit is your mind.",
  "Little by little, a little becomes a lot.",
  "Difficult roads often lead to beautiful destinations.",
  "Failure is the condiment that gives success its flavor.",
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

const profileVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
}

const quoteVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

// Helper function to format duration
const formatDuration = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`
  }
  return `${minutes} min`
}

// Helper function to format trend
const formatTrend = (growth: number): { text: string; icon: React.ReactElement; color: string } => {
  const isPositive = growth >= 0
  const absGrowth = Math.abs(growth)
  
  return {
    text: `${isPositive ? '+' : '-'}${absGrowth.toFixed(1)}% from last week`,
    icon: isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />,
    color: isPositive ? "text-green-600" : "text-red-600"
  }
}

export default function ProfilePage() {
  const { user } = useUser()
  const [quoteIndex, setQuoteIndex] = useState(0)

  // Query user stats from Convex
  const userStats = useQuery(api.queries.getUserStats, 
    user?.id ? { userId: user.id } : "skip"
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length)
  }

  const handlePrevQuote = () => {
    setQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length)
  }

  // Create stats array with real data
  const stats = userStats ? [
    {
      label: "Calls Made",
      value: userStats.totalCalls,
      icon: <MessageSquare className="h-5 w-5" />,
      color: "from-blue-500 to-indigo-600",
      trend: formatTrend(userStats.callsGrowth),
    },
    {
      label: "Session Duration",
      value: formatDuration(userStats.totalDuration),
      icon: <Clock className="h-5 w-5" />,
      color: "from-purple-500 to-violet-600",
      trend: formatTrend(userStats.durationGrowth),
    },
  ] : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-6">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div
        className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.h1
          className="text-3xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>

        {/* Profile Card with animation */}
        {user ? (
          <motion.div
            className="bg-card/40 backdrop-blur-sm rounded-xl shadow-md border border-border/50 overflow-hidden"
            variants={profileVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
            <div className="px-6 py-6 flex flex-col md:flex-row md:items-center">
              <div className="-mt-16 md:-mt-20 mb-4 md:mb-0 md:mr-8">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-background">
                  <img
                    src={user.imageUrl || "/default-profile.png"}
                    alt={user.fullName || "User"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user.fullName || "Unnamed User"}</h2>
                <p className="text-muted-foreground">{user.emailAddresses?.[0]?.emailAddress || "No email"}</p>
                {userStats && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      Total: {formatDuration(userStats.totalDuration)}
                    </Badge>
                    <Badge variant="outline">
                      Avg: {formatDuration(userStats.averageCallDuration)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <Card className="p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-muted h-24 w-24 mb-4"></div>
              <div className="h-4 bg-muted rounded w-48 mb-2"></div>
              <div className="h-3 bg-muted rounded w-32"></div>
            </div>
          </Card>
        )}

        {/* Stats Grid with Framer Motion */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {userStats ? (
            stats.map(({ label, value, icon, color, trend }) => (
              <motion.div key={label} variants={cardVariants}>
                <Card className="overflow-hidden h-full bg-card/40 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardDescription>{label}</CardDescription>
                        <CardTitle className="text-2xl mt-1">{value}</CardTitle>
                      </div>
                      <div className={`p-2 rounded-full bg-gradient-to-br ${color} text-white`}>{icon}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`flex items-center text-xs ${trend.color}`}>
                      {trend.icon}
                      <span className="ml-1">{trend.text}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            // Loading state
            Array.from({ length: 2 }).map((_, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="overflow-hidden h-full bg-card/40 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                        <div className="h-8 bg-muted rounded w-16 animate-pulse"></div>
                      </div>
                      <div className="h-9 w-9 bg-muted rounded-full animate-pulse"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-muted rounded w-32 animate-pulse"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Motivational Quote Section */}
        <Card className="bg-card/40 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Daily Inspiration
            </CardTitle>
          </CardHeader>
          <CardContent className="relative min-h-[120px] flex items-center justify-center px-12">
            <Button variant="ghost" size="icon" className="absolute left-2 rounded-full" onClick={handlePrevQuote}>
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                variants={quoteVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-4"
              >
                <p className="text-xl italic">"{quotes[quoteIndex]}"</p>
              </motion.div>
            </AnimatePresence>

            <Button variant="ghost" size="icon" className="absolute right-2 rounded-full" onClick={handleNextQuote}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}