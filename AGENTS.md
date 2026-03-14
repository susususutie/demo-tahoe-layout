# AI 工作指南

> 本文档供 AI 助手阅读，了解项目规范后继续开发工作

## 项目概述

macOS Tahoe 风格布局组件库，基于 Vite + React 19 + TypeScript，提供磨砂玻璃效果、滚动透明遮罩、可配置的侧边栏系统，支持手动主题切换和移动端响应式抽屉模式。

## 技术栈

| 技术                   | 版本     | 说明                    |
| ---------------------- | -------- | ----------------------- |
| React                  | ^19.2.0  | 用户界面库              |
| TypeScript             | ~5.9.3   | 类型系统                |
| Vite                   | ^7.3.1   | 构建工具                |
| ESLint                 | ^9.39.1  | 代码规范（Flat Config） |
| pnpm                   | latest   | 包管理器                |
| lucide-react           | ^0.577.0 | macOS 风格图标库        |
| vitest                 | ^4.0.18  | 单元测试框架            |
| @testing-library/react | ^16.3.2  | React 组件测试库        |

## 项目文件结构

```
demo-tahoe-layout/
├── src/
│   ├── components/
│   │   ├── index.ts                  # 统一导出所有组件
│   │   ├── TahoeLayout.tsx          # 核心布局组件
│   │   ├── TahoeLayout.css          # 布局样式
│   │   ├── ContentHeader.tsx        # 内容头部组件
│   │   ├── Toolbar.tsx              # 工具栏组件
│   │   ├── Breadcrumb.tsx           # 面包屑组件
│   │   ├── Breadcrumb.css           # 面包屑样式
│   │   ├── FloatingControls.tsx     # 悬浮控制按钮组
│   │   ├── FloatingControls.css     # 悬浮按钮样式
│   │   └── sidebar/
│   │       ├── index.ts             # 侧边栏模块导出
│   │       ├── types.ts             # 类型定义（NavItem, NavSection, SidebarConfig 等）
│   │       ├── navData.ts           # 默认导航数据
│   │       ├── FinderSidebar.tsx    # Finder 风格侧边栏
│   │       ├── FinderSidebar.css    # Finder 侧边栏样式
│   │       └── ClassicSidebar.tsx   # 经典风格侧边栏
│   ├── __tests__/
│   │   └── TahoeLayout.test.tsx     # 布局组件测试
│   ├── test/
│   │   └── setup.ts                  # Vitest 测试配置
│   ├── App.tsx                       # 主应用（演示页面）
│   ├── App.css                       # 演示内容样式
│   ├── index.css                     # 全局样式
│   └── main.tsx                      # 应用入口
├── public/
│   └── icons/                        # 内置应用图标（PNG）
│       ├── clock.png
│       ├── finder.png
│       └── textedit.png
├── package.json                      # 依赖配置
├── vite.config.ts                    # Vite 构建配置
├── eslint.config.js                  # ESLint Flat Config
├── tsconfig.json                     # TypeScript 项目引用配置
├── tsconfig.app.json                 # 应用代码 TypeScript 配置
├── tsconfig.node.json                # Node 代码 TypeScript 配置
├── vitest.config.ts                  # Vitest 测试配置
├── .prettierrc                       # Prettier 格式化配置
├── README.md                         # 项目文档
└── AGENTS.md                         # 本文档
```

## 可用脚本

```bash
pnpm dev            # 启动开发服务器（默认 localhost:5173）
pnpm build          # 构建生产版本（TypeScript 编译 + Vite 构建）
pnpm lint           # 运行 ESLint 检查
pnpm format         # Prettier 格式化代码
pnpm preview        # 预览生产构建
pnpm test           # 运行 Vitest 测试
pnpm test:coverage  # 运行测试并生成覆盖率报告
```

## 核心组件说明

### TahoeLayout 组件 (`src/components/TahoeLayout.tsx`)

主布局组件，整合侧边栏、头部和内容区。

**Props:**

