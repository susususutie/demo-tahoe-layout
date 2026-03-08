/**
 * 侧边栏组件类型定义
 * 支持可插拔的侧边栏架构
 */

import type { ReactNode, JSX } from 'react';

/** 导航项数据 */
export interface NavItem {
  id: string;
  icon: ReactNode;
  label: string;
  badge?: number;
  shortcut?: string;
  disabled?: boolean;
}

/** 导航分组 */
export interface NavSection {
  id: string;
  title?: string;
  items: NavItem[];
  /** 选中时是否高亮显示（深色背景+蓝色文字） */
  highlightOnSelect?: boolean;
}

/** iCloud 同步状态 */
export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';

/** 侧边栏配置 */
export interface SidebarConfig {
  /** 是否默认收起 */
  defaultCollapsed?: boolean;
  /** 是否显示收起按钮 */
  showToggle?: boolean;
  /** 自定义宽度（展开时） */
  width?: number;
  /** 收起后宽度 */
  collapsedWidth?: number;
}

/** 窗口控制按钮回调 */
export interface WindowControlCallbacks {
  /** 关闭按钮回调，不传则默认收起侧边栏 */
  onClose?: () => void;
  /** 最小化按钮回调，不传则默认收起侧边栏 */
  onMinimize?: () => void;
  /** 展开/最大化按钮回调，不传则默认展开侧边栏 */
  onExpand?: () => void;
}

/** 侧边栏 Props */
export interface SidebarProps {
  /** 导航分组数据 */
  sections: NavSection[];
  /** 当前激活项 ID */
  activeId: string;
  /** 选中回调 */
  onSelect: (id: string) => void;
  /** 配置项 */
  config?: SidebarConfig;
  /** 收起状态变化回调 */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** 自定义内容（底部） */
  footer?: ReactNode;
  /** 同步状态（iCloud 风格） */
  syncStatus?: SyncStatus;
  /** 用户信息 */
  user?: {
    name: string;
    avatar?: ReactNode;
  };
  /** 窗口控制按钮回调 */
  windowControls?: WindowControlCallbacks;
}

/** 侧边栏样式变体 */
export type SidebarVariant = 'finder' | 'minimal' | 'modern';

/** 侧边栏组件接口 */
export interface SidebarComponent {
  (props: SidebarProps): JSX.Element;
  /** 组件标识 */
  displayName: string;
  /** 支持的变体 */
  variants?: SidebarVariant[];
}
