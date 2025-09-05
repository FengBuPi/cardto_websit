import type { ApiResponse, ErrorResponse, PaginationParams, SuccessResponse } from '@/types';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

// 成功响应
export function successResponse<T>(
  data: T,
  message: string = '操作成功',
  status: number = 200
): NextResponse<SuccessResponse<T>> {
  return NextResponse.json(
    {
      status,
      success: true,
      message,
      data,
    },
    { status }
  );
}

// 错误响应
export function errorResponse(
  error: string,
  status: number = 500,
  details?: unknown
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      status,
      success: false,
      error,
      ...(details ? { details } : {}),
    },
    { status }
  );
}

// 客户端错误 (4xx)
export function clientError(
  error: string,
  status: number = 400,
  details?: unknown
): NextResponse<ErrorResponse> {
  return errorResponse(error, status, details);
}

// 服务器错误 (5xx)
export function serverError(
  error: string = '服务器内部错误',
  details?: unknown
): NextResponse<ErrorResponse> {
  return errorResponse(error, 500, details);
}

// 数据验证错误
export function validationError(
  error: string = '请求数据格式不正确',
  details?: unknown
): NextResponse<ErrorResponse> {
  return clientError(error, 400, details);
}

// 资源未找到
export function notFoundError(
  resource: string = '资源'
): NextResponse<ErrorResponse> {
  return clientError(`${resource}不存在`, 404);
}

// 资源已存在
export function conflictError(
  resource: string = '资源'
): NextResponse<ErrorResponse> {
  return clientError(`${resource}已存在`, 409);
}

// API 拦截器 - 统一错误处理
export function withApiHandler<TArgs extends unknown[], TData = unknown>(
  handler: (...args: TArgs) => ApiResponse<TData>
): (...args: TArgs) => ApiResponse<TData> {
  return async (...args: TArgs): ApiResponse<TData> => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof ZodError) {
        // 数据库约束错误
        if (error.message.includes('duplicate key') || error.message.includes('UNIQUE constraint')) {
          return conflictError('数据已存在');
        }

        // 外键约束错误
        if (error.message.includes('foreign key constraint')) {
          return clientError('关联数据不存在', 400);
        }

        // 其他已知错误
        if (error.message.includes('not found')) {
          return notFoundError();
        }
      }

      return serverError('服务器内部错误');
    }
  };
}

// 分页参数解析
export function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}
