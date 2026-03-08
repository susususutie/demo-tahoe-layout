# AI 工作指南

> 本文档供 AI 助手阅读，了解项目规范后继续开发工作

## 项目概述

macOS Tahoe 风格布局组件，基于 Vite + React 19 + TypeScript，带有磨砂玻璃效果和滚动透明遮罩。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.0 | 用户界面库 |
| TypeScript | ~5.9.3 | 类型系统 |
| Vite | ^7.3.1 | 构建工具 |
| ESLint | ^9.39.1 | 代码规范 |
| pnpm | latest | 包管理器 |

## 项目文件结构

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
├── eslint.config.js           # ESLint 配置（Flat Config）
├── tsconfig.json              # TypeScript 配置（项目引用）
├── tsconfig.app.json          # 应用 TS 配置
├── tsconfig.node.json         # Node TS 配置
├── README.md                  # 项目文档
└── AGENTS.md                  # 本文档
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
- `sidebarContent: React.ReactNode` - 侧边栏内容（预留）
- `title?: string` - 页面标题，默认 "Tahoe Layout"

**State:**
- `sidebarScrolled: boolean` - 侧边栏是否滚动
- `contentScrolled: boolean` - 内容区是否滚动
- `activeItem: string` - 当前激活的导航项

**实现原理:**
- 使用 `useRef` 获取滚动容器引用
- 监听 `scroll` 事件，根据 `scrollTop > 0` 控制遮罩显示
- 通过添加/移除 `.visible` 类实现遮罩渐变动画
- 导航项通过 `navItems` 数组配置

### CSS 变量定义 (`src/components/TahoeLayout.css`)

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `--tahoe-sidebar-width` | 240px | 侧边栏宽度 |
| `--tahoe-header-height` | 52px | 头部高度 |
| `--tahoe-vignette-size` | 60px | 遮罩渐变高度 |
| `--tahoe-blur` | blur(20px) saturate(180%) | 磨砂玻璃效果 |
| `--tahoe-accent` | #007aff | 强调色（Apple 蓝）|
| `--tahoe-radius` | 12px | 大圆角 |
| `--tahoe-radius-sm` | 8px | 小圆角 |

### 颜色系统

**浅色模式:**
- 背景: `rgba(255, 255, 255, 0.72)` 侧边栏, `rgba(255, 255, 255, 0.64)` 内容区
- 主文字: `rgba(0, 0, 0, 0.85)`
- 次文字: `rgba(0, 0, 0, 0.5)`
- 边框: `rgba(0, 0, 0, 0.08)`

**深色模式:**
- 背景: `rgba(30, 30, 30, 0.72)` 侧边栏, `rgba(28, 28, 28, 0.64)` 内容区
- 主文字: `rgba(255, 255, 255, 0.9)`
- 次文字: `rgba(255, 255, 255, 0.55)`
- 边框: `rgba(255, 255, 255, 0.08)`

**自动切换:** 使用 `@media (prefers-color-scheme: dark)` 自动适配系统主题

## 开发规则

### 1. 代码校验

修改后必须执行：

```bash
pnpm build        # 确保 TypeScript 编译通过
pnpm lint         # 检查 ESLint 规范
```

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

- 所有类名以 `tahoe-` 开头
- 使用 BEM 命名法：`tahoe-block__element--modifier`
- CSS 变量定义在 `:root` 中
- 深色模式使用 `@media (prefers-color-scheme: dark)`

### 5. ESLint 配置

项目使用 ESLint Flat Config 格式 (`eslint.config.js`)：
- `@eslint/js` - 基础 JS 规则
- `typescript-eslint` - TypeScript 规则
- `eslint-plugin-react-hooks` - React Hooks 规则
- `eslint-plugin-react-refresh` - React Refresh 规则

## 核心特性

### 磨砂玻璃效果

```css
.tahoe-sidebar {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}
```

### 滚动遮罩 (Vignette)

当区域滚动时显示渐变遮罩，创造优雅过渡效果：

```css
.tahoe-content-vignette.top {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tahoe-content-vignette.top.visible {
  opacity: 1;
}
```

### 响应式设计

侧边栏在移动端 (`max-width: 768px`) 默认隐藏，可通过添加 `.open` 类显示：

```css
@media (max-width: 768px) {
  .tahoe-sidebar {
    transform: translateX(-100%);
  }
  .tahoe-sidebar.open {
    transform: translateX(0);
  }
}
```

## 扩展开发建议

### 添加新功能的标准流程

1. **分析需求** - 理解功能目标
2. **拆解任务** - 拆分为可执行的子任务
3. **更新 todo** - 记录任务列表
4. **编写代码** - 实现功能
5. **本地测试** - 验证功能正常
6. **构建校验** - 运行 `pnpm build && pnpm lint`
7. **提交代码** - 按规范提交
8. **更新状态** - 标记任务完成

### 常见扩展方向

1. **响应式增强**
   - 移动端侧边栏抽屉
   - 汉堡菜单按钮
   - 触摸手势支持
   - 断点适配

2. **主题系统**
   - 自定义主色调
   - 透明度调节滑块
   - 用户主题持久化（localStorage）
   - 手动主题切换开关

3. **动画优化**
   - Framer Motion 集成
   - 页面过渡动画
   - 微交互效果
   - 导航项切换动画

4. **无障碍支持**
   - 键盘导航（Tab/Arrow keys）
   - ARIA 属性
   - 屏幕阅读器适配
   - 焦点管理

5. **性能优化**
   - 虚拟滚动（长列表）
   - CSS containment
   - 懒加载图片
   - will-change 优化

6. **功能扩展**
   - 可折叠侧边栏
   - 多级导航菜单
   - 面包屑导航
   - 搜索功能

## 常见问题 (FAQ)

**Q: 遮罩效果不显示？**
A: 检查：
1. 滚动容器高度是否超出视口
2. `.visible` 类是否正确添加
3. CSS 渐变背景是否正确设置

**Q: 深色模式不生效？**
A: 检查：
1. 系统偏好设置是否为深色模式
2. 浏览器 DevTools 模拟 `prefers-color-scheme: dark`
3. CSS 媒体查询语法是否正确

**Q: backdrop-filter 在某些浏览器不生效？**
A: 确保：
1. 同时设置 `-webkit-backdrop-filter`
2. 元素有背景色（非透明）
3. 浏览器版本支持（Chrome 76+, Safari 9+, Firefox 103+）

**Q: 如何添加新的导航项？**
A: 修改 `TahoeLayout.tsx` 中的 `navItems` 数组：

```tsx
const navItems = [
  { icon: '🏠', label: 'Dashboard' },
  { icon: '📄', label: 'Documents' },
  // 添加新项
  { icon: '🔔', label: 'Notifications' },
];
```

**Q: 如何修改主题色？**
A: 修改 CSS 变量：

```css
:root {
  --tahoe-accent: #007aff;  /* 改为你的颜色 */
}
```

## 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 76+ |
| Safari | 9+ |
| Firefox | 103+ |
| Edge | 79+ |

> 注意：磨砂玻璃效果需要支持 `backdrop-filter` 的现代浏览器

## 参考资源

- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [backdrop-filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [CSS 自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)

---

*最后更新: 2026-03-08*