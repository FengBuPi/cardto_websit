import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { getMarkdownMetadata } from '@/lib/markdown-server';
import { fetchPostById } from '@/services/post-service';
import { notFound } from 'next/navigation';

interface ContentPageProps {
  params: {
    user: string;
    'content-id': string;
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const resolvedParams = await params;
  const contentId = parseInt(resolvedParams['content-id'], 10);

  if (isNaN(contentId)) {
    notFound();
  }

  // 服务端获取数据
  const post = await fetchPostById(contentId);

  if (!post) {
    notFound();
  }

  // 服务端处理 Markdown 元数据
  const metadata = await getMarkdownMetadata(post.data);

  // 提取实际的 Markdown 内容（去除代码块包装）
  const extractMarkdownContent = (content: string): string => {
    const trimmed = content.trim();

    if (trimmed.startsWith('```md') && trimmed.endsWith('```')) {
      return trimmed.slice(5, -3).trim();
    } else if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
      const lines = trimmed.split('\n');
      if (lines.length > 2) {
        return lines.slice(1, -1).join('\n');
      }
    }

    return content;
  };

  const markdownContent = extractMarkdownContent(post.data);

  return (
    <div className="flex-1 max-w-4xl">
      {/* 文章标题 */}
      <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
        {metadata.title}
      </h1>

      {/* 作者和元数据 */}
      <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{resolvedParams.user}</span>
        <span>{post.createdAt?.toLocaleDateString() || 'Unknown'}</span>
        <span>{metadata.wordCount} 字</span>
        <span>阅读{metadata.readingTime}分钟</span>
        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
          专栏: 技术分享
        </span>
      </div>

      {/* 副标题 */}
      <h2 className="text-xl font-semibold text-foreground mb-4">
        {metadata.description}
      </h2>

      {/* 使用 MarkdownRenderer 组件渲染 Markdown 内容 */}
      <MarkdownRenderer content={markdownContent} />
    </div>
  );
}
