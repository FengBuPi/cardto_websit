import { clientError, notFoundError, serverError, successResponse, withApiHandler } from '@/lib/api';
import { deletePost, fetchPostById, updatePost } from '@/services/post-service';
import type { ApiResponse } from '@/types';
import { NextRequest } from 'next/server';

// PUT /api/data/[id] - 更新数据
async function _PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): ApiResponse<{ id: number; updatedAt: Date }> {
  try {
    const { data } = await request.json();

    // 基本检查
    if (!data) {
      return clientError('data 字段不能为空', 400);
    }

    const dataId = parseInt(params.id);
    if (isNaN(dataId)) {
      return clientError('无效的 id 参数', 400);
    }

    // 检查数据是否存在
    const existingData = await fetchPostById(dataId);
    if (!existingData) {
      return notFoundError('数据');
    }

    // 使用服务层更新数据
    const updatedData = await updatePost(dataId, { data });

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
    const existingData = await fetchPostById(dataId);
    if (!existingData) {
      return notFoundError('数据');
    }

    // 使用服务层删除数据
    const success = await deletePost(dataId);
    if (!success) {
      return serverError('数据删除失败');
    }

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