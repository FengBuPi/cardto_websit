import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

// 项目表
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail'),
  type: text('type').notNull(), // 'design', 'document', 'video' 等
  metadata: text('metadata'), // 存储额外信息
  ownerId: integer('owner_id').references(() => users.id),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
