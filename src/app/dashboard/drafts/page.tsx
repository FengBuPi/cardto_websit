'use client';

import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, FolderPlus, HelpCircle, MoreHorizontal } from 'lucide-react';

export default function DraftsPage() {
  const draftCards = [
    {
      id: 1,
      title: '产品设计稿 v2.0',
      metadata: '草稿',
      updateTime: '更新于 2小时前',
      type: 'design-draft',
      collaborators: []
    },
    {
      id: 2,
      title: '用户调研报告',
      metadata: '草稿',
      updateTime: '更新于 1天前',
      type: 'research-draft',
      collaborators: []
    },
    {
      id: 3,
      title: '技术方案文档',
      metadata: '草稿',
      updateTime: '更新于 3天前',
      type: 'tech-draft',
      collaborators: [
        { name: 'A', color: 'blue' }
      ]
    },
    {
      id: 4,
      title: '项目计划书',
      metadata: '草稿',
      updateTime: '更新于 1周前',
      type: 'plan-draft',
      collaborators: [
        { name: 'B', color: 'blue' },
        { name: 'C', color: 'blue' }
      ]
    },
    {
      id: 5,
      title: 'UI组件库设计',
      metadata: '草稿',
      updateTime: '更新于 2周前',
      type: 'ui-draft',
      collaborators: []
    },
    {
      id: 6,
      title: '数据分析报告',
      metadata: '草稿',
      updateTime: '更新于 3周前',
      type: 'data-draft',
      collaborators: [
        { name: 'D', color: 'blue' }
      ]
    }
  ];

  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">草稿箱</h1>
          <p className="text-muted-foreground">查看您的工作概览和最新动态</p>
        </div>
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
        {draftCards.map((card) => {
          return (
            <ContentCard
              key={card.id}
              title={card.title}
              metadata={card.metadata}
              updateTime={card.updateTime}
              collaborators={card.collaborators}
            />
          );
        })}
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
