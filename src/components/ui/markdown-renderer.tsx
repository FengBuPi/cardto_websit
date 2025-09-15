'use client';

import { generateId } from '@/lib/markdown-server';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// 使用 ReactMarkdown 的内置类型
type MarkdownComponents = Components;

// 自定义组件映射
const components: MarkdownComponents = {
  // 标题组件
  h1: ({ children, ...props }) => {
    const titleText = typeof children === 'string' ? children : children?.toString() || '';
    const id = generateId(titleText);
    return (
      <h1
        id={id}
        className="text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0 scroll-mt-20"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const titleText = typeof children === 'string' ? children : children?.toString() || '';
    const id = generateId(titleText);
    return (
      <h2
        id={id}
        className="text-2xl font-semibold text-foreground mb-4 mt-6 scroll-mt-20"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const titleText = typeof children === 'string' ? children : children?.toString() || '';
    const id = generateId(titleText);
    return (
      <h3
        id={id}
        className="text-xl font-semibold text-foreground mb-3 mt-5 scroll-mt-20"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const titleText = typeof children === 'string' ? children : children?.toString() || '';
    const id = generateId(titleText);
    return (
      <h4
        id={id}
        className="text-lg font-medium text-foreground mb-2 mt-4 scroll-mt-20"
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ children, ...props }) => {
    const titleText = typeof children === 'string' ? children : children?.toString() || '';
    const id = generateId(titleText);
    return (
      <h5
        id={id}
        className="text-base font-medium text-foreground mb-2 mt-4 scroll-mt-20"
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ children, ...props }) => {
    const titleText = typeof children === 'string' ? children : children?.toString() || '';
    const id = generateId(titleText);
    return (
      <h6
        id={id}
        className="text-sm font-medium text-foreground mb-2 mt-4 scroll-mt-20"
        {...props}
      >
        {children}
      </h6>
    );
  },

  // 段落
  p: ({ children, ...props }) => (
    <p className="text-base leading-relaxed text-foreground mb-4" {...props}>
      {children}
    </p>
  ),

  // 列表
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base leading-relaxed text-foreground" {...props}>
      {children}
    </li>
  ),

  // 引用
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-muted/50 rounded-r" {...props}>
      {children}
    </blockquote>
  ),

  // 代码块
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const inline = !className?.includes('language-');

    if (!inline && language) {
      return (
        <SyntaxHighlighter
          style={oneDark as Record<string, React.CSSProperties>}
          language={language}
          PreTag="div"
          className="rounded-lg mb-4"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    }

    return (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  },

  // 预格式化
  pre: ({ children, ...props }) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props}>
      {children}
    </pre>
  ),

  // 链接
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-primary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),

  // 图片
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt}
      className="max-w-full h-auto rounded-lg mb-4"
      {...props}
    />
  ),

  // 表格
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-border" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-border" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-border px-4 py-2 text-left font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-border px-4 py-2" {...props}>
      {children}
    </td>
  ),

  // 分割线
  hr: ({ ...props }) => (
    <hr className="border-border my-6" {...props} />
  ),

  // 强调
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-foreground" {...props}>
      {children}
    </em>
  ),
};

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
        rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
