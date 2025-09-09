'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown, FileText, Grid3X3, Home, Plus, Share } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'shared' }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { id: 'home', icon: Home, label: '主页', href: '/dashboard/home' },
    { id: 'drafts', icon: FileText, label: '草稿箱', href: '/dashboard/drafts' },
    { id: 'shared', icon: Share, label: '分享给我的', href: '/dashboard/share-me' },
  ];

  const resourceItems = [
    { id: 'resources', icon: Grid3X3, label: '资源社区' },
  ];

  const teamItems = [
    { id: 'guide', label: '使用指南' },
    { id: 'specs', label: '设计规范' },
    { id: 'business-a', label: '业务A' },
    { id: 'business-b', label: '业务B' },
  ];

  // 导航处理函数
  const handleNavigation = (href: string) => {
    router.push(href);
  };

  // 根据当前路径确定活动项
  const getActiveItem = () => {
    if (pathname === '/dashboard' || pathname === '/dashboard/home') return 'home';
    if (pathname === '/dashboard/drafts') return 'drafts';
    if (pathname === '/dashboard/share-me') return 'shared';
    return activeItem;
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = getActiveItem() === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className={`w-full justify-start h-10 px-3 ${isActive
                  ? 'design-sidebar-active text-sidebar-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>

        {/* Resource Section */}
        <div className="mt-8">
          <div className="space-y-1">
            {resourceItems.map((item) => {
              const Icon = item.icon;

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-8">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <ChevronDown className="w-4 h-4 mr-3" />
              疯不皮的团队
            </Button>

            <div className="ml-6 space-y-1">
              {teamItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start h-8 px-3 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Action */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Plus className="w-4 h-4 mr-3" />
          新建团队
        </Button>
      </div>
    </aside>
  );
}
