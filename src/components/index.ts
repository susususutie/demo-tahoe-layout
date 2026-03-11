/**
 * Tahoe Layout 组件库导出
 *
 * 使用示例:
 * ```tsx
 * import { TahoeLayout, Breadcrumb, FloatingControls } from './components';
 *
 * <TahoeLayout title="My App">
 *   <YourContent />
 * </TahoeLayout>
 * ```
 */

// 主布局组件
export { TahoeLayout } from './TahoeLayout'
export type { TahoeLayoutProps, SidebarVariant } from './TahoeLayout'

// 内容区头部组件
export { ContentHeader } from './ContentHeader'
export type { ContentHeaderProps } from './ContentHeader'

// 工具栏组件
export { Toolbar } from './Toolbar'
export type { ToolbarProps } from './Toolbar'

// 面包屑组件
export { Breadcrumb } from './Breadcrumb'
export type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb'

// 悬浮控制按钮
export { FloatingControls } from './FloatingControls'
export type { FloatingControlsProps } from './FloatingControls'

// 侧边栏相关组件（统一从 sidebar 子模块导出）
export { FinderSidebar, ClassicSidebar, getDefaultNavSections } from './sidebar'

// 侧边栏类型
export type {
  NavItem,
  NavSection,
  SidebarConfig,
  ActiveTextColor,
  BuiltinIconName,
  SyncStatus,
  WindowControlCallbacks,
  SidebarProps,
  SidebarComponent,
} from './sidebar/types'
