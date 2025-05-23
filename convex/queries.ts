// convex/queries.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

// Get user stats for dashboard
export const getUserStats = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // First try to get cached stats
    let userStats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    // If no stats exist or they're outdated (older than 1 hour), calculate them
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    if (!userStats || userStats.lastUpdated < oneHourAgo) {
      // Calculate stats on the fly
      const now = Date.now();
      const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
      const twoWeeksAgo = now - (14 * 24 * 60 * 60 * 1000);

      const allCalls = await ctx.db
        .query("calls")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .filter((q) => q.eq(q.field("status"), "completed"))
        .collect();

      const lastWeekCalls = allCalls.filter(call => call.createdAt >= oneWeekAgo);
      const previousWeekCalls = allCalls.filter(
        call => call.createdAt >= twoWeeksAgo && call.createdAt < oneWeekAgo
      );

      const totalCalls = allCalls.length;
      const totalDuration = allCalls.reduce((sum, call) => sum + (call.duration || 0), 0);
      const lastWeekCallCount = lastWeekCalls.length;
      const lastWeekDuration = lastWeekCalls.reduce((sum, call) => sum + (call.duration || 0), 0);
      const previousWeekCallCount = previousWeekCalls.length;
      const previousWeekDuration = previousWeekCalls.reduce((sum, call) => sum + (call.duration || 0), 0);

      const callsGrowth = previousWeekCallCount > 0 
        ? ((lastWeekCallCount - previousWeekCallCount) / previousWeekCallCount) * 100 
        : lastWeekCallCount > 0 ? 100 : 0;

      const durationGrowth = previousWeekDuration > 0 
        ? ((lastWeekDuration - previousWeekDuration) / previousWeekDuration) * 100 
        : lastWeekDuration > 0 ? 100 : 0;

      return {
        totalCalls,
        totalDuration,
        averageCallDuration: totalCalls > 0 ? totalDuration / totalCalls : 0,
        lastWeekCalls: lastWeekCallCount,
        lastWeekDuration,
        callsGrowth,
        durationGrowth,
        lastUpdated: now,
      };
    }

    return {
      totalCalls: userStats.totalCalls,
      totalDuration: userStats.totalDuration,
      averageCallDuration: userStats.averageCallDuration,
      lastWeekCalls: userStats.lastWeekCalls,
      lastWeekDuration: userStats.lastWeekDuration,
      callsGrowth: userStats.callsGrowth,
      durationGrowth: userStats.durationGrowth,
      lastUpdated: userStats.lastUpdated,
    };
  },
});

// Get recent calls for a user
export const getUserCalls = query({
  args: {
    userId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const calls = await ctx.db
      .query("calls")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(args.limit || 10);

    return calls.map(call => ({
      _id: call._id,
      startTime: call.startTime,
      endTime: call.endTime,
      duration: call.duration,
      type: call.type,
      status: call.status,
      createdAt: call.createdAt,
    }));
  },
});

// Get ongoing calls for a user
export const getOngoingCalls = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const ongoingCalls = await ctx.db
      .query("calls")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "ongoing"))
      .collect();

    return ongoingCalls;
  },
});

// Get call statistics by time period
export const getCallStatsByPeriod = query({
  args: {
    userId: v.string(),
    days: v.number(), // Number of days to look back
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const periodStart = now - (args.days * 24 * 60 * 60 * 1000);

    const calls = await ctx.db
      .query("calls")
      .withIndex("by_user_and_date", (q) => 
        q.eq("userId", args.userId).gte("createdAt", periodStart)
      )
      .filter((q) => q.eq(q.field("status"), "completed"))
      .collect();

    // Group calls by day
    const dailyStats: { [key: string]: { calls: number; duration: number } } = {};
    
    calls.forEach(call => {
      const date = new Date(call.createdAt).toISOString().split('T')[0];
      if (!dailyStats[date]) {
        dailyStats[date] = { calls: 0, duration: 0 };
      }
      dailyStats[date].calls += 1;
      dailyStats[date].duration += call.duration || 0;
    });

    return Object.entries(dailyStats).map(([date, stats]) => ({
      date,
      calls: stats.calls,
      duration: stats.duration,
      averageDuration: stats.calls > 0 ? stats.duration / stats.calls : 0,
    }));
  },
});