| 属性                 | 类型                          | 必填 | 说明                          |
| -------------------- | ----------------------------- | ---- | ----------------------------- |
| children             | React.ReactNode               | 是   | 主内容区子元素                |
| title                | string                        | 否   | 页面标题，默认 "Tahoe Layout" |
| theme                | 'light' \| 'dark' \| 'system' | 否   | 主题模式，默认 "system"       |
| sidebarVariant       | 'finder' \| 'classic'         | 否   | 侧边栏变体，默认 "finder"     |
| sidebarConfig        | SidebarConfig                 | 否   | 侧边栏配置                    |
| navSections          | NavSection[]                  | 否   | 自定义导航数据                |
| breadcrumbs          | BreadcrumbItem[]              | 否   | 面包屑路径                    |
| onBreadcrumbClick    | (item, index) => void         | 否   | 面包屑点击回调                |
| onNavSelect          | (id: string) => void          | 否   | 导航选中回调                  |
| onToolbarButtonClick | (id: string) => void          | 否   | 工具栏按钮点击回调            |
| onNewClick           | () => void                    | 否   | 新建按钮回调                  |
| onSearchClick        | () => void                    | 否   | 搜索按钮回调                  |
| onMoreClick          | () => void                    | 否   | 更多按钮回调                  |
| onThemeChange        | (theme: ThemeMode) => void    | 否   | 主题切换回调                  |

**内部 State:**

- `activeNavId: string` - 当前激活的导航项 ID
- `isSidebarCollapsed: boolean` - 侧边栏是否收起
- `isMobileDrawerOpen: boolean` - 移动端抽屉是否打开
- `resolvedTheme: 'light' | 'dark'` - 解析后的实际主题

### FinderSidebar 组件 (`src/components/sidebar/FinderSidebar.tsx`)

Finder 风格的侧边栏组件，支持拖动调整宽度。

**Props:**

| 属性              | 类型                                 | 必填 | 说明                 |
| ----------------- | ------------------------------------ | ---- | -------------------- |
| sections          | NavSection[]                         | 是   | 导航分组数据         |
| activeId          | string                               | 是   | 当前激活项 ID        |
| onSelect          | (id: string) => void                 | 是   | 选中回调             |
| config            | SidebarConfig                        | 否   | 侧边栏配置           |
| collapsed         | boolean                              | 否   | 收起状态（受控模式） |
| onCollapsedChange | (collapsed: boolean) => void         | 否   | 收起状态变化回调     |
| footer            | ReactNode                            | 否   | 自定义底部内容       |
| syncStatus        | SyncStatus                           | 否   | iCloud 同步状态      |
| user              | { name: string; avatar?: ReactNode } | 否   | 用户信息             |
| windowControls    | WindowControlCallbacks               | 否   | 窗口控制按钮回调     |

**特性:**

- 支持拖动调整宽度（最小 216px，最大 400px）
- 支持受控/非受控两种模式
- 内置滚动监听和玻璃遮罩效果
- 可折叠/展开的菜单分组

### ContentHeader 组件 (`src/components/ContentHeader.tsx`)

内容区头部，包含标题、面包屑、工具栏和汉堡菜单按钮。

### Toolbar 组件 (`src/components/Toolbar.tsx`)

工具栏组件，提供搜索、新建、视图切换等功能按钮。

### Breadcrumb 组件 (`src/components/Breadcrumb.tsx`)

面包屑导航组件，显示当前位置路径。

### FloatingControls 组件 (`src/components/FloatingControls.tsx`)

悬浮窗口控制按钮（红/黄/绿 macOS 风格按钮）。

## 类型定义

所有核心类型定义在 `src/components/sidebar/types.ts`：

### NavItem

导航项数据结构：

```typescript
interface NavItem {
  id: string
  label: string
  badge?: number // 徽章数字
  shortcut?: string // 快捷键提示
  disabled?: boolean // 是否禁用
  activeColor?: ActiveTextColor // 选中时文字颜色
  iconType?: 'svg' | 'appIcon' | 'image' | 'roundedRect' | 'circle' | 'coloredRect'
  iconName?: BuiltinIconName // 内置图标名称
  iconSrc?: string // 外部图片 URL
  iconSize?: number // 图标尺寸
  iconColor?: string // 图标颜色
}
```

