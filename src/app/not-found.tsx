import { Button } from '@/components/ui/button';
import { FileX, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <FileX className="w-8 h-8 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">页面未找到</h1>
          <p className="text-muted-foreground">
            抱歉，您访问的页面不存在或已被移动。
          </p>
        </div>

        <Link href="/">
          <Button className="flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>返回首页</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
