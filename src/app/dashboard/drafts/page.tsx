'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpDown, FolderPlus, HelpCircle, MoreHorizontal } from 'lucide-react';

export default function DraftsPage() {
  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">草稿箱</h1>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <FolderPlus className="w-4 h-4 mr-2" />
          新建草稿
        </Button>
      </div>

      {/* Sort/Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            更新时间
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center text-muted-foreground py-12">
          <p>暂无草稿内容</p>
          <p className="text-sm mt-2">开始创建您的第一个草稿吧</p>
        </div>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-white text-gray-600 shadow-lg hover:shadow-xl transition-shadow"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
}
