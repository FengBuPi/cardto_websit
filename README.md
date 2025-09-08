# CardTo - 现代化 Web 应用平台

CardTo 是一个基于 Next.js 和 Supabase 的现代化 Web 应用，提供完整的用户认证、项目管理、文件存储和协作功能。

## ✨ 功能特性

- 🔐 **用户认证** - 基于 Supabase 的完整认证系统
- 📊 **项目管理** - 创建、管理和分享项目
- 📁 **文件管理** - 上传、存储和管理文件
- 👥 **团队协作** - 多用户协作和权限管理
- 🗄️ **数据存储** - 灵活的数据存储和管理
- 📱 **响应式设计** - 支持多设备适配
- 🎨 **现代 UI** - 基于 shadcn/ui 的美观界面

## 🏗️ 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx          # 首页
│   └── globals.css       # 全局样式
├── components/            # React 组件
├── hooks/                 # 自定义 Hooks
│   ├── index.ts          # 导出所有 hooks
│   └── use-mobile.ts     # 移动端检测 hook
├── lib/                   # 工具库
└── stories/               # Storybook 组件
```

## 🚀 快速开始

### 5 分钟快速上手

1. **克隆项目**

   ```bash
   git clone <your-repo-url>
   cd cardto_websit
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **配置环境变量**

   ```bash
   # 复制环境变量模板
   cp .env.example .env.local

   # 编辑 .env.local，填入你的 Supabase 配置
   ```

4. **验证数据库**

   ```bash
   node scripts/verify-tables.js
   ```

5. **启动开发服务器**

   ```bash
   pnpm dev
   ```

6. **访问应用**
   - 主应用: http://localhost:3000
   - 数据库管理: `pnpm db:studio`
   - Storybook: `pnpm storybook`

📖 **详细指南**: 查看 [快速开始指南](./QUICKSTART.md)

## 📚 技术栈

- **前端框架**: Next.js 15 (App Router) + React 19
- **开发语言**: TypeScript
- **样式系统**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL) + Drizzle ORM
- **UI 组件**: shadcn/ui + Radix UI
- **认证系统**: Supabase Auth
- **开发工具**: Storybook, ESLint, Prettier
- **部署平台**: Vercel

## 📖 文档指南

### 📚 完整文档

- **[完整使用指南](./docs/complete-usage-guide.md)** - 详细的使用说明和最佳实践
- **[快速开始指南](./QUICKSTART.md)** - 5 分钟快速上手
- **[开发者参考卡片](./docs/developer-cheatsheet.md)** - 常用命令和代码速查

### 🗄️ 数据库相关

- **[Drizzle 迁移指南](./docs/drizzle-migration-guide.md)** - 数据库迁移工作流
- **[Supabase 配置指南](./docs/supabase-setup.md)** - Supabase 设置和配置

### 🔧 开发工具

- **数据库管理**: `pnpm db:studio`
- **迁移管理**: `pnpm db:generate` / `pnpm db:migrate`
- **代码检查**: `pnpm lint`
- **组件开发**: `pnpm storybook`

### 💡 快速参考

```typescript
// 数据库查询示例
import { db } from "@/lib/db";
import { users, projects } from "@/schema";

// 查询所有用户
const allUsers = await db.select().from(users);

// 创建新项目
const newProject = await db
  .insert(projects)
  .values({
    title: "My Project",
    type: "design",
    ownerId: 1,
  })
  .returning();
```

## 📁 项目结构

```
cardto_websit/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (login)/           # 登录页面组
│   │   ├── api/               # API 路由
│   │   └── dashbord/          # 仪表板页面
│   ├── components/            # 可复用组件
│   │   ├── ui/               # shadcn/ui 组件
│   │   └── layout/           # 布局组件
│   ├── lib/                  # 工具库
│   ├── schema/               # 数据库 Schema
│   └── types/                # TypeScript 类型
├── docs/                     # 项目文档
├── scripts/                  # 工具脚本
├── drizzle/                  # 数据库迁移文件
└── public/                   # 静态资源
```

### 核心目录说明

- `src/app/` - Next.js App Router 页面和布局
- `src/components/` - 可复用的 React 组件
- `src/lib/` - 工具函数和数据库配置
- `src/schema/` - Drizzle ORM 数据库模式定义
- `docs/` - 完整的项目文档
- `scripts/` - 数据库管理和部署脚本

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
