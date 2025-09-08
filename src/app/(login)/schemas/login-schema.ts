import { z } from 'zod';

// 邮箱登录表单验证 schema
export const emailLoginSchema = z.object({
  email: z
    .string()
    .min(1, '请输入邮箱地址')
    .email('请输入有效的邮箱地址')
    .max(255, '邮箱地址过长'),
});

// 社交登录验证 schema
export const socialLoginSchema = z.object({
  provider: z.enum(['github', 'google'], {
    message: '不支持的登录方式',
  }),
});

// 导出类型
export type EmailLoginFormData = z.infer<typeof emailLoginSchema>;
export type SocialLoginFormData = z.infer<typeof socialLoginSchema>;
