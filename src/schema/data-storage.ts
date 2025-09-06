import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// 数据存储表 - 用于存储大字符串数据
export const dataStorage = pgTable('data_storage', {
  id: serial('id').primaryKey(), // 自增主键
  data: text('data').notNull(), // 存储的大字符串数据
  description: text('description'), // 数据描述
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type DataStorage = typeof dataStorage.$inferSelect;
export type NewDataStorage = typeof dataStorage.$inferInsert;
