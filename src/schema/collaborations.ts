import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { projects } from './projects';
import { users } from './users';

// 协作表
export const collaborations = pgTable('collaborations', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  userId: integer('user_id').references(() => users.id),
  role: text('role').notNull(), // 'owner', 'editor', 'viewer'
  createdAt: timestamp('created_at').defaultNow(),
});

export type Collaboration = typeof collaborations.$inferSelect;
export type NewCollaboration = typeof collaborations.$inferInsert;
