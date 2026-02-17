import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    creatorId: v.id("users"),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    habits: v.array(
      v.object({
        title: v.string(),
        description: v.optional(v.string()),
        frequency: v.array(v.string()),
        xpReward: v.number(),
        penalty: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const programId = await ctx.db.insert("programs", {
      ...args,
      isPublic: true,
      createdAt: Date.now(),
    });
    return programId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("programs").collect();
  },
});

export const get = query({
  args: { programId: v.id("programs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.programId);
  },
});
