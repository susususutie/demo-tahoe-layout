import React, { useState, useRef } from 'react'
import { FinderSidebar, ClassicSidebar, getDefaultNavSections } from './sidebar'
import { ContentHeader } from './ContentHeader'
import type { NavSection, SidebarConfig } from './sidebar/types'
import type { BreadcrumbItem } from './Breadcrumb'
import './TahoeLayout.css'

/** 侧边栏变体类型 */
export type SidebarVariant = 'finder' | 'classic'

/**
 * TahoeLayout 组件属性
 */
export interface TahoeLayoutProps {
  children: React.ReactNode
  title?: string
  /** 侧边栏变体 */
  sidebarVariant?: SidebarVariant
  /** 自定义侧边栏配置 */
  sidebarConfig?: SidebarConfig
  /** 自定义导航数据 */
  navSections?: NavSection[]
  /** 面包屑路径 */
  breadcrumbs?: BreadcrumbItem[]
  /** 面包屑点击回调 */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void
  /** 导航选中回调 */
  onNavSelect?: (id: string) => void
  /** 工具栏按钮点击回调 */
  onToolbarButtonClick?: (id: string) => void
  /** 点击新建按钮回调 */
  onNewClick?: () => void
  /** 点击搜索回调 */
  onSearchClick?: () => void
  /** 点击更多回调 */
  onMoreClick?: () => void
}

export const TahoeLayout: React.FC<TahoeLayoutProps> = ({
  children,
  title = 'Tahoe Layout',
  sidebarVariant = 'finder',
  sidebarConfig,
  navSections: customNavSections,
  breadcrumbs,
  onBreadcrumbClick,
  onNavSelect,
  onToolbarButtonClick,
  onNewClick,
  onSearchClick,
  onMoreClick,
}) => {
  const [activeNavId, setActiveNavId] = useState('recent')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    sidebarConfig?.defaultCollapsed ?? false
  )
  const mainRef = useRef<HTMLElement>(null)

  // 使用自定义导航数据或默认数据
  const navSections = customNavSections ?? getDefaultNavSections()

  // 处理导航选择
  const handleNavSelect = (id: string) => {
    setActiveNavId(id)
    onNavSelect?.(id)
  }

  // 渲染侧边栏
  const renderSidebar = () => {
    switch (sidebarVariant) {
      case 'finder':
        return (
          <FinderSidebar
            sections={navSections}
            activeId={activeNavId}
            onSelect={handleNavSelect}
            config={sidebarConfig}
            collapsed={isSidebarCollapsed}
            onCollapsedChange={setIsSidebarCollapsed}
          />
        )
      case 'classic':
        return (
          <ClassicSidebar
            sections={navSections}
            activeId={activeNavId}
            collapsed={isSidebarCollapsed}
            onSelect={handleNavSelect}
            onCollapsedChange={setIsSidebarCollapsed}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="tahoe-layout">
      {/* 侧边栏 */}
      {renderSidebar()}

      {/* 主内容区 */}
      <main className="tahoe-main" ref={mainRef}>
        {/* 内容头部 */}
        <ContentHeader
          title={title}
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={onBreadcrumbClick}
          onToolbarButtonClick={onToolbarButtonClick}
          onNewClick={onNewClick}
          onSearchClick={onSearchClick}
          onMoreClick={onMoreClick}
        />

        {/* 内容区域 */}
        <div className="tahoe-content">{children}</div>
      </main>
    </div>
  )
}

export default TahoeLayout
