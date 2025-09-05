import { clientError, conflictError, notFoundError, serverError, successResponse, withApiHandler } from '@/lib/api';
import { db } from '@/lib/db';
import { dataStorage } from '@/schema';
import type { ApiResponse } from '@/types';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

// POST /api/data - 存储数据
async function _POST(request: NextRequest): ApiResponse<{ id: number; key: string; createdAt: Date }> {
  try {
    const body = await request.json();
    const { key, data, description, metadata } = body;

    // 基本检查
    if (!key || !data) {
      return clientError('key 和 data 字段不能为空', 400);
    }

    // 检查 key 是否已存在
    const existingData = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.key, key))
      .limit(1);

    if (existingData.length > 0) {
      return conflictError('数据');
    }

    // 插入新数据
    const result = await db
      .insert(dataStorage)
      .values({
        key,
        data,
        description: description || null,
        metadata: metadata || null,
      })
      .returning();

    return successResponse(
      {
        id: result[0].id,
        key: result[0].key,
        createdAt: result[0].createdAt,
      },
      '数据存储成功',
      201
    );

  } catch (error) {
    return serverError('服务器内部错误:' + error);
  }
}

// GET /api/data?key=xxx - 获取数据
async function _GET(request: NextRequest): ApiResponse<{ id: number; key: string; data: unknown; description: string | null; metadata: unknown | null; createdAt: Date; updatedAt: Date }> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return clientError('缺少 key 参数', 400);
    }

    const result = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.key, key))
      .limit(1);

    if (result.length === 0) {
      return notFoundError('数据');
    }

    return successResponse(result[0]);

  } catch (error) {
    return serverError('服务器内部错误:' + error);
  }
}

export const POST = withApiHandler(_POST);
export const GET = withApiHandler(_GET);