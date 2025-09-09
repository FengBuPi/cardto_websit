'use client';

import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, FileText, HelpCircle, Plus, Share, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const stats = [
    { title: '总项目数', value: '12', icon: FileText, change: '+2 本周' },
    { title: '分享给我的', value: '8', icon: Share, change: '+1 本周' },
    { title: '团队成员', value: '24', icon: Users, change: '+3 本周' },
    { title: '活跃度', value: '95%', icon: TrendingUp, change: '+5% 本周' },
  ];

  const recentProjects = [
    {
      id: 1,
      title: '内容大脑新增-报表',
      metadata: '项目',
      updateTime: '更新于 2小时前',
      collaborators: []
    },
    {
      id: 2,
      title: '1.3 团队库',
      metadata: '项目',
      updateTime: '更新于 1天前',
      collaborators: [
        { name: 'A', color: 'blue' }
      ]
    },
    {
      id: 3,
      title: '京准通 | 腾讯 | 阿里妈妈接入',
      metadata: '项目',
      updateTime: '更新于 3天前',
      collaborators: []
    },
    {
      id: 4,
      title: 'Design Platform MCP',
      metadata: '项目',
      updateTime: '更新于 1周前',
      collaborators: [
        { name: 'B', color: 'blue' },
        { name: 'C', color: 'blue' }
      ]
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">欢迎回来</h1>
          <p className="text-muted-foreground">查看您的工作概览和最新动态</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          新建项目
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">最近项目</h2>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            查看全部
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProjects.map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              metadata={project.metadata}
              updateTime={project.updateTime}
              collaborators={project.collaborators}
            />
          ))}
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
