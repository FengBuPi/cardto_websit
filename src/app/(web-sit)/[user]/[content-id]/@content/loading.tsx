import { BlogPostSkeleton } from '@/components/ui/skeletons';
import { Loader2 } from 'lucide-react';

export default function ContentLoading() {
  return (
    <div className="flex-1 max-w-4xl">
      <BlogPostSkeleton />

      {/* 加载指示器 */}
      <div className="flex items-center justify-center mt-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">加载内容中...</span>
      </div>
    </div>
  );
}
