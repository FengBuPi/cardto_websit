import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Maximize2,
  MessageCircle,
  Share,
  Star, ThumbsUp
} from 'lucide-react';

interface BlogPostLayoutProps {
  children: React.ReactNode;
  content: React.ReactNode;
  sidebar: React.ReactNode;
  params: {
    user: string;
    'content-id': string;
  };
}

export default function BlogPostLayout({
  children,
  content,
  sidebar
}: BlogPostLayoutProps) {
  const socialStats = {
    likes: 13,
    comments: 2,
    favorites: 20
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* 左侧社交互动图标 */}
          <div className="flex flex-col items-center space-y-2 sticky top-8">
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground mt-1">{socialStats.likes}</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground mt-1">{socialStats.comments}</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                <Star className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground mt-1">{socialStats.favorites}</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                <Share className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                <AlertTriangle className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 主要内容区域 - 使用平行路由 */}
          {content}

          {/* 右侧侧边栏 - 使用平行路由 */}
          {sidebar}

          {/* 默认内容 */}
          {children}
        </div>
      </div>
    </div>
  );
}
