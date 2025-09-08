import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Mail } from 'lucide-react';
import { FeaturesSection } from './components/features-section';
import { LoginForm } from './components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
      {/* 背景图案 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20-18c9.941 0 18 8.059 18 18s-8.059 18-18 18S-8 39.941-8 30s8.059-18 18-18z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* 左侧登录表单 */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* 标题 */}
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
                继续使用 CardTo
              </h1>

              {/* 登录表单组件 */}
              <LoginForm />
            </CardContent>
          </Card>
        </div>

        {/* 右侧功能特性 */}
        <FeaturesSection />
      </div>

      {/* 右下角帮助按钮 */}
      <div className="fixed bottom-6 right-6 z-20">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg"
        >
          <Mail className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
