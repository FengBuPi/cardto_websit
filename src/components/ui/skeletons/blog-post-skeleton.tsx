import { Skeleton } from '@/components/ui/skeleton';

// 博客文章骨架屏组件
export function BlogPostSkeleton() {
  return (
    <div className="space-y-6">
      {/* 标题骨架 */}
      <Skeleton className="h-8 w-3/4" />

      {/* 元数据骨架 */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-24" />
      </div>

      {/* 副标题骨架 */}
      <Skeleton className="h-6 w-2/3" />

      {/* 内容段落骨架 */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ))}
      </div>

      {/* 代码块骨架 */}
      <Skeleton className="h-32 w-full rounded-lg" />

      {/* 更多内容骨架 */}
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
