# 登录验证 Schema

这个目录包含了使用 Zod 进行表单验证的 schema 定义。

## 功能特性

- **邮箱验证**: 使用 Zod 的 `email()` 方法进行邮箱格式验证
- **长度限制**: 邮箱地址最大长度限制为 255 字符
- **必填验证**: 确保邮箱地址不为空
- **社交登录验证**: 验证支持的登录提供商（GitHub, Google）

## 使用示例

```typescript
import { emailLoginSchema } from "./login-schema";

// 验证邮箱
const result = emailLoginSchema.safeParse({ email: "user@example.com" });

if (result.success) {
  console.log("验证通过:", result.data);
} else {
  console.log("验证失败:", result.error.issues[0].message);
}
```

## 验证规则

### 邮箱验证

- 不能为空
- 必须是有效的邮箱格式
- 最大长度 255 字符

### 社交登录验证

- 只支持 'github' 和 'google' 两个提供商
- 其他值会返回错误信息
