# Design Platform - 在线协作设计平台

Design Platform 是一款专业的在线协作设计平台，支持团队协作、设计规范管理、资源社区等功能。

## ✨ 功能特性

- 🎨 **设计工具** - 强大的在线设计工具
- 👥 **团队协作** - 实时协作和版本控制
- 📐 **设计规范** - 统一的设计系统和组件库
- 🗂️ **资源管理** - 设计资源和素材管理
- 📱 **响应式设计** - 支持多设备适配
- 🔍 **搜索功能** - 快速查找设计资源

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

## 🚀 开始使用

1. **安装依赖**

   ```bash
   pnpm install
   ```

2. **启动开发服务器**

   ```bash
   pnpm dev
   ```

3. **访问应用**
   - 主应用: http://localhost:3000
   - Storybook: http://localhost:6006

## 📚 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Drizzle ORM + SQLite
- **组件库**: Radix UI + shadcn/ui
- **开发工具**: Storybook, ESLint, Prettier

## 🔧 开发指南

### 数据库操作

使用 Drizzle ORM 进行数据库操作：

```typescript
import { db } from "@/lib/db";
import { users } from "@/schema";

// 查询用户
const allUsers = await db.select().from(users);

// 创建用户
const newUser = await db
  .insert(users)
  .values({
    name: "John Doe",
    email: "john@example.com",
  })
  .returning();
```

## 📝 项目结构说明

- `src/app/` - Next.js App Router 页面和布局
- `src/components/` - 可复用的 React 组件
- `src/hooks/` - 自定义 React Hooks
- `src/lib/` - 工具函数和配置
- `src/schema/` - 数据库模式定义
- `src/stories/` - Storybook 组件故事

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