### NavSection

导航分组数据结构：

```typescript
interface NavSection {
  id: string
  title?: string // 分组标题
  items: NavItem[] // 导航项列表
  highlightOnSelect?: boolean
  collapsible?: boolean // 是否可折叠
  defaultExpanded?: boolean // 默认展开状态
}
```

### SidebarConfig

侧边栏配置：

```typescript
interface SidebarConfig {
  defaultCollapsed?: boolean
  showToggle?: boolean
  width?: number // 展开宽度
  collapsedWidth?: number // 收起宽度
}
```

### BuiltinIconName

内置图标名称，包含 100+ 个 macOS 风格图标，如：

- `airdrop`, `recent`, `applications`, `documents`, `downloads`
- `finder`, `clock`, `textedit`
- `settings`, `wifi`, `bluetooth`, `battery`
- 等等...

## CSS 变量系统

### FinderSidebar 变量 (`:root`)

| 变量名                     | 默认值                    | 说明                     |
| -------------------------- | ------------------------- | ------------------------ |
| `--finder-width`           | 200px                     | 侧边栏宽度（可拖动调整） |
| `--finder-collapsed-width` | 52px                      | 收起后宽度               |
| `--finder-radius`          | 16px                      | 圆角半径                 |
| `--finder-blur`            | blur(40px) saturate(150%) | 磨砂玻璃效果             |
| `--finder-accent`          | rgba(0,113,227,0.6)       | 强调色（淡蓝）           |

### TahoeLayout 变量

| 变量名                            | 默认值 | 说明           |
| --------------------------------- | ------ | -------------- |
| `--tahoe-sidebar-width`           | 200px  | 侧边栏占位宽度 |
| `--tahoe-sidebar-collapsed-width` | 52px   | 侧边栏收起宽度 |
| `--tahoe-header-height`           | 52px   | 头部高度       |
| `--tahoe-radius`                  | 10px   | 圆角半径       |
| `--tahoe-layout-margin`           | 8px    | 布局外边距     |
| `--tahoe-layout-gap`              | 4px    | 布局间隙       |
| `--tahoe-content-padding`         | 16px   | 内容区内边距   |

### 颜色系统

**浅色模式:**

```css
--tahoe-bg-content: rgba(245, 245, 247, 0.42);
--tahoe-bg-header: rgba(255, 255, 255, 0.35);
--tahoe-text: rgba(0, 0, 0, 0.88);
--tahoe-text-secondary: rgba(0, 0, 0, 0.55);
--tahoe-border: rgba(255, 255, 255, 0.2);
--tahoe-accent: #0071e3;
```

**深色模式:**

```css
--tahoe-bg-content: rgba(28, 28, 30, 0.55);
--tahoe-bg-header: rgba(40, 40, 42, 0.48);
--tahoe-text: rgba(255, 255, 255, 0.92);
--tahoe-text-secondary: rgba(255, 255, 255, 0.55);
--tahoe-border: rgba(255, 255, 255, 0.1);
```

**主题切换:** 使用 `data-theme` 属性 + `@media (prefers-color-scheme: dark)` 媒体查询

## 开发规则

### 1. 代码校验

修改代码后提交前必须执行：

