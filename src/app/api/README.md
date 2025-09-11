# API 接口文档

本目录包含项目的 API 接口层，负责处理 HTTP 请求并调用服务层函数。

## 架构说明

### 设计原则

- **接口层职责**: 处理 HTTP 请求、参数验证、响应格式化
- **服务层调用**: 所有业务逻辑通过调用服务层函数实现
- **错误处理**: 统一的错误处理和响应格式
- **类型安全**: 使用 TypeScript 确保类型安全

### 文件结构

```
src/app/api/
├── data/
│   ├── route.ts          # 文章数据基础操作 (GET, POST)
│   └── [id]/
│       └── route.ts      # 文章数据特定操作 (PUT, DELETE)
├── posts/
│   └── route.ts          # 文章列表操作 (GET)
└── README.md            # API 文档
```

## API 接口列表

### 文章数据操作

#### 1. 创建文章

- **接口**: `POST /api/data`
- **服务层函数**: `createPost()`
- **请求体**:
  ```json
  {
    "userId": 1,
    "data": "文章内容"
  }
  ```
- **响应**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "message": "数据存储成功"
  }
  ```

#### 2. 获取文章

- **接口**: `GET /api/data?id=1`
- **服务层函数**: `fetchPostById()`
- **响应**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "data": "文章内容",
      "userId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### 3. 更新文章

- **接口**: `PUT /api/data/1`
- **服务层函数**: `updatePost()`
- **请求体**:
  ```json
  {
    "data": "更新后的文章内容"
  }
  ```
- **响应**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "message": "数据更新成功"
  }
  ```

#### 4. 删除文章

- **接口**: `DELETE /api/data/1`
- **服务层函数**: `deletePost()`
- **响应**:
  ```json
  {
    "success": true,
    "data": null,
    "message": "数据删除成功"
  }
  ```

### 文章列表操作

#### 5. 获取所有文章

- **接口**: `GET /api/posts`
- **服务层函数**: `fetchAllPosts()`
- **响应**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "data": "文章内容1",
        "userId": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### 6. 按用户获取文章

- **接口**: `GET /api/posts?userId=1`
- **服务层函数**: `fetchPostsByUserId()`
- **响应**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "data": "用户1的文章",
        "userId": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

## 服务层函数映射

| API 接口                    | 服务层函数             | 说明             |
| --------------------------- | ---------------------- | ---------------- |
| `POST /api/data`            | `createPost()`         | 创建新文章       |
| `GET /api/data?id=xxx`      | `fetchPostById()`      | 根据 ID 获取文章 |
| `PUT /api/data/[id]`        | `updatePost()`         | 更新文章         |
| `DELETE /api/data/[id]`     | `deletePost()`         | 删除文章         |
| `GET /api/posts`            | `fetchAllPosts()`      | 获取所有文章     |
| `GET /api/posts?userId=xxx` | `fetchPostsByUserId()` | 按用户获取文章   |

## 错误处理

所有 API 接口都使用统一的错误处理机制：

- **400**: 客户端错误（参数缺失、格式错误等）
- **404**: 资源未找到
- **500**: 服务器内部错误

错误响应格式：

```json
{
  "success": false,
  "error": "错误信息",
  "code": 400
}
```

## 使用示例

### 在客户端组件中使用

```typescript
// 获取文章
const response = await fetch("/api/data?id=1");
const result = await response.json();

// 创建文章
const response = await fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: 1,
    data: "新文章内容",
  }),
});
```

### 在服务器组件中使用

```typescript
// 直接调用服务层函数
import { fetchPostById } from "@/services/post-service";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetchPostById(parseInt(params.id));
  // ...
}
```

## 最佳实践

1. **参数验证**: 在 API 层进行严格的参数验证
2. **错误处理**: 使用统一的错误处理机制
3. **类型安全**: 使用 TypeScript 确保类型安全
4. **服务层调用**: 所有业务逻辑通过服务层实现
5. **响应格式**: 保持一致的响应格式
6. **日志记录**: 记录关键操作和错误信息
