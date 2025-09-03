# Cardto Website 🚀

基于 Next.js 15 + TypeScript + TanStack Query 的现代化 React 应用

## ✨ 主要特性

- **⚡ Next.js 15** - 最新的 React 全栈框架
- **🔷 TypeScript** - 完整的类型安全
- **🎣 TanStack Query** - 强大的数据获取和缓存
- **🎨 Tailwind CSS** - 现代化的 CSS 框架
- **📚 Storybook** - 组件开发和文档
- **🧪 Vitest** - 快速的单元测试
- **🎯 ESLint + Prettier** - 代码质量保证

## 🚀 快速开始

### 环境要求

```bash
Node.js >= 18.18.0 (推荐使用 Node.js 20+)
```

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局 (已集成 TanStack Query)
│   ├── page.tsx          # 首页 (包含示例)
│   └── globals.css       # 全局样式
├── components/            # React 组件
│   └── query-example.tsx # TanStack Query 示例组件
├── hooks/                 # 自定义 Hooks
│   ├── index.ts          # 导出所有 hooks
│   ├── use-api.ts        # API 相关 hooks
│   └── use-query-client.ts # QueryClient hook
├── lib/                   # 工具库
│   └── query-client.tsx  # TanStack Query 配置
└── stories/               # Storybook 组件
```

## 🎣 TanStack Query 使用指南

### 基础查询

```typescript
import { useQuery } from "@/hooks";

function UserList() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((res) => res.json()),
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 数据变更

```typescript
import { useMutation, useQueryClient } from "@/hooks";

function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userData) =>
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return <button onClick={() => mutation.mutate({ name: "新用户" })}>创建用户</button>;
}
```

## 📚 文档

### 📖 快速入门

- **[快速开始](QUICK_START.md)** - 5 分钟上手指南
- **[文档索引](docs/README.md)** - 文档导航和学习路径

### 🎣 数据管理

- **[数据管理指南](DATA_MANAGEMENT_GUIDE.md)** - 完整的使用文档和最佳实践

### 📚 技术文档

- **[项目概览](README.md)** - 特性、配置和部署指南

## 🛠️ 开发工具

### 可用的脚本

```bash
# 开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# Storybook
pnpm storybook

# 类型检查
npx tsc --noEmit
```

### VSCode 配置

项目包含完整的 VSCode 配置：

- 自动格式化和修复
- TypeScript 智能提示
- ESLint 集成
- 调试配置
- 推荐扩展

### 开发工具

- **TanStack Query Devtools** - 在开发环境中查看查询状态
- **React Developer Tools** - React 组件调试
- **Storybook** - 组件开发和测试

## 🎨 样式和主题

项目使用 Tailwind CSS 进行样式管理：

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold">卡片标题</h2>
  <p className="mt-2">卡片内容</p>
</div>
```

## 🧪 测试

```bash
# 运行所有测试
npx vitest

# 运行特定测试文件
npx vitest run src/components/Button.test.tsx

# 监听模式
npx vitest --watch
```

## 🚀 部署

### Vercel (推荐)

```bash
# 连接到 Vercel
npx vercel

# 部署
npx vercel --prod
```

### 其他平台

项目可以部署到任何支持 Node.js 的平台：

- Netlify
- Railway
- Render
- 自托管服务器

## 📖 学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [TanStack Query 文档](https://tanstack.com/query/latest)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