```bash
pnpm format       # Prettier 格式化代码
pnpm lint         # 检查 ESLint 规范
pnpm build        # 确保 TypeScript 编译通过
pnpm test         # 运行测试确保通过
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
- `test:` - 测试相关

### 3. CSS 命名规范

- 所有类名以 `finder-` 或 `tahoe-` 开头
- 使用 BEM 命名法：`finder-block__element--modifier`
- CSS 变量定义在 `:root` 或组件选择器中
- 深色模式使用 `@media (prefers-color-scheme: dark)`

### 4. 组件设计原则

- 组件职责单一，避免过度耦合
- Props 使用 TypeScript 完整类型定义
- 事件回调使用具名函数类型
- 组件文件与样式文件配对放置

## 测试指南

### 测试框架

- **测试运行器:** Vitest
- **组件测试库:** @testing-library/react
- **DOM 测试扩展:** @testing-library/jest-dom
- **环境:** jsdom

### 测试文件组织

- 测试文件放在 `src/__tests__/` 目录
- 命名规范：`{组件名}.test.tsx`
- 配置文件：`vitest.config.ts`
- 测试设置：`src/test/setup.ts`

### 运行测试

```bash
pnpm test           # 运行所有测试
pnpm test:watch     # 监听模式运行测试
pnpm test:coverage  # 生成覆盖率报告
```

### 测试示例

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TahoeLayout from '../components/TahoeLayout'

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('TahoeLayout Component', () => {
  it('should render with default props', () => {
    render(
      <BrowserRouter>
        <TahoeLayout title="Test Title">
          <div>Test Content</div>
        </TahoeLayout>
      </BrowserRouter>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
```

### 常用 Mock

测试中常用的全局 Mock：

- **ResizeObserver:** 用于侧边栏拖动功能测试
- **matchMedia:** 用于主题切换测试

## 核心特性

### 磨砂玻璃效果

```css
.tahoe-sidebar {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(40px) saturate(150%) brightness(1.05);
  -webkit-backdrop-filter: blur(40px) saturate(150%);
}
```

### 拖动调整宽度

- 最小宽度：216px
- 最大宽度：400px
- 拖动时实时更新 CSS 变量 `--finder-width`
- 切换按钮和内容区自动跟随

### 手动主题切换

- 支持 `light`(亮色) / `dark`(暗色) / `system`(跟随系统) 三种模式
- 工具栏提供主题切换按钮（月亮/太阳图标）
- 点击切换即时生效，无需刷新
- 使用 `data-theme` 属性覆盖系统主题设置
- 监听系统主题变化，`system` 模式下自动同步
- 主题偏好保存至 localStorage

### 移动端响应式抽屉

- 断点 768px
- 侧边栏变为抽屉式侧滑菜单
- 新增汉堡菜单按钮
- 点击遮罩层关闭抽屉
- 选择导航项后自动关闭抽屉

## 常见问题 (FAQ)

**Q: 如何添加新的导航项？**
A: 传递 `navSections` 属性给 TahoeLayout：

```tsx
const customNavSections: NavSection[] = [
  {
    id: 'my-group',
    title: '我的分组',
    items: [
      { id: 'item1', label: '项目1', iconName: 'folder' },
    ],
  },
]

<TahoeLayout navSections={customNavSections}>
  <YourContent />
</TahoeLayout>
```

**Q: 如何修改侧边栏宽度？**
A: 拖动侧边栏右侧的手柄，或修改 CSS 变量：

```css
:root {
  --finder-width: 240px;
}
```

**Q: 如何禁用侧边栏收起功能？**
A: 不传递 `onCollapsedChange` 回调，且不传递 `collapsed` 属性。

**Q: 如何添加自定义应用图标？**
A: 将 PNG 图标放入 `public/icons/` 目录：

```tsx
{ id: 'myapp', label: '我的应用', iconType: 'appIcon', iconName: 'myapp' }
// 需添加文件: public/icons/myapp.png
```

**Q: backdrop-filter 在某些浏览器不生效？**
A: 确保：

1. 同时设置 `-webkit-backdrop-filter`
2. 元素有背景色（非透明）
3. 浏览器版本支持（Chrome 76+, Safari 9+, Firefox 103+）

## 构建与部署

### 构建配置

- **开发服务器:** `vite dev` (Vite 7.3.1)
- **生产构建:** `tsc -b && vite build`
- **输出目录:** `dist/`
- **部署路径:** `/demo-tahoe-layout/`（GitHub Pages 自动部署）

### 环境配置

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/demo-tahoe-layout/',
})
```

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
- [Vitest 文档](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [backdrop-filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [CSS 自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

_最后更新: 2026-03-14_
