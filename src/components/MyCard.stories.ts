import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { MyCard } from './MyCard';

const meta = {
  title: 'Components/MyCard',
  component: MyCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '一个可复用的卡片组件，支持自定义样式和交互。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '卡片标题'
    },
    content: {
      control: 'text',
      description: '卡片内容'
    },
    shadow: {
      control: 'boolean',
      description: '是否显示阴影效果'
    },
    backgroundColor: {
      control: 'color',
      description: '卡片背景色'
    },
    onClick: {
      action: 'clicked',
      description: '点击事件处理函数'
    }
  },
  args: {
    onClick: fn()
  }
} satisfies Meta<typeof MyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '默认卡片',
    content: '这是一个默认样式的卡片组件，展示了基本的卡片结构和样式。'
  }
};

export const WithShadow: Story = {
  args: {
    title: '带阴影的卡片',
    content: '这个卡片启用了阴影效果，鼠标悬停时会有轻微的动画效果。',
    shadow: true
  }
};

export const CustomColor: Story = {
  args: {
    title: '自定义颜色的卡片',
    content: '这个卡片使用了自定义的背景色，可以根据需要调整颜色。',
    backgroundColor: '#f0f9ff',
    shadow: false
  }
};

export const LongContent: Story = {
  args: {
    title: '长内容的卡片',
    content: '这是一个包含较长内容的卡片示例。在实际使用中，卡片的内容可以是任意长度的文本。卡片组件会自动适应内容的长短，并保持良好的排版效果。这个示例展示了组件在处理较长文本时的表现。',
    shadow: true
  }
};
