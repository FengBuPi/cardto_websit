// API 响应相关类型定义

import type { NextResponse } from 'next/server';

// 成功响应类型
export type SuccessResponse<T = unknown> = {
  status: number;
  success: true;
  data?: T;
  message?: string;
};

// 错误响应类型
export type ErrorResponse = {
  status: number;
  success: false;
  error: string;
  message?: unknown;
};

// 统一的 API 响应类型 - 使用联合类型确保类型安全
export type _ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

// 分页参数类型
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

// ts工具类型
export type ApiResponse<T = unknown> = Promise<NextResponse<_ApiResponse<T>>>;