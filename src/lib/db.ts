import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schema';

const connectionString = process.env['DATABASE_URL'];
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// 优化数据库连接配置
const client = postgres(connectionString, {
  // 连接池配置
  max: 5, // 减少最大连接数
  idle_timeout: 30, // 增加空闲超时时间
  connect_timeout: 30, // 增加连接超时时间
  // 连接重试配置
  max_lifetime: 60 * 10, // 减少连接生命周期
  // 启用连接池
  prepare: false, // 禁用预编译语句以提高性能
});

export const db = drizzle(client, { schema });