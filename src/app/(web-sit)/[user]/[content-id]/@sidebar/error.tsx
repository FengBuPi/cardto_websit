'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface SidebarErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SidebarError({ error: _, reset }: SidebarErrorProps) {
  return (
    <div className="w-72 space-y-6 sticky top-8">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">侧边栏加载失败</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-muted-foreground mb-3">
            无法加载侧边栏内容
          </p>
          <button
            onClick={reset}
            className="text-xs text-primary hover:underline"
          >
            点击重试
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
