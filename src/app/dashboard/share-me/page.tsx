'use client';

import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, FolderPlus, HelpCircle, MoreHorizontal } from 'lucide-react';

export default function MainContent() {
  const contentCards = [
    {
      id: 1,
      title: '内容大脑新增-报表',
      metadata: '外部文件',
      updateTime: '更新于 8月26日 15:54',
      type: 'video-brain',
      collaborators: []
    },
    {
      id: 2,
      title: '1.3 团队库',
      metadata: '外部文件',
      updateTime: '更新于 8月24日 15:57',
      type: 'video-brain-1.3',
      collaborators: []
    },
    {
      id: 3,
      title: '京准通 | 腾讯 | 阿里妈妈接入',
      metadata: '外部文件',
      updateTime: '更新于 8月7日 11:06',
      type: 'document-collage',
      collaborators: []
    },
    {
      id: 4,
      title: 'Design Platform MCP',
      metadata: '外部...',
      updateTime: '更新于 6月25日 16:33',
      type: 'design-platform-mcp',
      collaborators: [
        { name: 'S', color: 'blue' },
        { name: 'E', color: 'blue' }
      ]
    }
  ];

  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">分享给我的</h1>
          <p className="text-muted-foreground">查看您的工作概览和最新动态</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <FolderPlus className="w-4 h-4 mr-2" />
          导入文件
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
        {contentCards.map((card) => {
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
