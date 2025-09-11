# 服务层 (Services Layer)

本目录包含项目的数据访问层服务，遵循 MVC 架构中的 DTO 层概念。

## 架构说明

### 设计原则

- **关注点分离**: 将数据库查询逻辑从组件中分离
- **可复用性**: 服务层函数可以在多个组件中复用
- **可维护性**: 集中管理数据访问逻辑，便于维护和测试
- **类型安全**: 使用 TypeScript 确保类型安全
- **函数式设计**: 采用独立的函数而非类，符合 Next.js 最佳实践

### 文件结构

```
src/services/
├── index.ts              # 统一导出文件
├── post-service.ts       # 文章相关服务
└── README.md            # 说明文档
```

## 使用方法

### 在 Server Components 中使用

```typescript
import { fetchPostById } from "@/services/post-service";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetchPostById(parseInt(params.id));

  if (!post) {
    notFound();
  }

  return <div>{post.data}</div>;
}
```

### 在 API Routes 中使用

```typescript
import { fetchPostById } from "@/services/post-service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const post = await fetchPostById(parseInt(params.id));

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
```

### 统一导入使用

```typescript
import { fetchPostById, fetchPostsByUserId, createPost } from "@/services";
```

## 服务层函数

### 文章相关函数

- `fetchPostById(id: number)`: 根据 ID 获取文章
- `fetchPostsByUserId(userId: number)`: 根据用户 ID 获取文章列表
- `fetchAllPosts()`: 获取所有文章
- `createPost(data)`: 创建新文章
- `updatePost(id, data)`: 更新文章
- `deletePost(id)`: 删除文章

## 函数签名

```typescript
// 获取文章
export async function fetchPostById(id: number): Promise<DataStorage | null>;

// 获取用户文章列表
export async function fetchPostsByUserId(userId: number): Promise<DataStorage[]>;

// 获取所有文章
export async function fetchAllPosts(): Promise<DataStorage[]>;

// 创建文章
export async function createPost(data: {
  userId: number;
  data: string;
}): Promise<DataStorage | null>;

// 更新文章
export async function updatePost(id: number, data: { data?: string }): Promise<DataStorage | null>;

// 删除文章
export async function deletePost(id: number): Promise<boolean>;
```

## 最佳实践

1. **错误处理**: 所有服务层函数都包含适当的错误处理
2. **类型安全**: 使用 TypeScript 类型定义确保类型安全
3. **日志记录**: 在关键操作中添加适当的日志记录
4. **性能优化**: 使用适当的数据库查询优化
5. **函数式设计**: 采用独立的函数，便于测试和复用

## 扩展指南

当需要添加新的数据访问功能时：

1. 在相应的服务文件中添加新的函数
2. 确保包含适当的错误处理
3. 添加 TypeScript 类型定义
4. 更新此 README 文档
5. 在 `index.ts` 中导出新函数

## 与 Next.js 的集成

这些服务层函数完全兼容 Next.js 的：

- **Server Components**: 可以直接在服务器组件中调用
- **API Routes**: 可以在 API 路由中使用
- **Server Actions**: 可以包装为服务器操作
- **Middleware**: 可以在中间件中使用
