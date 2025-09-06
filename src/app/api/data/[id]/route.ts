import { clientError, notFoundError, serverError, successResponse, withApiHandler } from '@/lib/api';
import { db } from '@/lib/db';
import { dataStorage } from '@/schema';
import type { ApiResponse } from '@/types';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

// PUT /api/data/[id] - 更新数据
async function _PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): ApiResponse<{ id: number; updatedAt: Date }> {
  try {
    const body = await request.json();
    const { data, description } = body;

    // 基本检查
    if (!data) {
      return clientError('data 字段不能为空', 400);
    }

    const dataId = parseInt(params.id);
    if (isNaN(dataId)) {
      return clientError('无效的 id 参数', 400);
    }

    // 检查数据是否存在
    const existingData = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.id, dataId))
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
        updatedAt: new Date(),
      })
      .where(eq(dataStorage.id, dataId))
      .returning();

    // 检查更新结果
    if (result.length === 0) {
      return serverError('数据更新失败');
    }

    const updatedData = result[0];
    if (!updatedData) {
      return serverError('数据更新失败');
    }

    return successResponse(
      {
        id: updatedData.id,
        updatedAt: updatedData.updatedAt || new Date(),
      },
      '数据更新成功'
    );

  } catch (error) {
    return serverError('服务器内部错误:' + error);
  }
}

// DELETE /api/data/[id] - 删除数据
async function _DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
): ApiResponse<null> {
  try {
    const dataId = parseInt(params.id);
    if (isNaN(dataId)) {
      return clientError('无效的 id 参数', 400);
    }

    // 检查数据是否存在
    const existingData = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.id, dataId))
      .limit(1);

    if (existingData.length === 0) {
      return notFoundError('数据');
    }

    // 删除数据
    await db
      .delete(dataStorage)
      .where(eq(dataStorage.id, dataId));

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