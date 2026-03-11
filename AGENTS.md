# AI 工作指南

> 本文档供 AI 助手阅读，了解项目规范后继续开发工作

## 项目概述

macOS Finder 风格侧边栏组件，基于 Vite + React 19 + TypeScript，带有磨砂玻璃效果、可拖动调整宽度、悬浮控制按钮组。

## 技术栈

| 技术         | 版本     | 说明             |
| ------------ | -------- | ---------------- |
| React        | ^19.2.0  | 用户界面库       |
| TypeScript   | ~5.9.3   | 类型系统         |
| Vite         | ^7.3.1   | 构建工具         |
| ESLint       | ^9.39.1  | 代码规范         |
| pnpm         | latest   | 包管理器         |
| lucide-react | ^0.577.0 | macOS 风格图标库 |

## 项目文件结构

```
demo-tahoe-layout/
├── src/
│   ├── components/
│   │   ├── sidebar/              # 侧边栏组件目录
│   │   │   ├── FinderSidebar.tsx # Finder 风格侧边栏
│   │   │   ├── FinderSidebar.css # 侧边栏样式
│   │   │   ├── types.ts          # 类型定义
│   │   │   └── index.ts          # 导出
│   │   ├── TahoeLayout.tsx       # 核心布局组件
│   │   ├── TahoeLayout.css       # 布局样式
│   │   ├── FloatingControls.tsx  # 悬浮控制按钮组
│   │   ├── FloatingControls.css  # 悬浮按钮样式
│   │   ├── Breadcrumb.tsx        # 面包屑组件
│   │   └── Breadcrumb.css        # 面包屑样式
│   ├── App.tsx                   # 主应用（演示页面）
│   ├── App.css                   # 演示内容样式
│   ├── index.css                 # 全局样式
│   └── main.tsx                  # 应用入口
├── public/
│   └── icons/                    # 内置应用图标
├── package.json                  # 依赖配置
├── vite.config.ts                # Vite 配置
├── eslint.config.js              # ESLint 配置（Flat Config）
├── tsconfig.json                 # TypeScript 配置
├── README.md                     # 项目文档
└── AGENTS.md                     # 本文档
```

## 可用脚本

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本（tsc + vite build）
pnpm lint         # 运行 ESLint 检查
pnpm preview      # 预览生产构建
```

## 核心组件说明

### TahoeLayout 组件 (`src/components/TahoeLayout.tsx`)

**Props:**

- `children: React.ReactNode` - 主内容区子元素
- `title?: string` - 页面标题，默认 "Tahoe Layout"
- `sidebarVariant?: 'finder' | 'classic'` - 侧边栏变体
- `sidebarConfig?: SidebarConfig` - 侧边栏配置
- `breadcrumbs?: BreadcrumbItem[]` - 面包屑路径
- `onBreadcrumbClick?: (item, index) => void` - 面包屑点击回调
- `onNavSelect?: (id) => void` - 导航选中回调

**State:**

- `activeNavId: string` - 当前激活的导航项 ID
- `isSidebarCollapsed: boolean` - 侧边栏是否收起

### FinderSidebar 组件 (`src/components/sidebar/FinderSidebar.tsx`)

**Props:**

- `sections: NavSection[]` - 导航分组数据
- `activeId: string` - 当前激活项 ID
- `onSelect: (id) => void` - 选中回调
- `config?: SidebarConfig` - 侧边栏配置
- `collapsed?: boolean` - 受控模式收起状态
- `onCollapsedChange?: (collapsed) => void` - 收起状态变化回调

**特性:**

- 支持拖动调整宽度（最小 216px，最大 400px）
- 支持受控/非受控两种模式
- 内置滚动监听和玻璃遮罩效果
- 可折叠/展开的菜单分组

### FloatingControls 组件 (`src/components/FloatingControls.tsx`)

**Props:**

- `isCollapsed: boolean` - 侧边栏是否收起
- `onExpand: () => void` - 展开回调
- `onCollapse: () => void` - 收起回调

**功能:**

- 三色窗口控制按钮（红/黄/绿）始终固定在左上角
- 切换按钮位置随侧边栏状态变化
- 层级高于侧边栏（z-index: 200）

### 图标系统

项目使用 `lucide-react` 提供 macOS 风格的 SVG 图标：

```tsx
import { Clock, FolderOpen, Image } from 'lucide-react'
```

支持 6 种图标类型（通过 `iconType` 指定）：

- `'svg'` - Lucide 线条图标（可随文字变色）
- `'appIcon'` - 内置应用图标（/icons/ 目录下的 PNG）
- `'image'` - 外部图片 URL
- `'roundedRect'` - 固定颜色圆角矩形
- `'circle'` - 固定颜色圆形（标签用）
- `'coloredRect'` - 彩色背景 + 白色图标

### CSS 变量定义

**FinderSidebar 变量 (`:root`):**
| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--finder-width` | 200px | 侧边栏宽度（可拖动调整） |
| `--finder-collapsed-width` | 52px | 收起后宽度 |
| `--finder-radius` | 16px | 圆角半径 |
| `--finder-blur` | blur(40px) saturate(150%) | 磨砂玻璃效果 |
| `--finder-accent` | rgba(0,113,227,0.6) | 强调色（淡蓝） |

