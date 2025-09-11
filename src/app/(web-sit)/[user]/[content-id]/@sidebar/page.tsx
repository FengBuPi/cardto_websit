import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { notFound } from 'next/navigation';

interface SidebarPageProps {
  params: {
    user: string;
    'content-id': string;
  };
}

export default async function SidebarPage({ params }: SidebarPageProps) {
  const resolvedParams = await params;
  const contentId = parseInt(resolvedParams['content-id'], 10);

  if (isNaN(contentId)) {
    notFound();
  }

  const author = {
    name: resolvedParams.user,
    level: 'LV.3',
    title: '资深软件开发工程师',
    rank: '作者榜No.5',
    avatar: '/api/placeholder/40/40',
    articles: 7,
    reads: '22k',
    followers: 33
  };

  const recommendedArticle = {
    title: 'Cursor 编辑器高效使用与配置全指南',
    author: 'AryaNimbus',
    reads: '1.2k',
    date: '2025-09-01'
  };

  return (
    <div className="w-72 space-y-6 sticky top-8">
      {/* 作者卡片 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="bg-blue-500 text-white text-sm">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-sm">{author.name}</span>
                <Badge variant="outline" className="text-xs px-1 py-0">
                  {author.level}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{author.title}</p>
              <Badge variant="secondary" className="text-xs px-1 py-0">
                {author.rank}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between text-xs text-muted-foreground mb-3">
            <span>{author.articles} 文章</span>
            <span>{author.reads} 阅读</span>
            <span>{author.followers} 粉丝</span>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1 text-xs h-7">关注</Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs h-7">私信</Button>
          </div>
        </CardContent>
      </Card>

      {/* 目录 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">目录</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <nav className="space-y-0.5">
            {/* {metadata.toc.map((item, index) => (
              <a
                key={index}
                href={`#heading-${index}`}
                className={`block text-xs py-1 px-2 rounded hover:bg-muted ${index === 0 ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
              >
                {item.title}
              </a>
            ))} */}
          </nav>
        </CardContent>
      </Card>

      {/* 相关推荐 */}
      <Card>
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-sm">相关推荐</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="border-l-2 border-primary pl-3">
              <h4 className="font-medium text-xs mb-1 line-clamp-2">
                {recommendedArticle.title}
              </h4>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span>{recommendedArticle.author}</span>
                <span>·</span>
                <span>{recommendedArticle.reads} 阅读</span>
                <span>·</span>
                <span>{recommendedArticle.date}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
