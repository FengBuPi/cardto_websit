# 主题切换功能

本项目已集成了完整的黑夜/白天主题切换功能，使用 React Context 进行状态管理。

## 功能特性

- 🌙 **三种主题模式**：浅色、深色、系统跟随
- 🔄 **循环切换**：点击按钮在三种模式间循环切换
- 💾 **持久化存储**：主题选择会保存到 localStorage
- 🎨 **完整样式支持**：所有 shadcn/ui 组件都支持主题切换
- ⚡ **系统主题跟随**：自动跟随系统主题变化

## 使用方法

### 1. 在组件中使用主题上下文

```tsx
import { useTheme } from "@/contexts/theme-context";

function MyComponent() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div>
      <p>当前主题：{theme}</p>
      <p>实际主题：{actualTheme}</p>
      <button onClick={() => setTheme("dark")}>切换到深色模式</button>
    </div>
  );
}
```

### 2. 主题切换下拉菜单

主题切换按钮已集成到 Header 组件中，位于右上角。鼠标悬停在按钮上会显示下拉菜单，包含以下选项：

1. **浅色模式** (Sun 图标) - 强制使用浅色主题
2. **深色模式** (Moon 图标) - 强制使用深色主题
3. **跟随系统** (Monitor 图标) - 跟随系统主题设置

当前选中的主题会在右侧显示 ✓ 标记。

### 3. 自定义主题切换组件

如果需要自定义主题切换组件，可以参考 `src/components/theme-toggle.tsx`：

```tsx
import { useTheme } from "@/contexts/theme-context";

export function CustomThemeToggle() {
  const { theme, setTheme } = useTheme();

  // 自定义实现...
}
```

## 技术实现

### 文件结构

```
src/
├── contexts/
│   └── theme-context.tsx          # 主题上下文和提供者
├── components/
│   ├── theme-toggle.tsx           # 主题切换按钮组件
│   └── theme-example.tsx          # 使用示例组件
└── styles/
    └── globals.css                # 主题相关的 CSS 变量
```

### 核心文件说明

1. **theme-context.tsx**：提供主题状态管理和切换逻辑
2. **theme-toggle.tsx**：可复用的主题切换按钮组件
3. **globals.css**：定义了浅色和深色主题的 CSS 变量

### CSS 变量

主题切换通过 CSS 变量实现，支持：

- 背景色和前景色
- 卡片、弹窗、输入框等组件样式
- 侧边栏专用样式
- 图表颜色
- 边框和阴影效果

## 自定义主题

如需自定义主题颜色，可以修改 `src/styles/globals.css` 中的 CSS 变量：

```css
:root {
  /* 浅色主题变量 */
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... 其他变量 */
}

.dark {
  /* 深色主题变量 */
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... 其他变量 */
}
```

## 注意事项

1. 所有使用主题的组件都应该使用 `useTheme` hook 而不是直接访问 CSS 变量
2. 新增组件时，确保使用 shadcn/ui 的样式类，它们会自动支持主题切换
3. 自定义样式时，使用 CSS 变量而不是硬编码的颜色值
4. 主题切换按钮已集成到 Header 中，通常不需要额外添加
