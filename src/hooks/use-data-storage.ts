import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// API 基础 URL
const API_BASE = '/api/data';

// 存储数据
export const useStoreData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { key: string; data: string; description?: string; metadata?: string }) => {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '存储数据失败');
      }

      return response.json();
    },
    onSuccess: () => {
      // 存储成功后刷新数据列表
      queryClient.invalidateQueries({ queryKey: ['data-storage'] });
    },
  });
};

// 获取数据
export const useGetData = (key: string, enabled = true) => {
  return useQuery({
    queryKey: ['data-storage', key],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}?key=${encodeURIComponent(key)}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '获取数据失败');
      }

      return response.json();
    },
    enabled: enabled && !!key,
  });
};

// 更新数据
export const useUpdateData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, data }: { key: string; data: { data: string; description?: string; metadata?: string } }) => {
      const response = await fetch(`${API_BASE}/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '更新数据失败');
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      // 更新成功后刷新相关数据
      queryClient.invalidateQueries({ queryKey: ['data-storage', variables.key] });
      queryClient.invalidateQueries({ queryKey: ['data-storage'] });
    },
  });
};

// 删除数据
export const useDeleteData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (key: string) => {
      const response = await fetch(`${API_BASE}/${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '删除数据失败');
      }

      return response.json();
    },
    onSuccess: () => {
      // 删除成功后刷新数据列表
      queryClient.invalidateQueries({ queryKey: ['data-storage'] });
    },
  });
};
