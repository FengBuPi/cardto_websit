import { useQueryClient as useTanStackQueryClient } from '@tanstack/react-query';

/**
 * 使用 QueryClient 实例的 hook
 * 这个 hook 提供了对 QueryClient 的直接访问
 */
export function useQueryClient() {
  return useTanStackQueryClient();
}
