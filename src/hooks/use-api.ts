import { useMutation, useQuery, useQueryClient as useTanStackQueryClient } from '@tanstack/react-query';

// API 错误类型定义
interface ApiError {
  message: string;
  status: number;
}

// 示例 API 函数（你可以根据实际 API 进行修改）
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error: ApiError = {
      message: response.statusText || 'An error occurred',
      status: response.status,
    };
    throw error;
  }

  return response.json();
}

// 查询键常量
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  posts: ['posts'] as const,
  post: (id: string) => ['posts', id] as const,
  comments: (postId: string) => ['posts', postId, 'comments'] as const,
};

// 用户相关 hooks
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: () => apiRequest('/api/users'),
    staleTime: 1000 * 60 * 5, // 5 分钟
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => apiRequest(`/api/users/${id}`),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 分钟
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (userData: { name: string; email: string }) =>
      apiRequest('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    onSuccess: (_data, _variables) => {
      // 成功后刷新用户列表
      // queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: ({ id, ...userData }: { id: string; name?: string; email?: string }) =>
      apiRequest(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
    onSuccess: (_data, _variables) => {
      // 成功后刷新特定用户和用户列表
      // queryClient.invalidateQueries({ queryKey: queryKeys.user(_variables.id) });
      // queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/users/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: (_data, _id) => {
      // 成功后刷新用户列表
      // queryClient.invalidateQueries({ queryKey: queryKeys.users });
      // queryClient.removeQueries({ queryKey: queryKeys.user(_id) });
    },
  });
}

// 文章相关 hooks
export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => apiRequest('/api/posts'),
    staleTime: 1000 * 60 * 2, // 2 分钟
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => apiRequest(`/api/posts/${id}`),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 分钟
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: (postData: { title: string; content: string; authorId: string }) =>
      apiRequest('/api/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
      }),
    onSuccess: (_data, _variables) => {
      // 成功后刷新文章列表
      // queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
}

// 通用工具函数
export function useOptimisticUpdate() {
  // 这里可以添加乐观更新的逻辑
  return {
    updateOptimistically: () => {
      // 实现乐观更新逻辑
    },
  };
}

// 缓存管理工具
export function useCacheManager() {
  const queryClient = useTanStackQueryClient();

  return {
    invalidateUsers: () => queryClient.invalidateQueries({ queryKey: queryKeys.users }),
    invalidateUser: (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.user(id) }),
    invalidatePosts: () => queryClient.invalidateQueries({ queryKey: queryKeys.posts }),
    invalidatePost: (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.post(id) }),
    prefetchUser: (id: string) => queryClient.prefetchQuery({
      queryKey: queryKeys.user(id),
      queryFn: () => apiRequest(`/api/users/${id}`),
      staleTime: 1000 * 60 * 10,
    }),
    clearAll: () => queryClient.clear(),
  };
}
