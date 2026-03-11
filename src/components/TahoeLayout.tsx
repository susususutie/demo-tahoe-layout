import React, { useState, useRef, useEffect } from 'react'
import { FinderSidebar, ClassicSidebar, getDefaultNavSections } from './sidebar'
import { ContentHeader } from './ContentHeader'
import type { NavSection, SidebarConfig } from './sidebar/types'
import type { BreadcrumbItem } from './Breadcrumb'
import './TahoeLayout.css'

/** 侧边栏变体类型 */
export type SidebarVariant = 'finder' | 'classic'

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * TahoeLayout 组件属性
 */
export interface TahoeLayoutProps {
  children: React.ReactNode
  title?: string
  /** 主题模式：light(亮色) / dark(暗色) / system(跟随系统) */
  theme?: ThemeMode
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
  /** 主题切换回调 */
  onThemeChange?: (theme: ThemeMode) => void
}

export const TahoeLayout: React.FC<TahoeLayoutProps> = ({
  children,
  title = 'Tahoe Layout',
  theme = 'system',
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
  onThemeChange,
}) => {
  const [activeNavId, setActiveNavId] = useState('recent')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    sidebarConfig?.defaultCollapsed ?? false
  )
  // 当前生效的主题（resolve system 后的人工动"
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const mainRef = useRef<HTMLElement>(null)

  // 监听 theme 变化，resolve system 为实际主题
  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setResolvedTheme(isDark ? 'dark' : 'light')
      } else {
        setResolvedTheme(theme)
      }
    }

    updateResolvedTheme()

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        updateResolvedTheme()
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  // 主题切换处理
  const handleThemeToggle = () => {
    const nextTheme: ThemeMode = resolvedTheme === 'light' ? 'dark' : 'light'
    onThemeChange?.(nextTheme)
  }

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
    <div className="tahoe-layout" data-theme={resolvedTheme}>
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
          theme={resolvedTheme}
          onThemeToggle={handleThemeToggle}
        />

        {/* 内容区域 */}
        <div className="tahoe-content">{children}</div>
      </main>
    </div>
  )
}

export default TahoeLayout
