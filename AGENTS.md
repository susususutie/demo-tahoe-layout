# AI 开发指南

> 本文档供 AI 助手开发时参考，包含项目规范、代码标准和开发流程。

## 必须遵守的规则 ⭐⭐⭐

### 1. 提交规范

- **完成文件修改后，必须主动执行 `git add` 和 `git commit` 提交更改**
- **不要等到用户提醒才提交**
- 提交信息格式：`type: 简短描述`
- type 可选值：`feat`, `fix`, `style`, `refactor`, `docs`, `chore`, `test`

### 2. 代码校验流程

修改代码后提交前**必须**执行：

```bash
pnpm format       # Prettier 格式化代码
pnpm lint         # 检查 ESLint 规范
pnpm build        # 确保 TypeScript 编译通过
pnpm test         # 运行测试确保通过
```

### 3. 任务管理

- 复杂任务使用 `todo_write` 工具拆解并追踪
- 及时更新任务状态（pending → in_progress → completed）

## 项目概述

macOS Tahoe 风格布局组件库，基于 Vite + React 19 + TypeScript。

**技术栈:**
| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.0 | 用户界面库 |
| TypeScript | ~5.9.3 | 类型系统 |
| Vite | ^7.3.1 | 构建工具 |
| ESLint | ^9.39.1 | 代码规范 |
| pnpm | latest | 包管理器 |
| vitest | ^4.0.18 | 单元测试 |
| @testing-library/react | ^16.3.2 | 组件测试库 |

## 项目结构

```
demo-tahoe-layout/
├── src/
│   ├── components/
│   │   ├── index.ts              # 统一导出
│   │   ├── TahoeLayout.tsx       # 核心布局组件
│   │   ├── TahoeLayout.css       # 布局样式
│   │   ├── ContentHeader.tsx     # 内容头部
│   │   ├── Toolbar.tsx           # 工具栏
│   │   ├── Breadcrumb.tsx        # 面包屑
│   │   ├── FloatingControls.tsx  # 悬浮按钮
│   │   └── sidebar/
│   │       ├── index.ts          # 模块导出
│   │       ├── types.ts          # 类型定义
│   │       ├── navData.ts        # 默认导航
│   │       ├── FinderSidebar.tsx # Finder 侧边栏
│   │       ├── FinderSidebar.css
│   │       └── ClassicSidebar.tsx
│   ├── __tests__/                # 测试文件
│   │   └── TahoeLayout.test.tsx
│   ├── test/
│   │   └── setup.ts              # 测试配置
│   ├── App.tsx                   # 演示页面
│   ├── App.css
│   ├── index.css                 # 全局样式
│   └── main.tsx                  # 应用入口
├── public/icons/                 # 应用图标
├── vite.config.ts
├── eslint.config.js
├── vitest.config.ts
├── tsconfig.json
├── .prettierrc
├── README.md                     # 用户文档
└── AGENTS.md                     # 本文件
```

## 代码规范

### CSS 命名

- 所有类名以 `finder-` 或 `tahoe-` 开头
- 使用 BEM 命名法：`finder-block__element--modifier`
- CSS 变量定义在 `:root` 或组件选择器中

### 深色模式

```css
@media (prefers-color-scheme: dark) {
  :root {
    --tahoe-bg-content: rgba(28, 28, 30, 0.55);
    --tahoe-text: rgba(255, 255, 255, 0.92);
  }
}
```

### 磨砂玻璃效果

必须同时设置两个属性：

```css
.backdrop {
  backdrop-filter: blur(40px) saturate(150%);
  -webkit-backdrop-filter: blur(40px) saturate(150%);
}
```

### 组件设计原则

- 组件职责单一，避免过度耦合
- Props 使用 TypeScript 完整类型定义
- 事件回调使用具名函数类型
- 组件文件与样式文件配对放置

## 核心组件

### TahoeLayout

主布局组件，整合侧边栏、头部和内容区。

