// 共享类型定义
export type UserRole = 'owner' | 'editor' | 'viewer';
export type ProjectType = 'design' | 'document' | 'video' | 'image' | 'other';

// 协作权限枚举
export const COLLABORATION_ROLES = {
  OWNER: 'owner',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

// 项目类型枚举
export const PROJECT_TYPES = {
  DESIGN: 'design',
  DOCUMENT: 'document',
  VIDEO: 'video',
  IMAGE: 'image',
  OTHER: 'other',
} as const;
