import { clientError, notFoundError, serverError, successResponse, withApiHandler } from '@/lib/api';
import { db } from '@/lib/db';
import { dataStorage } from '@/schema';
import type { ApiResponse } from '@/types';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

// POST /api/data - 存储数据
async function _POST(request: NextRequest): ApiResponse<{ id: number; createdAt: Date }> {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const { data, description } = body;

    // 基本检查
    if (!data) {
      return clientError('data 字段不能为空', 400);
    }

    // eslint-disable-next-line no-console
    console.log(`[API] 开始插入数据，数据大小: ${JSON.stringify(data).length} 字符`);

    // 插入新数据
    const result = await db
      .insert(dataStorage)
      .values({
        data,
        description: description || null,
      })
      .returning();

    const endTime = Date.now();
    // eslint-disable-next-line no-console
    console.log(`[API] 数据插入完成，耗时: ${endTime - startTime}ms`);

    // 检查插入结果
    if (result.length === 0) {
      return serverError('数据插入失败');
    }

    const insertedData = result[0];
    if (!insertedData) {
      return serverError('数据插入失败');
    }

    return successResponse(
      {
        id: insertedData.id,
        createdAt: insertedData.createdAt || new Date(),
      },
      '数据存储成功',
      201
    );

  } catch (error) {
    const endTime = Date.now();
    // eslint-disable-next-line no-console
    console.error(`[API] 数据插入失败，耗时: ${endTime - startTime}ms`, error);

    // 更详细的错误信息
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return serverError('数据库连接超时，请稍后重试');
      }
      if (error.message.includes('connection')) {
        return serverError('数据库连接失败，请检查网络连接');
      }
    }

    return serverError('服务器内部错误: ' + (error instanceof Error ? error.message : String(error)));
  }
}

// GET /api/data?id=xxx - 获取数据
async function _GET(request: NextRequest): ApiResponse<{ id: number; data: unknown; description: string | null; createdAt: Date; updatedAt: Date }> {
  const startTime = Date.now();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return clientError('缺少 id 参数', 400);
    }

    // eslint-disable-next-line no-console
    console.log(`[API] 开始查询数据，ID: ${id}`);

    const result = await db
      .select()
      .from(dataStorage)
      .where(eq(dataStorage.id, parseInt(id)))
      .limit(1);

    const endTime = Date.now();
    // eslint-disable-next-line no-console
    console.log(`[API] 数据查询完成，耗时: ${endTime - startTime}ms`);

    if (result.length === 0) {
      return notFoundError('数据');
    }

    return successResponse(result[0] as { id: number; data: unknown; description: string | null; createdAt: Date; updatedAt: Date });

  } catch (error) {
    const endTime = Date.now();
    // eslint-disable-next-line no-console
    console.error(`[API] 数据查询失败，耗时: ${endTime - startTime}ms`, error);

    // 更详细的错误信息
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return serverError('数据库连接超时，请稍后重试');
      }
      if (error.message.includes('connection')) {
        return serverError('数据库连接失败，请检查网络连接');
      }
    }

    return serverError('服务器内部错误: ' + (error instanceof Error ? error.message : String(error)));
  }
}

export const POST = withApiHandler(_POST);
export const GET = withApiHandler(_GET);