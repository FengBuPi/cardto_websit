import { Skeleton } from '@/components/ui/skeleton';

// 目录骨架屏组件
export function TableOfContentsSkeleton() {
  return (
    <div className="space-y-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{
            width: `${Math.random() * 40 + 60}%`,
            marginLeft: `${(i % 3) * 12}px` // 模拟层级缩进
          }}
        />
      ))}
    </div>
  );
}
