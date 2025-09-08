'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-sm transform rotate-12"></div>
        </div>
        <span className="text-xl font-semibold text-foreground">Design Platform</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="搜索"
            className="pl-10 bg-input border-input text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Upgrade Button */}
        <Button className="design-gradient text-white px-4 py-2 h-auto text-sm font-medium whitespace-nowrap">
          席位体系升级 全新设计、产品、研发席位 了解更多
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">2</span>
          </div>
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 design-avatar rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-white">皮</span>
        </div>
      </div>
    </header>
  );
}
