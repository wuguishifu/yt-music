import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  ...authTables,
  queue: defineTable({
    name: v.string(),
    url: v.string(),
  }),
});