**Props:**
| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| children | React.ReactNode | 是 | 主内容区子元素 |
| title | string | 否 | 页面标题 |
| theme | 'light' \| 'dark' \| 'system' | 否 | 主题模式 |
| sidebarVariant | 'finder' \| 'classic' | 否 | 侧边栏变体 |
| sidebarConfig | SidebarConfig | 否 | 侧边栏配置 |
| navSections | NavSection[] | 否 | 自定义导航数据 |
| breadcrumbs | BreadcrumbItem[] | 否 | 面包屑路径 |
| onNavSelect | (id: string) => void | 否 | 导航选中回调 |
| onThemeChange | (theme: ThemeMode) => void | 否 | 主题切换回调 |

### FinderSidebar

Finder 风格侧边栏，支持拖动调整宽度。

**特性:**

- 拖动调整宽度（最小 216px，最大 400px）
- 受控/非受控两种模式
- 内置滚动监听和玻璃遮罩效果
- 可折叠/展开的菜单分组

## 类型定义

```typescript
// src/components/sidebar/types.ts

interface NavItem {
  id: string
  label: string
  badge?: number
  shortcut?: string
  disabled?: boolean
  activeColor?: ActiveTextColor
  iconType?: 'svg' | 'appIcon' | 'image' | 'roundedRect' | 'circle' | 'coloredRect'
  iconName?: BuiltinIconName
  iconSrc?: string
  iconSize?: number
  iconColor?: string
}

interface NavSection {
  id: string
  title?: string
  items: NavItem[]
  highlightOnSelect?: boolean
  collapsible?: boolean
  defaultExpanded?: boolean
}

interface SidebarConfig {
  defaultCollapsed?: boolean
  showToggle?: boolean
  width?: number
  collapsedWidth?: number
}
```

## CSS 变量系统

### 布局尺寸

```css
:root {
  --tahoe-sidebar-width: 200px;
  --tahoe-sidebar-collapsed-width: 52px;
  --tahoe-header-height: 52px;
  --finder-width: 200px;
  --finder-collapsed-width: 52px;

  --tahoe-layout-margin: 8px;
  --tahoe-layout-gap: 4px;
  --tahoe-content-padding: 16px;

  --tahoe-radius: 10px;
  --finder-radius: 16px;
}
```

### 颜色系统（浅色）

```css
:root {
  --tahoe-bg-content: rgba(245, 245, 247, 0.42);
  --tahoe-bg-header: rgba(255, 255, 255, 0.35);
  --tahoe-text: rgba(0, 0, 0, 0.88);
  --tahoe-text-secondary: rgba(0, 0, 0, 0.55);
  --tahoe-border: rgba(255, 255, 255, 0.2);
  --tahoe-accent: #0071e3;
}
```

### 颜色系统（深色）

```css
@media (prefers-color-scheme: dark) {
  :root {
    --tahoe-bg-content: rgba(28, 28, 30, 0.55);
    --tahoe-bg-header: rgba(40, 40, 42, 0.48);
    --tahoe-text: rgba(255, 255, 255, 0.92);
    --tahoe-text-secondary: rgba(255, 255, 255, 0.55);
    --tahoe-border: rgba(255, 255, 255, 0.1);
  }
}
```

## 测试指南

### 测试框架

- **测试运行器:** Vitest
- **组件测试库:** @testing-library/react
- **DOM 测试扩展:** @testing-library/jest-dom
- **环境:** jsdom

### 运行测试

```bash
pnpm test           # 运行所有测试
pnpm test:watch     # 监听模式
pnpm test:coverage  # 生成覆盖率报告
```

### 测试常用 Mock

```typescript
// ResizeObserver
const ResizeObserverMock = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
globalThis.ResizeObserver = ResizeObserverMock

// matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})
```

## 核心特性实现

### 手动主题切换

- 支持 `light` / `dark` / `system` 三种模式
- 使用 `data-theme` 属性覆盖系统主题
- 主题偏好保存至 localStorage

### 移动端响应式抽屉

- 断点 768px
- 侧边栏变为抽屉式侧滑菜单
- 汉堡菜单按钮控制开关

## 参考资源

- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vitest 文档](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [backdrop-filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)

---

_最后更新: 2026-03-15_
