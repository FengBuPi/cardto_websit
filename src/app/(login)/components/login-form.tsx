'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ArrowRight, Github } from 'lucide-react';
import { useLoginContext } from '../context/use-login-context';

export function LoginForm() {
  const {
    email,
    setEmail,
    isLoading,
    error,
    handleSocialLogin,
    handleFormSubmit,
  } = useLoginContext();

  return (
    <>
      {/* 错误提示 */}
      {error && (
        <div className={`mb-4 p-3 rounded-lg flex items-center ${error.type === 'error'
          ? 'bg-red-50 text-red-700 border border-red-200'
          : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{error.message}</span>
        </div>
      )}

      {/* 社交登录按钮 */}
      <div className="space-y-3 mb-6">
        <Button
          variant="outline"
          className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
          onClick={() => handleSocialLogin('github')}
          disabled={isLoading}
        >
          <Github className="w-5 h-5 mr-3" />
          GitHub
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </Button>
      </div>

      {/* 分隔线 */}
      <div className="relative mb-6">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-3 text-sm text-gray-500">或</span>
        </div>
      </div>

      {/* 邮箱登录表单 */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            邮箱地址
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="输入您的邮箱地址"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-12"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              继续
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* 法律条款 */}
      <p className="text-xs text-gray-500 text-center mt-6">
        继续使用即表示您同意我们的{' '}
        <a href="#" className="text-blue-600 hover:underline">服务条款</a>、{' '}
        <a href="#" className="text-blue-600 hover:underline">隐私政策</a>{' '}
        和{' '}
        <a href="#" className="text-blue-600 hover:underline">CardTo 附加条款</a>
      </p>
    </>
  );
}