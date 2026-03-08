# macOS Tahoe 风格布局组件

一个基于 Vite + React + TypeScript 的 macOS Tahoe 风格布局组件，带有磨砂玻璃效果和滚动透明遮罩。

## 特性

- 🪟 **磨砂玻璃效果** - 使用 `backdrop-filter` 实现毛玻璃视觉效果
- 📜 **滚动透明遮罩** - 侧边栏和内容区滚动时显示渐变透明遮罩
- 🎨 **macOS 风格** - Tahoe 风格设计，现代美观
- 🌙 **深色模式** - 自动适配系统颜色主题
- ⚡ **高性能** - 基于 Vite 构建，开发体验流畅

## 技术栈

- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [React 19](https://react.dev/) - 用户界面库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [pnpm](https://pnpm.io/) - 高效的包管理器

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 组件使用

```tsx
import TahoeLayout from './components/TahoeLayout'

function App() {
  return (
    <TahoeLayout sidebarContent={null} title="My App">
      {/* 你的内容 */}
    </TahoeLayout>
  )
}
```

## 核心效果

### 滚动遮罩 (Vignette)

当侧边栏或内容区滚动时，顶部和底部会显示渐变透明遮罩，创造优雅的视觉过渡效果：

```css
.tahoe-content-vignette.top {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
}
```

### 磨砂玻璃效果

```css
.tahoe-sidebar {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
}
```

## 作者

sutie
