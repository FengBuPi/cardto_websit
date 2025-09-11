import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';

export async function processMarkdownToHtml(markdown: string): Promise<string> {
  try {
    // 检查内容是否被包装在代码块中
    const trimmedMarkdown = markdown.trim();

    // 如果内容以 ```md 开头，说明被包装在代码块中，需要提取实际内容
    let actualMarkdown = trimmedMarkdown;
    if (trimmedMarkdown.startsWith('```md') && trimmedMarkdown.endsWith('```')) {
      // 提取 ```md 和 ``` 之间的内容
      actualMarkdown = trimmedMarkdown.slice(5, -3).trim();
    } else if (trimmedMarkdown.startsWith('```') && trimmedMarkdown.endsWith('```')) {
      // 提取 ``` 和 ``` 之间的内容
      const lines = trimmedMarkdown.split('\n');
      if (lines.length > 2) {
        actualMarkdown = lines.slice(1, -1).join('\n');
      }
    }

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
  // 检查内容是否被包装在代码块中
  const trimmedMarkdown = markdown.trim();

  // 如果内容以 ```md 开头，说明被包装在代码块中，需要提取实际内容
  let actualMarkdown = trimmedMarkdown;
  if (trimmedMarkdown.startsWith('```md') && trimmedMarkdown.endsWith('```')) {
    // 提取 ```md 和 ``` 之间的内容
    actualMarkdown = trimmedMarkdown.slice(5, -3).trim();
  } else if (trimmedMarkdown.startsWith('```') && trimmedMarkdown.endsWith('```')) {
    // 提取 ``` 和 ``` 之间的内容
    const lines = trimmedMarkdown.split('\n');
    if (lines.length > 2) {
      actualMarkdown = lines.slice(1, -1).join('\n');
    }
  }

  // 提取标题
  const titleMatch = actualMarkdown.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1] ?? 'Untitled';

  // 提取描述（第一个段落）
  const descriptionMatch = actualMarkdown.match(/^#\s+.+?\n\n([\s\S]+?)(?:\n\n|$)/);
  const description = descriptionMatch?.[1]?.replace(/\n/g, ' ').trim() ?? '';

  // 提取目录
  const headings = actualMarkdown.match(/^#{1,6}\s+(.+)$/gm) || [];
  const toc = headings.map((heading, index) => ({
    id: `heading-${index}`,
    title: heading.replace(/^#+\s+/, ''),
    level: heading.match(/^#+/)?.[0].length || 1
  }));

  return {
    title,
    description,
    toc,
    wordCount: actualMarkdown.split(/\s+/).length,
    readingTime: Math.ceil(actualMarkdown.split(/\s+/).length / 200) // 假设每分钟200字
  };
}
