'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">出现错误</h1>
          <p className="text-muted-foreground">
            抱歉，页面加载时出现了问题。请尝试刷新页面或联系技术支持。
          </p>
        </div>

        <div className="flex space-x-3">
          <Button onClick={reset} className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>重试</span>
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            返回首页
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 p-4 bg-muted rounded-lg text-left">
            <summary className="cursor-pointer text-sm font-medium">
              错误详情 (开发模式)
            </summary>
            <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
