# macOS Tahoe 风格布局组件

一个基于 Vite + React 19 + TypeScript 的 macOS Tahoe 风格布局组件库，带有磨砂玻璃效果、滚动透明遮罩和可配置的侧边栏系统。

## 特性

- 🪟 **磨砂玻璃效果** - 使用 `backdrop-filter` 实现 macOS 风格毛玻璃视觉效果
- 📜 **滚动透明遮罩** - 侧边栏和内容区滚动时显示渐变透明遮罩
- 🎨 **可配置化布局** - 所有定位值提取为 CSS 变量，支持灵活自定义
- 🧩 **组件化架构** - 工具栏、头部、侧边栏等组件独立封装，可单独使用
- 🌙 **深色模式** - 自动适配系统颜色主题（`prefers-color-scheme: dark`）
- 📱 **响应式设计** - 支持移动端适配（断点 768px）
- ⚡ **高性能** - 基于 Vite 构建，开发体验流畅

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [Vite](https://vitejs.dev/) | ^7.3.1 | 下一代前端构建工具 |
| [React](https://react.dev/) | ^19.2.0 | 用户界面库 |
| [TypeScript](https://www.typescriptlang.org/) | ~5.9.3 | 类型系统 |
| [pnpm](https://pnpm.io/) | latest | 包管理器 |
| [ESLint](https://eslint.org/) | ^9.39.1 | 代码规范（Flat Config） |

## 项目结构

```
demo-tahoe-layout/
├── src/
│   ├── components/           # 组件目录
│   │   ├── index.ts         # 统一导出所有组件
│   │   ├── TahoeLayout.tsx  # 主布局组件（精简版）
│   │   ├── TahoeLayout.css  # 布局样式（含 CSS 变量系统）
│   │   ├── ContentHeader.tsx # 内容头部（面包屑/标题 + 工具栏）
│   │   ├── Toolbar.tsx      # 工具栏组件
│   │   ├── Breadcrumb.tsx   # 面包屑导航
│   │   ├── FloatingControls.tsx # 悬浮控制按钮（三色按钮）
│   │   └── sidebar/         # 侧边栏组件目录
│   │       ├── index.ts     # 侧边栏模块导出
│   │       ├── types.ts     # 类型定义
│   │       ├── navData.ts   # 默认导航数据
│   │       ├── FinderSidebar.tsx  # Finder 风格侧边栏
│   │       └── ClassicSidebar.tsx # 经典风格侧边栏
│   ├── App.tsx              # 主应用（演示页面）
│   └── main.tsx             # 应用入口
├── public/icons/            # 应用图标资源
├── package.json
├── vite.config.ts
├── eslint.config.js         # ESLint Flat Config
└── tsconfig.json            # TypeScript 项目引用配置
```

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

# 运行 ESLint 检查
pnpm lint
```

## 组件使用

### 基础用法

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
import { TahoeLayout } from './components'

const breadcrumbs = [
  { id: 'home', label: '首页', icon: '🏠' },
  { id: 'docs', label: '文档' },
  { id: 'page', label: '当前页面' },
]

function App() {
  return (
    <TahoeLayout
      breadcrumbs={breadcrumbs}
      onBreadcrumbClick={(item, index) => console.log(item, index)}
    >
      <YourContent />
    </TahoeLayout>
  )
}
```

### 自定义工具栏事件

```tsx
<TahoeLayout
  onToolbarButtonClick={(id) => console.log('Toolbar clicked:', id)}
  onNewClick={() => console.log('New button clicked')}
  onSearchClick={() => console.log('Search clicked')}
>
  <YourContent />
</TahoeLayout>
```

### 独立使用子组件

```tsx
import { ContentHeader, Toolbar } from './components'

// 单独使用 ContentHeader
<ContentHeader
  title="页面标题"
  breadcrumbs={breadcrumbs}
  onNewClick={handleNew}
/>

// 单独使用 Toolbar
<Toolbar
  onButtonClick={handleButtonClick}
  showNewButton={true}
  newButtonLabel="创建"
/>
```

## 配置系统

所有布局定位值提取为 CSS 变量，支持全局自定义：

```css
:root {
  /* 布局尺寸 */
  --tahoe-sidebar-width: 200px;
  --tahoe-sidebar-collapsed-width: 52px;
  --tahoe-header-height: 52px;

  /* 间距系统 */
  --tahoe-spacing-xs: 4px;
  --tahoe-spacing-sm: 8px;
  --tahoe-spacing-md: 12px;
  --tahoe-spacing-lg: 16px;
  --tahoe-spacing-xl: 24px;

  /* 定位系统 */
  --tahoe-layout-margin: 8px;
  --tahoe-layout-gap: 4px;
  --tahoe-content-padding: 16px;
  --tahoe-header-left-offset: 120px;

  /* 圆角系统 */
  --tahoe-radius: 10px;
  --tahoe-radius-sm: 6px;

  /* 颜色系统（浅色模式） */
  --tahoe-bg-content: rgba(245, 245, 247, 0.42);
  --tahoe-bg-header: rgba(255, 255, 255, 0.35);
  --tahoe-text: rgba(0, 0, 0, 0.88);
  --tahoe-text-secondary: rgba(0, 0, 0, 0.55);
  --tahoe-border: rgba(255, 255, 255, 0.2);
  --tahoe-accent: #0071e3;
}
```

## 核心效果

### 磨砂玻璃效果

```css
.tahoe-sidebar {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(40px) saturate(150%) brightness(1.05);
  -webkit-backdrop-filter: blur(40px) saturate(150%);
}
```

### 滚动遮罩 (Vignette)

侧边栏头部使用多层遮罩实现滚动时的平滑过渡效果：

```css
.finder-sidebar-header::before {
  /* 头部模糊遮罩层 */
  background: linear-gradient(
    to bottom,
    var(--finder-bg) 0%,
    var(--finder-bg) 60%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(80px) saturate(180%) brightness(1.1);
}
```

## 扩展指南

### 添加新的侧边栏变体

1. 在 `src/components/sidebar/` 创建新组件
2. 实现 `SidebarProps` 接口
3. 在 `TahoeLayout.tsx` 的 `SidebarVariant` 类型中添加新变体
4. 在 `renderSidebar()` 方法中添加渲染逻辑

### 自定义导航数据

```tsx
import type { NavSection } from './components'

const customNavSections: NavSection[] = [
  {
    id: 'my-group',
    title: '我的分组',
    items: [
      { id: 'item1', label: '项目1', iconName: 'folder', activeColor: 'macos' },
      { id: 'item2', label: '项目2', iconType: 'circle', iconColor: '#ff3b30' },
    ],
  },
]

<TahoeLayout navSections={customNavSections} />
```

### 支持的图标类型

- `svg` (默认): 使用内置 SVG 图标，可随选中状态变色
- `appIcon`: macOS 应用图标（从 `/icons/` 目录加载）
- `image`: 外部图片图标
- `circle`: 固定颜色的圆形图标（标签用）
- `roundedRect`: 固定颜色的圆角矩形图标
- `coloredRect`: 彩色背景 + 白色图标的圆角矩形

## 开发规范

1. **代码校验** - 修改后必须执行 `pnpm build && pnpm lint`
2. **提交规范** - 遵循约定式提交（`feat:`, `fix:`, `refactor:`, `style:`, `docs:`）
3. **CSS 命名** - 所有类名以 `tahoe-` 开头，使用 BEM 命名法
4. **组件隔离** - 组件职责单一，避免过度耦合

## 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 76+ |
| Safari | 9+ |
| Firefox | 103+ |
| Edge | 79+ |

> 注意：`backdrop-filter` 需要现代浏览器支持

## 作者

sutie