import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ListItemSkeleton, TableOfContentsSkeleton, UserCardSkeleton } from '@/components/ui/skeletons';

export default function SidebarLoading() {
  return (
    <div className="w-72 space-y-6 sticky top-8">
      {/* 作者卡片骨架 */}
      <Card>
        <CardHeader className="pb-3">
          <UserCardSkeleton />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between mb-3">
            <div className="h-3 w-16 bg-accent animate-pulse rounded" />
            <div className="h-3 w-16 bg-accent animate-pulse rounded" />
            <div className="h-3 w-16 bg-accent animate-pulse rounded" />
          </div>
          <div className="flex space-x-2">
            <div className="h-7 flex-1 bg-accent animate-pulse rounded" />
            <div className="h-7 flex-1 bg-accent animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>

      {/* 目录骨架 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="h-4 w-12 bg-accent animate-pulse rounded" />
        </CardHeader>
        <CardContent className="pt-0">
          <TableOfContentsSkeleton />
        </CardContent>
      </Card>

      {/* 相关推荐骨架 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="h-4 w-16 bg-accent animate-pulse rounded" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="border-l-2 border-muted pl-3">
              <ListItemSkeleton />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
