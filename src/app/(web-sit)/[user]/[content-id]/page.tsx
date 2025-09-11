interface BlogPostPageProps {
  children: React.ReactNode;
}

export default function BlogPostPage({
  children
}: BlogPostPageProps) {

  return (
    <>
      {/* 默认内容 */}
      {children}
    </>
  );
}
