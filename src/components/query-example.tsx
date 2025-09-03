'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// 模拟 API 调用
async function fetchRandomNumber(): Promise<{ number: number; timestamp: number }> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 返回随机数和时间戳
  return {
    number: Math.floor(Math.random() * 100) + 1,
    timestamp: Date.now(),
  };
}

async function fetchUser(id: string): Promise<{ id: string; name: string; email: string }> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));

  // 模拟用户数据
  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com' },
  ];

  const user = users.find(u => u.id === id);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export function QueryExample() {
  const [userId, setUserId] = useState<string>('1');

  // 查询随机数
  const {
    data: randomData,
    isLoading: isRandomLoading,
    isError: isRandomError,
    error: randomError,
    refetch: refetchRandom,
  } = useQuery({
    queryKey: ['random-number'],
    queryFn: fetchRandomNumber,
    staleTime: 1000 * 60 * 5, // 5 分钟
    refetchOnWindowFocus: false,
  });

  // 查询用户
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 10, // 10 分钟
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        TanStack Query 示例
      </h2>

      {/* 随机数示例 */}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
          随机数生成器
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => refetchRandom()}
            disabled={isRandomLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isRandomLoading ? '生成中...' : '生成随机数'}
          </button>

          {randomData && (
            <div className="text-lg font-mono text-gray-800 dark:text-gray-200">
              数字: <span className="font-bold text-blue-600">{randomData.number}</span>
            </div>
          )}
        </div>

        {isRandomError && (
          <div className="text-red-500 text-sm">
            错误: {(randomError as Error)?.message}
          </div>
        )}

        {randomData && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            生成时间: {new Date(randomData.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* 用户查询示例 */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
          用户查询
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="user-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            选择用户ID:
          </label>
          <select
            id="user-select"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="1">用户 1</option>
            <option value="2">用户 2</option>
            <option value="3">用户 3</option>
          </select>
        </div>

        {isUserLoading && (
          <div className="text-blue-600 text-sm">加载中...</div>
        )}

        {userData && (
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">ID:</span>{' '}
              <span className="font-mono text-gray-900 dark:text-white">{userData.id}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">姓名:</span>{' '}
              <span className="text-gray-900 dark:text-white">{userData.name}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">邮箱:</span>{' '}
              <span className="font-mono text-gray-900 dark:text-white">{userData.email}</span>
            </div>
          </div>
        )}

        {isUserError && (
          <div className="text-red-500 text-sm">
            错误: {(userError as Error)?.message}
          </div>
        )}
      </div>

      {/* 功能说明 */}
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <p>🔄 <strong>自动重试:</strong> 网络请求失败时自动重试</p>
        <p>💾 <strong>智能缓存:</strong> 数据会被缓存，避免重复请求</p>
        <p>🔍 <strong>开发工具:</strong> 右下角可查看 React Query 开发工具</p>
        <p>⚡ <strong>实时更新:</strong> 窗口重新获得焦点时自动刷新数据</p>
      </div>
    </div>
  );
}
