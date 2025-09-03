// TanStack Query 相关 hooks
export { useQueryClient } from './use-query-client';

// API 相关 hooks
export {
  queryKeys, useCacheManager, useCreatePost, useCreateUser, useDeleteUser, useOptimisticUpdate, usePost, usePosts, useUpdateUser, useUser, useUsers
} from './use-api';

// 重新导出 TanStack Query 的核心 hooks
export {
  useInfiniteQuery,
  useIsFetching,
  useIsMutating, useMutation, useQuery, useQueryClient as useTanStackQueryClient
} from '@tanstack/react-query';
