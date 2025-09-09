'use client';

import { FileText } from 'lucide-react';

interface Collaborator {
  name: string;
  color: string;
  avatar?: string;
}

interface ContentCardProps {
  title: string;
  metadata: string;
  updateTime: string;
  type: string;
  collaborators: Collaborator[];
}

export function ContentCard({
  title,
  metadata,
  updateTime,
  type,
  collaborators
}: ContentCardProps) {
  const getThumbnailContent = () => {
    switch (type) {
      case 'video-brain':
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">视频大脑</span>
          </div>
        );
      case 'video-brain-1.3':
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">视频大脑1.3</span>
          </div>
        );
      case 'document-collage':
        return (
          <div className="w-full h-full bg-gray-100 p-2">
            <div className="grid grid-cols-2 gap-1 h-full">
              <div className="bg-white rounded p-1 text-xs">文档1</div>
              <div className="bg-white rounded p-1 text-xs">文档2</div>
              <div className="bg-white rounded p-1 text-xs">文档3</div>
              <div className="bg-white rounded p-1 text-xs">文档4</div>
            </div>
          </div>
        );
      case 'design-platform-mcp':
        return (
          <div className="w-full h-full bg-white p-3">
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              <div className="flex justify-between items-center mt-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">QR</span>
                </div>
                <div className="text-xs text-gray-500">Design Platform MCP</div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">预览</span>
          </div>
        );
    }
  };

  return (
    <div className="design-card-hover bg-card border border-border rounded-lg overflow-hidden cursor-pointer">
      {/* Thumbnail */}
      <div className="aspect-[5/3] bg-gray-100 relative">
        {getThumbnailContent()}
        <div className="absolute bottom-2 left-2">
          <FileText className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-card-foreground mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span>{metadata}</span>
            <span>·</span>
            <span>{updateTime}</span>
          </div>

          {collaborators.length > 0 && (
            <div className="flex items-center space-x-1">
              {collaborators.map((collaborator, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${collaborator.color === 'blue' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                >
                  {collaborator.avatar ? (
                    <img
                      src={collaborator.avatar}
                      alt={collaborator.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    collaborator.name
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
