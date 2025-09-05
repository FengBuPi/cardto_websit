'use client';

import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const browserQueryClient: QueryClient = new QueryClient({
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

interface QueryProviderProps {
  children: React.ReactNode;
}


export default function QueryProvider({ children }: QueryProviderProps) {
  const dehydratedState = dehydrate(browserQueryClient);
  return (
    <QueryClientProvider client={browserQueryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
        {/* 开发环境显示开发工具 */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools
            initialIsOpen={false}
          />
        )}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export { browserQueryClient };
