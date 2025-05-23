import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  calls: defineTable({
    userId: v.string(),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    duration: v.optional(v.number()), // in milliseconds
    type: v.optional(v.string()), // "incoming", "outgoing", etc.
    status: v.string(), // "completed", "missed", "ongoing"
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "createdAt"])
    .index("by_status", ["status"]),

  userStats: defineTable({
    userId: v.string(),
    totalCalls: v.number(),
    totalDuration: v.number(), // in milliseconds
    averageCallDuration: v.number(),
    lastWeekCalls: v.number(),
    lastWeekDuration: v.number(),
    callsGrowth: v.number(), // percentage change from previous week
    durationGrowth: v.number(), // percentage change from previous week
    lastUpdated: v.number(),
  }).index("by_user", ["userId"]),
});

