import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// 数据存储表 - 用于存储大字符串数据
export const dataStorage = pgTable('data_storage', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(), // 数据标识符
  data: text('data').notNull(), // 存储的大字符串数据
  description: text('description'), // 数据描述
  metadata: text('metadata'), // 额外的元数据（JSON 字符串）
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type DataStorage = typeof dataStorage.$inferSelect;
export type NewDataStorage = typeof dataStorage.$inferInsert;
