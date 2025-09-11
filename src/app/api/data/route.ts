import { clientError, notFoundError, serverError, successResponse, withApiHandler } from '@/lib/api';
import { createPost, fetchPostById } from '@/services/post-service';
import type { ApiResponse } from '@/types';
import { NextRequest } from 'next/server';

// POST /api/data - 存储数据
async function _POST(request: NextRequest): ApiResponse<{ id: number; createdAt: Date }> {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const { data, userId } = body;

    // 基本检查
    if (!data) {
      return clientError('data 字段不能为空', 400);
    }

    if (!userId) {
      return clientError('userId 字段不能为空', 400);
    }

    // eslint-disable-next-line no-console
    console.log(`[API] 开始插入数据，数据大小: ${JSON.stringify(data).length} 字符`);

    // 使用服务层创建文章
    const newPost = await createPost({
      userId: parseInt(userId),
      data,
    });

    const endTime = Date.now();
    // eslint-disable-next-line no-console
    console.log(`[API] 数据插入完成，耗时: ${endTime - startTime}ms`);

    if (!newPost) {
      return serverError('数据插入失败');
    }

    return successResponse(
      {
        id: newPost.id,
        createdAt: newPost.createdAt || new Date(),
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
async function _GET(request: NextRequest): ApiResponse<{ id: number; data: unknown; userId: number | null; createdAt: Date | null; updatedAt: Date | null }> {
  const startTime = Date.now();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return clientError('缺少 id 参数', 400);
    }

    // eslint-disable-next-line no-console
    console.log(`[API] 开始查询数据，ID: ${id}`);

    // 使用服务层获取文章
    const post = await fetchPostById(parseInt(id));

    const endTime = Date.now();
    // eslint-disable-next-line no-console
    console.log(`[API] 数据查询完成，耗时: ${endTime - startTime}ms`);

    if (!post) {
      return notFoundError('数据');
    }

    return successResponse(post as { id: number; data: unknown; userId: number | null; createdAt: Date | null; updatedAt: Date | null });

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