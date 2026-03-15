# macOS Tahoe 风格布局组件

一个基于 Vite + React 19 + TypeScript 的 macOS Tahoe 风格布局组件库，带有磨砂玻璃效果、滚动透明遮罩和可配置的侧边栏系统。

![Tahoe Layout](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6)

## 特性

- 🪟 **磨砂玻璃效果** - 使用 `backdrop-filter` 实现 macOS 风格毛玻璃视觉效果
- 📜 **滚动透明遮罩** - 侧边栏和内容区滚动时显示渐变透明遮罩
- 🎨 **可配置化布局** - 所有定位值提取为 CSS 变量，支持灵活自定义
- 🧩 **组件化架构** - 工具栏、头部、侧边栏等组件独立封装，可单独使用
- 🌙 **深色模式** - 支持手动切换亮色/暗色模式，或跟随系统
- 📱 **响应式设计** - 移动端(<768px)侧边栏变为抽屉模式
- ⚡ **高性能** - 基于 Vite 构建，开发体验流畅

## 在线演示

[GitHub Pages Demo](https://susususutie.github.io/demo-tahoe-layout/)

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/susususutie/demo-tahoe-layout.git
cd demo-tahoe-layout

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 安装使用

```bash
pnpm install
```

## 基础用法

```tsx
import { TahoeLayout } from './components'

function App() {
  return (
    <TahoeLayout title="My App">
      <YourContent />
    </TahoeLayout>
  )
}
```

### 使用面包屑导航

```tsx
const breadcrumbs = [
  { id: 'home', label: '首页', icon: '🏠' },
  { id: 'docs', label: '文档' },
  { id: 'page', label: '当前页面' },
]

<TahoeLayout
  breadcrumbs={breadcrumbs}
  onBreadcrumbClick={(item, index) => console.log(item, index)}
>
  <YourContent />
</TahoeLayout>
```

### 自定义导航数据

```tsx
import type { NavSection } from './components'

const navSections: NavSection[] = [
  {
    id: 'my-group',
    title: '我的分组',
    items: [
      { id: 'item1', label: '项目1', iconName: 'folder' },
      { id: 'item2', label: '项目2', iconType: 'circle', iconColor: '#ff3b30' },
    ],
  },
]

<TahoeLayout navSections={navSections} />
```

## 组件 API

### TahoeLayout Props

| 属性           | 类型                          | 必填 | 说明                          |
| -------------- | ----------------------------- | ---- | ----------------------------- |
| children       | React.ReactNode               | 是   | 主内容区子元素                |
| title          | string                        | 否   | 页面标题，默认 "Tahoe Layout" |
| theme          | 'light' \| 'dark' \| 'system' | 否   | 主题模式，默认 "system"       |
| sidebarVariant | 'finder' \| 'classic'         | 否   | 侧边栏变体，默认 "finder"     |
| sidebarConfig  | SidebarConfig                 | 否   | 侧边栏配置                    |
| navSections    | NavSection[]                  | 否   | 自定义导航数据                |
| breadcrumbs    | BreadcrumbItem[]              | 否   | 面包屑路径                    |
| onNavSelect    | (id: string) => void          | 否   | 导航选中回调                  |
| onThemeChange  | (theme: ThemeMode) => void    | 否   | 主题切换回调                  |

### 类型定义

```typescript
interface NavItem {
  id: string
  label: string
  badge?: number
  iconType?: 'svg' | 'appIcon' | 'image' | 'roundedRect' | 'circle' | 'coloredRect'
  iconName?: string
  iconColor?: string
}

interface NavSection {
  id: string
  title?: string
  items: NavItem[]
  collapsible?: boolean
  defaultExpanded?: boolean
}
```

## 自定义主题

通过 CSS 变量自定义样式：

```css
:root {
  --tahoe-sidebar-width: 200px;
  --tahoe-header-height: 52px;
  --tahoe-radius: 10px;
  --tahoe-accent: #0071e3;
}

@media (prefers-color-scheme: dark) {
  :root {
    --tahoe-bg-content: rgba(28, 28, 30, 0.55);
    --tahoe-text: rgba(255, 255, 255, 0.92);
  }
}
```

## 可用脚本

```bash
pnpm dev            # 启动开发服务器（默认 localhost:5173）
pnpm build          # 构建生产版本
pnpm preview        # 预览生产构建
pnpm test           # 运行测试
pnpm lint           # 运行 ESLint 检查
pnpm format         # 格式化代码
```

## 浏览器兼容性

| 浏览器  | 最低版本 |
| ------- | -------- |
| Chrome  | 76+      |
| Safari  | 9+       |
| Firefox | 103+     |
| Edge    | 79+      |

> 注意：`backdrop-filter` 需要现代浏览器支持

## 项目结构

```
demo-tahoe-layout/
├── src/
│   ├── components/         # 组件目录
│   │   ├── TahoeLayout.tsx
│   │   ├── sidebar/
│   │   │   ├── FinderSidebar.tsx
│   │   │   └── types.ts
│   │   └── ...
│   ├── App.tsx            # 演示页面
│   └── main.tsx           # 应用入口
├── public/icons/          # 应用图标
└── package.json
```

## 常见问题

**Q: 如何修改侧边栏宽度？**
A: 拖动侧边栏右侧的手柄，或修改 CSS 变量 `--finder-width`。

**Q: 如何添加自定义应用图标？**
A: 将 PNG 图标放入 `public/icons/` 目录，使用 `iconType: 'appIcon'`。

**Q: 如何禁用侧边栏收起功能？**
A: 不传递 `onCollapsedChange` 回调即可。

## 开发文档

详细的开发规范请查看 [AGENTS.md](./AGENTS.md)。

## License

MIT

---

_作者: sutie_  
_最后更新: 2026-03-15_
