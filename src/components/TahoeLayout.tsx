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
  // 移动端侧边栏抽屉状态
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  // 初始化主题 - 优先从 localStorage 读取
  const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    try {
      const stored = localStorage.getItem('tahoe-layout-theme')
      if (stored === 'dark') return 'dark'
      if (stored === 'light') return 'light'
    } catch {
      // 忽略
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getInitialTheme)
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
    // 保存到 localStorage
    try {
      localStorage.setItem('tahoe-layout-theme', nextTheme)
    } catch {
      // 忽略 localStorage 错误
    }
    onThemeChange?.(nextTheme)
  }

  // 移动端抽屉切换
  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen)
  }

  // 移动端关闭抽屉
  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false)
  }

  // 使用自定义导航数据或默认数据
  const navSections = customNavSections ?? getDefaultNavSections()

  // 处理导航选择（移动端自动关闭抽屉）
  const handleNavSelect = (id: string) => {
    setActiveNavId(id)
    onNavSelect?.(id)
    if (window.innerWidth <= 768) {
      closeMobileDrawer()
    }
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
      {/* 移动端抽屉遮罩 */}
      {isMobileDrawerOpen && <div className="tahoe-drawer-overlay" onClick={closeMobileDrawer} />}

      {/* 侧边栏 - 移动端使用抽屉 */}
      <div className={`tahoe-sidebar-wrapper ${isMobileDrawerOpen ? 'open' : ''}`}>
        {renderSidebar()}
      </div>

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
          onMenuClick={toggleMobileDrawer}
        />

        {/* 内容区域 */}
        <div className="tahoe-content">{children}</div>
      </main>
    </div>
  )
}

export default TahoeLayout
