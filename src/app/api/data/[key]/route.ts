import { clientError, notFoundError, serverError, successResponse, withApiHandler } from '@/lib/api';
import { db } from '@/lib/db';
import { dataStorage } from '@/schema';
import type { ApiResponse } from '@/types';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

// PUT /api/data/[key] - 更新数据
async function _PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
): ApiResponse<{ id: number; key: string; updatedAt: Date }> {
  try {
    const body = await request.json();
    const { data, description, metadata } = body;

    // 基本检查
    if (!data) {
      return clientError('data 字段不能为空', 400);
    }

    // 检查数据是否存在
    const existingData = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.key, params.key))
      .limit(1);

    if (existingData.length === 0) {
      return notFoundError('数据');
    }

    // 更新数据
    const result = await db
      .update(dataStorage)
      .set({
        data,
        description: description || null,
        metadata: metadata || null,
        updatedAt: new Date(),
      })
      .where(eq(dataStorage.key, params.key))
      .returning();

    return successResponse(
      {
        id: result[0].id,
        key: result[0].key,
        updatedAt: result[0].updatedAt,
      },
      '数据更新成功'
    );

  } catch (error) {
    return serverError('服务器内部错误:' + error);
  }
}

// DELETE /api/data/[key] - 删除数据
async function _DELETE(
  _request: NextRequest,
  { params }: { params: { key: string } }
): ApiResponse<null> {
  try {
    // 检查数据是否存在
    const existingData = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.key, params.key))
      .limit(1);

    if (existingData.length === 0) {
      return notFoundError('数据');
    }

    // 删除数据
    await db
      .delete(dataStorage)
      .where(eq(dataStorage.key, params.key));

    return successResponse(
      null,
      '数据删除成功'
    );

  } catch {
    return serverError('服务器内部错误');
  }
}

export const PUT = withApiHandler(_PUT);
export const DELETE = withApiHandler(_DELETE);