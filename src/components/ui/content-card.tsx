'use client';

import { FileText } from 'lucide-react';

interface Collaborator {
  name: string;
  color: string;
  avatar?: string;
}

interface ContentCardProps {
  /** 标题 */
  title: string;
  /** 元数据 */
  metadata: string;
  /** 更新时间 */
  updateTime: string;
  /** 缩略图 */
  thumbnail?: React.ReactNode;
  /** 协作人 */
  collaborators: Collaborator[];
}

export function ContentCard({
  title,
  metadata,
  updateTime,
  thumbnail,
  collaborators
}: ContentCardProps) {

  return (
    <div className="design-card-hover bg-card border border-border rounded-lg overflow-hidden cursor-pointer">
      {/* Thumbnail */}
      <div className="aspect-[5/3] bg-gray-100 relative">
        {thumbnail || (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">预览</span>
          </div>
        )}
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
