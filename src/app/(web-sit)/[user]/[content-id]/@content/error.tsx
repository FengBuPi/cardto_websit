'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ContentErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ContentError({ error, reset }: ContentErrorProps) {
  return (
    <div className="flex-1 max-w-4xl">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          内容加载失败
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          抱歉，无法加载文章内容。请检查网络连接或稍后重试。
        </p>
        <div className="space-y-2">
          <Button onClick={reset} className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>重试</span>
          </Button>
          <p className="text-xs text-muted-foreground">
            错误代码: {error.digest || 'UNKNOWN'}
          </p>
        </div>
      </div>
    </div>
  );
}
