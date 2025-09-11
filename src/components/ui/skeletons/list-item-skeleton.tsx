import { Skeleton } from '@/components/ui/skeleton';

// 列表项骨架屏组件
export function ListItemSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center space-x-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-1" />
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-1" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  );
}
