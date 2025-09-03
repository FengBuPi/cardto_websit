# TanStack Query 使用指南 🚀

## 📋 目录

- [基础用法](#基础用法)
- [高级用法](#高级用法)
- [最佳实践](#最佳实践)
- [故障排除](#故障排除)
- [实际案例](#实际案例)

## 基础用法

### 1. 基本查询

```typescript
import { useQuery } from "@/hooks";

function TodoList() {
  const {
    data: todos,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">加载中...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded">
        错误: {(error as Error)?.message}
        <button
          onClick={() => refetch()}
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos?.map((todo: any) => (
        <div key={todo.id} className="p-4 border rounded">
          {todo.title}
        </div>
      ))}
    </div>
  );
}
```

### 2. 条件查询

```typescript
function UserProfile({ userId }: { userId?: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json()),
    enabled: !!userId, // 只有当 userId 存在时才执行查询
  });

  if (!userId) {
    return <div>请先选择用户</div>;
  }

  if (isLoading) {
    return <div>加载用户信息...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{user?.name}</h2>
      <p className="text-gray-600">{user?.email}</p>
    </div>
  );
}
```

### 3. 数据变更 (Mutation)

```typescript
import { useMutation, useQueryClient } from "@/hooks";

function CreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: async (newTodo: { title: string; completed: boolean }) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      return response.json();
    },
    onSuccess: (newTodo) => {
      // 成功后刷新 todos 列表
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      // 或者直接更新缓存（乐观更新）
      // queryClient.setQueryData(['todos'], (oldData: any) => [...oldData, newTodo]);
    },
    onError: (error) => {
      console.error("创建失败:", error);
      // 可以显示错误提示
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;

    createTodoMutation.mutate({
      title,
      completed: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="输入任务标题..."
        className="w-full p-2 border rounded"
        disabled={createTodoMutation.isPending}
      />
      <button
        type="submit"
        disabled={createTodoMutation.isPending}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
        {createTodoMutation.isPending ? "创建中..." : "创建任务"}
      </button>
    </form>
  );
}
```

---

## 高级用法

### 1. 无限滚动查询

```typescript
import { useInfiniteQuery } from "@/hooks";

function PostsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/posts?page=${pageParam}&limit=10`);
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      // 如果还有更多数据，返回下一页的页码
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
  });

  if (isLoading) return <div>加载中...</div>;

  return (
    <div className="space-y-4">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.posts.map((post: any) => (
            <div key={post.id} className="p-4 border rounded mb-2">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          {isFetchingNextPage ? "加载更多..." : "加载更多"}
        </button>
      )}
    </div>
  );
}
```

### 2. 预加载数据

```typescript
import { useQueryClient } from "@/hooks";

function UserList() {
  const queryClient = useQueryClient();

  const handleMouseEnter = (userId: string) => {
    // 鼠标悬停时预加载用户详情
    queryClient.prefetchQuery({
      queryKey: ["user", userId],
      queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json()),
      staleTime: 1000 * 60 * 5, // 5分钟内不重新获取
    });
  };

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div
          key={user.id}
          onMouseEnter={() => handleMouseEnter(user.id)}
          className="p-4 border rounded cursor-pointer hover:bg-gray-50">
          {user.name}
        </div>
      ))}
    </div>
  );
}
```

### 3. 乐观更新

```typescript
function TodoItem({ todo }: { todo: any }) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      return response.json();
    },
    onMutate: async ({ id, completed }) => {
      // 取消可能存在的查询
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // 快照当前数据
      const previousTodos = queryClient.getQueryData(["todos"]);

      // 乐观更新
      queryClient.setQueryData(["todos"], (old: any) =>
        old?.map((todo: any) => (todo.id === id ? { ...todo, completed } : todo)),
      );

      // 返回回滚函数
      return { previousTodos };
    },
    onError: (err, variables, context) => {
      // 出错时回滚
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      // 无论成功还是失败，都重新获取数据
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleMutation.mutate({ id: todo.id, completed: !todo.completed })}
      />
      <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.title}</span>
    </div>
  );
}
```

### 4. 使用自定义 Hooks

```typescript
// 使用项目中已定义的 hooks
import { useUsers, useCreateUser, useCacheManager } from "@/hooks";

