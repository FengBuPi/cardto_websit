import { clientError, serverError, successResponse, withApiHandler } from '@/lib/api';
import type { ApiResponse } from '@/types';
import { NextRequest } from 'next/server';

// POST /api/auth/login - 用户登录
async function _POST(request: NextRequest): ApiResponse<{ token: string; user: { id: string; email: string; name: string } }> {
  try {
    const body = await request.json();
    const { email, } = body;

    // 基本验证
    if (!email) {
      return clientError('邮箱地址不能为空', 400);
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return clientError('邮箱格式不正确', 400);
    }

    // 这里应该实现真实的登录逻辑
    // 例如：验证用户、生成 JWT token、检查社交登录等

    // 模拟登录成功
    const mockUser = {
      id: 'user_' + Date.now(),
      email: email,
      name: email.split('@')[0],
    };

    const mockToken = 'mock_jwt_token_' + Date.now();

    return successResponse(
      {
        token: mockToken,
        user: mockUser,
      },
      '登录成功',
      200
    );

  } catch (error) {
    console.error('登录失败:', error);
    return serverError('登录失败: ' + (error instanceof Error ? error.message : String(error)));
  }
}

export const POST = withApiHandler(_POST);
