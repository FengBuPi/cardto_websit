'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { emailLoginSchema, socialLoginSchema } from '../schemas/login-schema';

export interface LoginError {
  message: string;
  type: 'error' | 'success';
}

export interface LoginUser {
  id: string;
  email: string;
  name?: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: LoginUser;
  };
  error?: string;
}

// 内部实现函数
function useLoginContextInternal() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const router = useRouter();

  // 清除错误状态
  const clearError = () => {
    setError(null);
  };

  // 邮箱登录
  const handleEmailLogin = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // 使用 Zod 验证邮箱格式
      const validationResult = emailLoginSchema.safeParse({ email });

      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        setError({
          message: firstError?.message || '验证失败',
          type: 'error'
        });
        return false;
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: validationResult.data.email }),
      });

      const result: LoginResponse = await response.json();

      if (result.success && result.data) {
        // 登录成功，保存 token 并跳转
        localStorage.setItem('auth_token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        router.push('/dashboard');
        return true;
      } else {
        setError({
          message: result.error || '登录失败',
          type: 'error'
        });
        return false;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('登录错误:', error);
      setError({
        message: '登录失败，请稍后重试',
        type: 'error'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 社交登录
  const handleSocialLogin = async (provider: 'github' | 'google'): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // 使用 Zod 验证 provider
      const validationResult = socialLoginSchema.safeParse({ provider });

      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        setError({
          message: firstError?.message || '验证失败',
          type: 'error'
        });
        return false;
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `user@${validationResult.data.provider}.com`, // 模拟社交登录邮箱
          provider: validationResult.data.provider
        }),
      });

      const result: LoginResponse = await response.json();

      if (result.success && result.data) {
        // 登录成功，保存 token 并跳转
        localStorage.setItem('auth_token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        window.location.href = '/';
        return true;
      } else {
        setError({
          message: result.error || '登录失败',
          type: 'error'
        });
        return false;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('登录错误:', error);
      setError({
        message: '登录失败，请稍后重试',
        type: 'error'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 表单提交处理
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 验证逻辑已经在 handleEmailLogin 中处理
    await handleEmailLogin(email);
  };

  return {
    // 状态
    email,
    setEmail,
    isLoading,
    error,

    // 方法
    clearError,
    handleEmailLogin,
    handleSocialLogin,
    handleFormSubmit,
  };
}

// 创建 Context
const LoginContext = createContext<ReturnType<typeof useLoginContextInternal> | null>(null);

// Provider 组件
export function LoginProvider({ children }: { children: ReactNode }) {
  const loginContext = useLoginContextInternal();
  return (
    <LoginContext.Provider value={loginContext}>
      {children}
    </LoginContext.Provider>
  );
}

// Hook 用于使用 Context
export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
}