**TahoeLayout 变量:**
| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--tahoe-sidebar-width` | 200px | 侧边栏占位宽度 |
| `--tahoe-header-height` | 52px | 头部高度 |
| `--tahoe-radius` | 10px | 圆角半径 |
| `--tahoe-blur` | blur(40px) saturate(150%) | 磨砂玻璃效果 |

### 颜色系统

**浅色模式:**

- 侧边栏背景: `rgba(255, 255, 255, 0.32)`
- 内容区背景: `rgba(245, 245, 247, 0.42)`
- 主文字: `rgba(0, 0, 0, 0.88)`
- 次文字: `rgba(0, 0, 0, 0.55)`
- 边框: `rgba(255, 255, 255, 0.2)`

**深色模式:**

- 侧边栏背景: `rgba(40, 40, 42, 0.48)`
- 内容区背景: `rgba(28, 28, 30, 0.55)`
- 主文字: `rgba(255, 255, 255, 0.92)`
- 次文字: `rgba(255, 255, 255, 0.55)`
- 边框: `rgba(255, 255, 255, 0.1)`

**自动切换:** 使用 `@media (prefers-color-scheme: dark)` 自动适配系统主题

## 开发规则

### 1. 代码校验

修改代码后提交前必须执行：

```bash
pnpm format       # Prettier 格式化代码
pnpm lint         # 检查 ESLint 规范
pnpm build        # 确保 TypeScript 编译通过
```

确保以上全部通过后再提交。

### 2. 提交规范

每次完成独立功能后立即提交，提交信息格式：

```bash
git add .
git commit -m "type: 简短描述

- 详细变更点 1
- 详细变更点 2
- 详细变更点 3"
```

**type 前缀:**

- `feat:` - 新功能
- `fix:` - 修复 bug
- `style:` - 样式调整（不影响功能）
- `refactor:` - 重构代码
- `docs:` - 文档更新
- `chore:` - 构建/工具配置

### 3. 任务追踪

复杂任务必须拆解，使用 todo 工具记录任务列表。

**状态:**

- `pending` - 待开始
- `in_progress` - 进行中
- `completed` - 已完成
- `blocked` - 阻塞中（需注明原因）

### 4. CSS 命名规范

- 所有类名以 `finder-` 或 `tahoe-` 开头
- 使用 BEM 命名法：`finder-block__element--modifier`
- CSS 变量定义在 `:root` 或组件选择器中
- 深色模式使用 `@media (prefers-color-scheme: dark)`

### 5. 类型定义

所有类型定义在 `src/components/sidebar/types.ts`：

- `NavItem` - 导航项数据
- `NavSection` - 导航分组
- `SidebarProps` - 侧边栏属性
- `SidebarConfig` - 侧边栏配置
- `BuiltinIconName` - 内置图标名称（100+ 个）

## 核心特性

### 磨砂玻璃效果

```css
.finder-sidebar {
  background: rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(40px) saturate(150%);
  -webkit-backdrop-filter: blur(40px) saturate(150%);
}
```

### 拖动调整宽度

- 最小宽度：216px
- 最大宽度：400px
- 拖动时实时更新 CSS 变量 `--finder-width`
- 切换按钮和内容区自动跟随

### 悬浮控制按钮组

- 三色按钮（红/黄/绿）固定在左上角
- 切换按钮位置随侧边栏状态变化
- 侧边栏收起时靠近三色按钮
- 侧边栏展开时位于侧边栏内部右侧

### 可折叠菜单分组

```typescript
{
  id: 'favorites',
  title: '个人收藏',
  collapsible: true,      // 可折叠
  defaultExpanded: true,  // 默认展开
  items: [...]
}
```

### 响应式设计

侧边栏在移动端 (`max-width: 768px`) 默认隐藏，可通过添加 `.open` 类显示。

## 常见问题 (FAQ)

**Q: 如何添加新的导航项？**
A: 修改 `TahoeLayout.tsx` 中的 `navSections`：

```tsx
const navSections: NavSection[] = [
  {
    id: 'apps',
    title: '应用程序',
    items: [{ id: 'finder', label: 'Finder', iconType: 'appIcon', iconName: 'finder' }],
  },
]
```

**Q: 如何修改侧边栏宽度？**
A: 拖动侧边栏右侧的手柄，或修改 CSS 变量：

```css
:root {
  --finder-width: 240px;
}
```

**Q: 如何禁用侧边栏收起功能？**
A: 不传 `onCollapsedChange` 回调，或不传递 `collapsed` 属性。

**Q: 如何添加自定义图标？**
A: 将 PNG 图标放入 `public/icons/` 目录，使用 `iconType: 'appIcon'`：

```tsx
{ id: 'myapp', label: '我的应用', iconType: 'appIcon', iconName: 'myapp' }
```

**Q: backdrop-filter 在某些浏览器不生效？**
A: 确保：

1. 同时设置 `-webkit-backdrop-filter`
2. 元素有背景色（非透明）
3. 浏览器版本支持（Chrome 76+, Safari 9+, Firefox 103+）

## 浏览器兼容性

| 浏览器  | 最低版本 |
| ------- | -------- |
| Chrome  | 76+      |
| Safari  | 9+       |
| Firefox | 103+     |
| Edge    | 79+      |

> 注意：磨砂玻璃效果需要支持 `backdrop-filter` 的现代浏览器

## 参考资源

- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev/)
- [backdrop-filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [CSS 自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)

---

_最后更新: 2026-03-09_
