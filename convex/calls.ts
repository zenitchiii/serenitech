// convex/calls.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Start a new call
export const startCall = mutation({
  args: {
    userId: v.string(),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const callId = await ctx.db.insert("calls", {
      userId: args.userId,
      startTime: now,
      type: args.type || "outgoing",
      status: "ongoing",
      createdAt: now,
    });

    return callId;
  },
});

// End a call and calculate duration
export const endCall = mutation({
  args: {
    callId: v.id("calls"),
  },
  handler: async (ctx, args) => {
    const call = await ctx.db.get(args.callId);
    if (!call) {
      throw new Error("Call not found");
    }

    const now = Date.now();
    const duration = now - call.startTime;

    await ctx.db.patch(args.callId, {
      endTime: now,
      duration: duration,
      status: "completed",
    });

    // Update user stats after ending the call
    await updateUserStats(ctx, call.userId);

    return { duration, callId: args.callId };
  },
});

// Add a completed call directly (for bulk import or testing)
export const addCall = mutation({
  args: {
    userId: v.string(),
    duration: v.number(), // in milliseconds
    type: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const createdAt = args.createdAt || now;
    
    const callId = await ctx.db.insert("calls", {
      userId: args.userId,
      startTime: createdAt - args.duration,
      endTime: createdAt,
      duration: args.duration,
      type: args.type || "completed",
      status: "completed",
      createdAt: createdAt,
    });

    // Update user stats
    await updateUserStats(ctx, args.userId);

    return callId;
  },
});

// Helper function to update user stats
async function updateUserStats(ctx: any, userId: string) {
  const now = Date.now();
  const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = now - (14 * 24 * 60 * 60 * 1000);

  // Get all completed calls for this user
  const allCalls = await ctx.db
    .query("calls")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .filter((q: any) => q.eq(q.field("status"), "completed"))
    .collect();

  // Get calls from last week
  const lastWeekCalls = allCalls.filter((call: any) => call.createdAt >= oneWeekAgo);
  
  // Get calls from the week before that (for growth calculation)
  const previousWeekCalls = allCalls.filter(
    (call: any) => call.createdAt >= twoWeeksAgo && call.createdAt < oneWeekAgo
  );

  // Calculate totals
  const totalCalls = allCalls.length;
  const totalDuration = allCalls.reduce((sum: number, call: any) => sum + (call.duration || 0), 0);
  const averageCallDuration = totalCalls > 0 ? totalDuration / totalCalls : 0;

  // Calculate last week stats
  const lastWeekCallCount = lastWeekCalls.length;
  const lastWeekDuration = lastWeekCalls.reduce((sum: number, call: any) => sum + (call.duration || 0), 0);

  // Calculate previous week stats for growth
  const previousWeekCallCount = previousWeekCalls.length;
  const previousWeekDuration = previousWeekCalls.reduce((sum: number, call: any) => sum + (call.duration || 0), 0);

  // Calculate growth percentages
  const callsGrowth = previousWeekCallCount > 0 
    ? ((lastWeekCallCount - previousWeekCallCount) / previousWeekCallCount) * 100 
    : lastWeekCallCount > 0 ? 100 : 0;

  const durationGrowth = previousWeekDuration > 0 
    ? ((lastWeekDuration - previousWeekDuration) / previousWeekDuration) * 100 
    : lastWeekDuration > 0 ? 100 : 0;

  // Check if user stats exist
  const existingStats = await ctx.db
    .query("userStats")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .first();

  const statsData = {
    userId,
    totalCalls,
    totalDuration,
    averageCallDuration,
    lastWeekCalls: lastWeekCallCount,
    lastWeekDuration,
    callsGrowth,
    durationGrowth,
    lastUpdated: now,
  };

  if (existingStats) {
    await ctx.db.patch(existingStats._id, statsData);
  } else {
    await ctx.db.insert("userStats", statsData);
  }
}

// Delete a call
export const deleteCall = mutation({
  args: {
    callId: v.id("calls"),
  },
  handler: async (ctx, args) => {
    const call = await ctx.db.get(args.callId);
    if (!call) {
      throw new Error("Call not found");
    }

    await ctx.db.delete(args.callId);
    
    // Update user stats after deletion
    await updateUserStats(ctx, call.userId);

    return { success: true };
  },
});