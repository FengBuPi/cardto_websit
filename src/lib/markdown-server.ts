import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';

// 生成ID的函数（用于标题锚点）
export function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .trim();
}

// 提取实际的 Markdown 内容（去除代码块包装）
export function extractMarkdownContent(content: string): string {
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
}

export async function processMarkdownToHtml(markdown: string): Promise<string> {
  try {
    // 提取实际的 Markdown 内容（去除代码块包装）
    const actualMarkdown = extractMarkdownContent(markdown);

    const processedContent = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown
      .use(remarkMath) // Math support
      .use(remarkBreaks) // Line breaks
      .use(remarkRehype) // Convert to HTML
      .use(rehypeKatex) // Math rendering
      .use(rehypeHighlight) // Code highlighting
      .use(rehypeRaw) // Raw HTML support
      .use(rehypeStringify) // Convert to HTML string
      .process(actualMarkdown);

    return processedContent.toString();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing markdown:', error);
    return '<p>Error processing markdown content</p>';
  }
}

// 使用正则表达式提取目录的函数
function extractTocWithRegex(markdown: string): Array<{
  id: string;
  title: string;
  level: number;
}> {
  // 匹配所有标题（# 到 ######）
  const headings = markdown.match(/^#{1,6}\s+(.+)$/gm) || [];

  return headings.map((heading) => {
    const title = heading.replace(/^#+\s+/, '');
    const level = heading.match(/^#+/)?.[0].length || 1;

    return {
      id: generateId(title),
      title,
      level
    };
  });
}

export async function getMarkdownMetadata(markdown: string): Promise<{
  title: string;
  description: string;
  toc: Array<{
    id: string;
    title: string;
    level: number;
  }>;
  wordCount: number;
  readingTime: number;
}> {
  // 提取实际的 Markdown 内容（去除代码块包装）
  const actualMarkdown = extractMarkdownContent(markdown);

  // 提取标题
  const titleMatch = actualMarkdown.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1] ?? 'Untitled';

  // 提取描述（第一个段落）
  const descriptionMatch = actualMarkdown.match(/^#\s+.+?\n\n([\s\S]+?)(?:\n\n|$)/);
  const description = descriptionMatch?.[1]?.replace(/\n/g, ' ').trim() ?? '';

  // 使用正则表达式提取目录
  const tocData = extractTocWithRegex(actualMarkdown);
  console.log(tocData);

  return {
    title,
    description,
    toc: tocData,
    wordCount: actualMarkdown.split(/\s+/).length,
    readingTime: Math.ceil(actualMarkdown.split(/\s+/).length / 200)
  };
}
