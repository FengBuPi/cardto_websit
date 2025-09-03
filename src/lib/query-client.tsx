'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 创建 QueryClient 的工厂函数，确保每个客户端都有自己的实例
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 缓存时间：5分钟
        staleTime: 1000 * 60 * 5,
        // 垃圾回收时间：10分钟
        gcTime: 1000 * 60 * 10,
        // 重试次数
        retry: (failureCount, error) => {
          // 对于 4xx 错误不重试
          if (error instanceof Error && error.message.includes('4')) {
            return false;
          }
          // 其他错误最多重试 3 次
          return failureCount < 3;
        },
        // 重试延迟
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // 网络恢复时重新获取数据
        refetchOnReconnect: true,
        // 窗口重新获得焦点时重新获取数据
        refetchOnWindowFocus: false,
      },
      mutations: {
        // 网络恢复时重试
        retry: 1,
        // 重试延迟
        retryDelay: 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // 服务端：总是创建新的查询客户端
    return makeQueryClient();
  } else {
    // 浏览器：创建一个新的查询客户端（如果不存在）
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // NOTE: 避免在服务端渲染时创建新的客户端
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 开发环境显示开发工具 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  );
}

// 导出 QueryClient 实例，用于在组件中直接使用
export { getQueryClient };