function UsersPage() {
  const { data: users, isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const { invalidateUsers } = useCacheManager();

  const handleCreateUser = (userData: { name: string; email: string }) => {
    createUserMutation.mutate(userData, {
      onSuccess: () => {
        // 手动刷新用户列表
        invalidateUsers();
      },
    });
  };

  if (isLoading) return <div>加载用户列表...</div>;
  if (error) return <div>加载失败: {error.message}</div>;

  return (
    <div>
      <h1>用户管理</h1>

      {/* 创建用户表单 */}
      <form onSubmit={handleCreateUser}>{/* 表单字段 */}</form>

      {/* 用户列表 */}
      <div className="grid gap-4">
        {users?.map((user) => (
          <div key={user.id} className="p-4 border rounded">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 最佳实践

### 1. 查询键设计

```typescript
// ✅ 推荐的查询键结构
export const queryKeys = {
  // 集合查询
  todos: ["todos"] as const,
  users: ["users"] as const,

  // 单个项目查询
  todo: (id: string) => ["todos", id] as const,
  user: (id: string) => ["users", id] as const,

  // 嵌套查询
  userPosts: (userId: string) => ["users", userId, "posts"] as const,
  postComments: (postId: string) => ["posts", postId, "comments"] as const,

  // 分页查询
  todosPaginated: (page: number, limit: number) => ["todos", "paginated", { page, limit }] as const,

  // 搜索查询
  searchUsers: (query: string) => ["users", "search", query] as const,
};

// ❌ 不推荐的查询键
// 缺少类型安全
["users", userId, "posts"][
  // 过于复杂的对象
  ("data", { complex: { nested: "object" } })
];
```

### 2. 错误处理

```typescript
function DataComponent() {
  const { data, error, isError, failureCount, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
    retry: (failureCount, error) => {
      // 对特定错误不重试
      if (error?.status === 404) return false;
      // 对其他错误最多重试 3 次
      return failureCount < 3;
    },
  });

  if (isError) {
    return (
      <div className="error-container">
        <h3>出错了</h3>
        <p>{error?.message}</p>
        <p>已重试 {failureCount} 次</p>
        <button onClick={() => refetch()}>重试</button>
      </div>
    );
  }

  return <div>{/* 正常渲染 */}</div>;
}
```

### 3. 加载状态管理

```typescript
function SmartLoader() {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  // isLoading: 初始加载
  // isFetching: 任何获取状态（包括后台刷新）

  if (isLoading) {
    return <SkeletonLoader />; // 骨架屏
  }

  if (isFetching) {
    return (
      <div className="relative">
        {data && <DataDisplay data={data} />}
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorDisplay error={error} />;
  }

  return <DataDisplay data={data} />;
}
```

### 4. 缓存策略

```typescript
// 不同的数据类型使用不同的缓存策略
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 实时数据：短缓存时间
      staleTime: 1000 * 30, // 30秒
      gcTime: 1000 * 60 * 5, // 5分钟
    },
  },
});

// 用户偏好设置：长缓存时间
const userPrefsQuery = useQuery({
  queryKey: ["user-preferences"],
  queryFn: fetchUserPrefs,
  staleTime: 1000 * 60 * 60 * 24, // 24小时
  gcTime: 1000 * 60 * 60 * 24 * 7, // 7天
});

// 静态配置：永久缓存
const configQuery = useQuery({
  queryKey: ["app-config"],
  queryFn: fetchAppConfig,
  staleTime: Infinity, // 永不过期
  gcTime: Infinity,
});
```

---

## 故障排除

### 1. 查询不更新

```typescript
// 问题：查询键不匹配
const { data } = useQuery({
  queryKey: ["todos"], // 这里使用数组
  queryFn: fetchTodos,
});

// 错误：在其他地方使用字符串
queryClient.invalidateQueries({ queryKey: "todos" }); // 错误的

// 正确的方式
queryClient.invalidateQueries({ queryKey: ["todos"] }); // 正确的
```

### 2. 无限重渲染

```typescript
// ❌ 问题：每次渲染都创建新的对象
const { data } = useQuery({
  queryKey: [{ userId, filter: { status: "active" } }], // 每次都新对象
  queryFn: fetchUserData,
});

// ✅ 解决方案：使用稳定的引用
const queryKey = useMemo(() => ["user", userId, { status: filterStatus }], [userId, filterStatus]);

const { data } = useQuery({
  queryKey,
  queryFn: fetchUserData,
});
```

### 3. 内存泄漏

```typescript
// ❌ 问题：没有清理定时器
function AutoRefreshComponent() {
  const { refetch } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval); // ✅ 正确清理
  }, [refetch]);

  return <div>数据会每5秒刷新</div>;
}
```

### 4. 服务端渲染问题

```typescript
// ✅ 解决方案：条件渲染
function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
    enabled: typeof window !== "undefined", // 只在客户端执行
  });

  if (typeof window === "undefined") {
    return <div>服务端渲染中...</div>;
  }

  if (isLoading) return <div>加载中...</div>;

  return <div>{data}</div>;
}
```

---

## 实际案例

### 1. 电商网站 - 产品列表

```typescript
function ProductList({ category, search }: { category?: string; search?: string }) {
  const {
    data: products,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", { category, search }],
    queryFn: ({ pageParam = 1 }) =>
      fetch(`/api/products?page=${pageParam}&category=${category}&search=${search}`).then((res) =>
        res.json(),
      ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return (
    <div className="product-grid">
      {products?.pages.map((page, i) => (
        <div key={i}>
          {page.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          加载更多
        </button>
      )}
    </div>
  );
}
```

### 2. 社交应用 - 消息列表

```typescript
function ChatMessages({ chatId }: { chatId: string }) {
  const queryClient = useQueryClient();

  // 消息列表
  const { data: messages, isLoading } = useQuery({
    queryKey: ["chat", chatId, "messages"],
    queryFn: () => fetch(`/api/chats/${chatId}/messages`),
  });

  // 发送消息
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) =>
      fetch(`/api/chats/${chatId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content }),
      }),
    onSuccess: (newMessage) => {
      // 添加新消息到缓存
      queryClient.setQueryData(["chat", chatId, "messages"], (old: any) => [...old, newMessage]);

      // 标记为已读
      queryClient.invalidateQueries({
        queryKey: ["chat", chatId, "unread-count"],
      });
    },
  });

  return (
    <div className="chat-container">
      <MessageList messages={messages} isLoading={isLoading} />

      <MessageInput
        onSend={(content) => sendMessageMutation.mutate(content)}
        disabled={sendMessageMutation.isPending}
      />
    </div>
  );
}
```

### 3. 仪表板 - 数据可视化

```typescript
function Dashboard() {
  // 并行查询多个数据源
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () =>
      Promise.all([
        fetch("/api/users/count"),
        fetch("/api/orders/total"),
        fetch("/api/products/count"),
      ]).then(([users, orders, products]) =>
        Promise.all([users.json(), orders.json(), products.json()]),
      ),
  });

  // 实时数据（短轮询）
  const { data: realtimeStats } = useQuery({
    queryKey: ["realtime-stats"],
    queryFn: () => fetch("/api/stats/realtime").then((res) => res.json()),
    refetchInterval: 5000, // 每5秒刷新
  });

  return (
    <div className="dashboard-grid">
      <StatCard title="用户数" value={stats?.[0]?.count} />
      <StatCard title="订单总额" value={stats?.[1]?.total} />
      <StatCard title="商品数" value={stats?.[2]?.count} />

      <RealtimeChart data={realtimeStats} />
    </div>
  );
}
```

---

## 📁 项目结构说明

```
src/
├── lib/query-client.tsx     # 🔧 配置（已设置好）
├── hooks/                   # 🎣 自定义 hooks
│   ├── use-api.ts          # API 相关 hooks
│   └── index.ts            # 导出所有 hooks
└── components/
    └── query-example.tsx   # 📚 使用示例
```

---

## 📚 扩展阅读

- [TanStack Query 官方文档](https://tanstack.com/query/latest)
- [React Query Devtools](https://tanstack.com/query/devtools)
- [Next.js 数据获取](https://nextjs.org/docs/basic-features/data-fetching)
- [TypeScript 高级类型](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

## 🎯 总结

TanStack Query 提供了强大的数据管理能力：

✅ **自动缓存** - 减少不必要的请求
✅ **智能重试** - 提高可靠性
✅ **类型安全** - 完整的 TypeScript 支持
✅ **开发友好** - 丰富的开发工具
✅ **性能优化** - 多种优化策略

通过合理使用这些特性，您可以构建出高性能、用户体验优秀的 React 应用！

有任何问题或需要帮助，请随时询问！ 🚀</content>
</xai:function_call">Wrote contents to /Users/xuhaifeng/Desktop/cardto_websit/DATA_MANAGEMENT_GUIDE.md.
