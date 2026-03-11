import React from 'react'
import { Breadcrumb } from './Breadcrumb'
import { Toolbar } from './Toolbar'
import type { BreadcrumbItem } from './Breadcrumb'

/**
 * ContentHeader 组件属性
 */
export interface ContentHeaderProps {
  /** 页面标题（无面包屑时显示） */
  title?: string
  /** 面包屑路径 */
  breadcrumbs?: BreadcrumbItem[]
  /** 面包屑点击回调 */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void
  /** 工具栏按钮点击回调 */
  onToolbarButtonClick?: (id: string) => void
  /** 点击新建按钮回调 */
  onNewClick?: () => void
  /** 点击搜索回调 */
  onSearchClick?: () => void
  /** 点击更多回调 */
  onMoreClick?: () => void
  /** 当前主题 */
  theme?: 'light' | 'dark'
  /** 主题切换回调 */
  onThemeToggle?: () => void
  /** 汉堡菜单点击回调（移动端） */
  onMenuClick?: () => void
}

/**
 * ContentHeader 组件
 * 内容区头部，包含面包屑/标题和工具栏
 */
export const ContentHeader: React.FC<ContentHeaderProps> = ({
  title = 'Tahoe Layout',
  breadcrumbs,
  onBreadcrumbClick,
  onToolbarButtonClick,
  onNewClick,
  onSearchClick,
  onMoreClick,
  theme = 'light',
  onThemeToggle,
  onMenuClick,
}) => {
  return (
    <header className="tahoe-content-header">
      <div className="tahoe-header-left">
        {/* 移动端汉堡菜单按钮 */}
        <button className="tahoe-menu-btn" onClick={onMenuClick} aria-label="打开菜单">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* 面包屑导航 */}
        {breadcrumbs ? (
          <Breadcrumb items={breadcrumbs} onItemClick={onBreadcrumbClick} />
        ) : (
          <h1 className="tahoe-title">{title}</h1>
        )}
      </div>

      {/* 工具栏 */}
      <Toolbar
        onButtonClick={onToolbarButtonClick}
        onNewClick={onNewClick}
        onSearchClick={onSearchClick}
        onMoreClick={onMoreClick}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
    </header>
  )
}

export default ContentHeader
