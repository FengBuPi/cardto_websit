import React from 'react';
import './MyCard.css';

export interface MyCardProps {
  /** 卡片标题 */
  title: string;
  /** 卡片内容 */
  content: string;
  /** 是否显示阴影 */
  shadow?: boolean;
  /** 卡片背景色 */
  backgroundColor?: string;
  /** 点击事件 */
  onClick?: () => void;
}

/**
 * 自定义卡片组件
 * 用于展示信息卡片，支持自定义样式和交互
 */
export const MyCard: React.FC<MyCardProps> = ({
  title,
  content,
  shadow = true,
  backgroundColor = '#ffffff',
  onClick
}) => {
  return (
    <div
      className={`my-card ${shadow ? 'my-card--shadow' : ''}`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <h3 className="my-card__title">{title}</h3>
      <p className="my-card__content">{content}</p>
    </div>
  );
};
