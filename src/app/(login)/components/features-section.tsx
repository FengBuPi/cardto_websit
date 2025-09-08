import { Database, Lock, Settings, Shield, Zap } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Database,
    title: '索引/同步文档仓库',
    description: '轻松管理和同步您的文档资源',
  },
  {
    icon: Settings,
    title: '自定义 LLM 上下文交付',
    description: '智能优化 AI 模型的内容理解',
  },
  {
    icon: Shield,
    title: '高级安全控制',
    description: '企业级安全保障您的数据',
  },
  {
    icon: Zap,
    title: '更高的速率限制',
    description: '享受更快的处理速度和更高的并发',
  },
  {
    icon: Lock,
    title: '完整的 API 访问',
    description: '全面的 API 接口支持您的集成需求',
  },
];

export function FeaturesSection() {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:p-8">
      <div className="max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          免费加入 <span className="text-blue-600">CardTo</span>
        </h2>

        <div className="flex items-center mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          <span className="text-gray-600">无需信用卡</span>
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
