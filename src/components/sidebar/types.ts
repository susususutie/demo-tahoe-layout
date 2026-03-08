/**
 * 侧边栏组件类型定义
 * 支持可插拔的侧边栏架构
 */

import type { ReactNode, JSX } from 'react';

/** 选中文字颜色模式 */
export type ActiveTextColor = 'default' | 'macos' | string;

/** 内置图标名称 - macOS 风格 */
export type BuiltinIconName = 
  // 访达风格图标
  | 'airdrop'      // 隔空投送
  | 'recent'       // 最近使用
  | 'applications' // 应用程序
  | 'image'        // 图片
  | 'desktop'      // 桌面
  | 'documents'    // 文稿
  | 'downloads'    // 下载
  | 'icloud'       // iCloud
  | 'share'        // 共享
  | 'mac'          // Mac
  | 'network'      // 网络
  | 'trash'        // 废纸篓
  | 'wifi'         // 无线
  | 'folder'       // 文件夹
  | 'home'         // 主页
  // 系统设置风格图标
  | 'settings'     // 通用/设置
  | 'menu'         // 菜单栏
  | 'accessibility'// 辅助功能
  | 'target'       // 聚焦
  | 'wallpaper'    // 墙纸
  | 'appearance'   // 外观
  | 'display';     // 显示器

/** 导航项数据 */
export interface NavItem {
  id: string;
  label: string;
  badge?: number;
  shortcut?: string;
  disabled?: boolean;
  /** 
   * 选中时的文字颜色
   * - 'default': 不改变（保持默认黑色/白色）
   * - 'macos': 使用 macOS 默认蓝色 (#007aff)
   * - string: 自定义颜色值（如 '#ff3b30'）
   */
  activeColor?: ActiveTextColor;
  /** 
   * 图标类型
   * - 'svg' | undefined: 使用 SVG 线条图标（根据 iconName 渲染，可随文字变色）
   * - 'image': 使用图片图标（从 URL 加载，如 macosicons.com 下载的图标）
   * - 'roundedRect': 固定颜色的圆角矩形图标（不受选中影响）
   * - 'circle': 固定颜色的圆形图标（不受选中影响，标签用）
   * - 'coloredRect': 彩色圆角矩形背景 + 白色图标（macOS 系统设置风格）
   */
  iconType?: 'svg' | 'image' | 'roundedRect' | 'circle' | 'coloredRect';
  /** 
   * 内置图标名称（当 iconType 为 'svg' 或 undefined 时使用）
   * 如 'airdrop', 'recent', 'documents' 等
   */
  iconName?: BuiltinIconName;
  /** 
   * 图片图标 URL（当 iconType 为 'image' 时使用）
   * 可以是 macosicons.com 下载的图标，或其他图片链接
   */
  iconSrc?: string;
  /** 
   * 图标尺寸（当 iconType 为 'image' 时使用，默认 20px）
   */
  iconSize?: number;
  /** 
   * 圆角矩形图标颜色（当 iconType 为 'roundedRect' 或 'circle' 或 'coloredRect' 时使用）
   * 如 '#ff3b30' 表示红色圆角矩形
   */
  iconColor?: string;
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
