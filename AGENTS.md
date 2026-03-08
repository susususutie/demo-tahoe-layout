# AI 工作指南

> 本文档供 AI 助手阅读，了解项目规范后继续开发工作

## 项目概述

macOS Tahoe 风格布局组件，基于 Vite + React + TypeScript，带有磨砂玻璃效果和滚动透明遮罩。

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
├── README.md                  # 项目文档
└── AGENTS.md                  # 本文档
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
- 使用 `useRef` 获取滚动容器
- 监听 `scroll` 事件，根据 `scrollTop > 0` 控制遮罩显示
- 通过添加/移除 `.visible` 类实现遮罩渐变动画

### CSS 变量定义 (`src/components/TahoeLayout.css`)

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `--tahoe-sidebar-width` | 240px | 侧边栏宽度 |
| `--tahoe-header-height` | 52px | 头部高度 |
| `--tahoe-vignette-size` | 60px | 遮罩渐变高度 |
| `--tahoe-blur` | blur(20px) saturate(180%) | 磨砂玻璃效果 |
| `--tahoe-accent` | #007aff | 强调色（Apple 蓝）|

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

复杂任务必须拆解，使用 todo 工具记录：

```
待办事项 ID | 任务描述 | 状态 | 优先级
```

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

### 5. 颜色系统

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

## 扩展开发建议

### 添加新功能的标准流程

1. **分析需求** - 理解功能目标
2. **拆解任务** - 拆分为可执行的子任务
3. **更新 todo** - 记录任务列表
4. **编写代码** - 实现功能
5. **本地测试** - 验证功能正常
6. **构建校验** - 运行 `pnpm build`
7. **提交代码** - 按规范提交
8. **更新状态** - 标记任务完成
9. **重复执行** - 处理下一个任务

### 常见扩展方向

1. **响应式增强**
   - 移动端侧边栏抽屉
   - 触摸手势支持
   - 断点适配

2. **主题系统**
   - 自定义主色调
   - 透明度调节
   - 用户主题持久化

3. **动画优化**
   - Framer Motion 集成
   - 页面过渡动画
   - 微交互效果

4. **无障碍支持**
   - 键盘导航
   - ARIA 属性
   - 屏幕阅读器适配

5. **性能优化**
   - 虚拟滚动
   - CSS containment
   - 懒加载

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

## 参考资源

- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
- [backdrop-filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [CSS 自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

*最后更新: 2026-03-08*
