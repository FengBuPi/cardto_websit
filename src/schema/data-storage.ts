import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

// 数据存储表 - 用于存储大字符串数据
export const dataStorage = pgTable('data_storage', {
  id: serial('id').primaryKey(), // 自增主键
  userId: integer('user_id').references(() => users.id),
  data: text('data').notNull(), // 存储的大字符串数据
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type DataStorage = typeof dataStorage.$inferSelect;
export type NewDataStorage = typeof dataStorage.$inferInsert;
