'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, FileText, HelpCircle, MoreHorizontal, Plus, Share, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const stats = [
    { title: '总项目数', value: '12', icon: FileText, change: '+2 本周' },
    { title: '分享给我的', value: '8', icon: Share, change: '+1 本周' },
    { title: '团队成员', value: '24', icon: Users, change: '+3 本周' },
    { title: '活跃度', value: '95%', icon: TrendingUp, change: '+5% 本周' },
  ];

  const recentProjects = [
    { name: '内容大脑新增-报表', type: 'video-brain', lastUpdate: '2小时前' },
    { name: '1.3 团队库', type: 'video-brain-1.3', lastUpdate: '1天前' },
    { name: '京准通 | 腾讯 | 阿里妈妈接入', type: 'document-collage', lastUpdate: '3天前' },
    { name: 'Design Platform MCP', type: 'design-platform-mcp', lastUpdate: '1周前' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-base">{project.name}</CardTitle>
                <CardDescription className="text-sm">
                  类型: {project.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>最后更新: {project.lastUpdate}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
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
