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

---

## 🤖 AI 工作指南

> 本章节供 AI 助手阅读，了解项目规范后继续开发工作

### 项目文件结构

```
demo-tahoe-layout/
├── src/
│   ├── components/
│   │   ├── TahoeLayout.tsx    # 核心布局组件
│   │   └── TahoeLayout.css    # 组件样式（含遮罩效果）
│   ├── App.tsx                # 主应用（演示页面）
│   ├── App.css                # 演示内容样式
│   ├── index.css              # 全局样式
│   └── main.tsx               # 应用入口
├── package.json               # 依赖配置
├── vite.config.ts             # Vite 配置
└── README.md                  # 本文档
```

### 核心组件说明

**TahoeLayout 组件** (`src/components/TahoeLayout.tsx`):
- Props: `children`, `sidebarContent`, `title`
- 状态: `sidebarScrolled`, `contentScrolled`, `activeItem`
- 通过监听 scroll 事件控制遮罩显示

**CSS 变量定义** (`src/components/TahoeLayout.css`):
- `--tahoe-sidebar-width`: 240px 侧边栏宽度
- `--tahoe-header-height`: 52px 头部高度
- `--tahoe-vignette-size`: 60px 遮罩高度
- `--tahoe-blur`: blur(20px) saturate(180%) 模糊效果

### 开发规则

#### 1. 代码校验
- 修改后必须运行 `pnpm build` 确保无编译错误
- TypeScript 严格模式已启用
- 使用 ESLint 检查代码规范

#### 2. 提交规范
每次完成独立功能后立即提交：

```bash
# 示例提交信息
git add .
git commit -m "feat: 添加响应式侧边栏折叠功能

- 添加 useMediaQuery hook 监听屏幕宽度
- 侧边栏在 < 768px 时自动隐藏
- 添加汉堡菜单按钮控制显示"
```

提交类型前缀：
- `feat:` 新功能
- `fix:` 修复 bug
- `style:` 样式调整（不影响功能）
- `refactor:` 重构代码
- `docs:` 文档更新

#### 3. 任务追踪
复杂任务必须拆解并记录：

```bash
# 创建/更新任务列表（在对话开始时）
```

任务状态：
- `pending` - 待开始
- `in_progress` - 进行中
- `completed` - 已完成
- `blocked` - 阻塞中（需说明原因）

#### 4. CSS 命名规范
- 所有类名以 `tahoe-` 开头
- BEM 命名法：`tahoe-block__element--modifier`
- CSS 变量定义在 `:root` 中，支持深色模式

#### 5. 颜色系统
浅色模式：
- 背景: `rgba(255, 255, 255, 0.72)` 侧边栏, `rgba(255, 255, 255, 0.64)` 内容区
- 文字: `rgba(0, 0, 0, 0.85)` 主文字, `rgba(0, 0, 0, 0.5)` 次文字
- 强调色: `#007aff` (Apple 蓝)

深色模式（通过 `prefers-color-scheme: dark` 自动切换）：
- 背景: `rgba(30, 30, 30, 0.72)` 侧边栏, `rgba(28, 28, 28, 0.64)` 内容区
- 文字: `rgba(255, 255, 255, 0.9)` 主文字

### 扩展开发建议

#### 添加新功能时的步骤
1. 分析需求，拆解为子任务
2. 更新任务列表状态
3. 修改代码并本地测试
4. 运行 `pnpm build` 验证
5. 提交代码并更新任务状态
6. 重复直到所有任务完成

#### 常见扩展方向
1. **响应式增强**: 移动端侧边栏抽屉、触摸手势支持
2. **可配置主题**: 允许用户自定义主色调、透明度
3. **动画优化**: 添加 Framer Motion 实现更流畅的过渡
4. **无障碍支持**: 键盘导航、屏幕阅读器支持
5. **性能优化**: 虚拟滚动、CSS containment

### Git 配置

项目使用 sutie 用户配置：
```bash
git config user.name "sutie"
git config user.email "susususutie@gmail.com"
```

远程仓库: `git@github.com:susususutie/demo-tahoe-layout.git`

### 常见问题

**Q: 遮罩效果不显示？**
A: 检查滚动容器高度是否超出视口，以及 `.visible` 类是否正确添加。

**Q: 深色模式不生效？**
A: 检查系统偏好设置，或使用 DevTools 模拟 `prefers-color-scheme: dark`。

**Q: backdrop-filter 在某些浏览器不生效？**
A: 需要同时设置 `-webkit-backdrop-filter`，并确保元素有背景色。

---

## 作者

sutie
