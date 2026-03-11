import React from 'react'

/**
 * 工具栏按钮配置
 */
interface ToolbarButton {
  id: string
  title: string
  icon: React.ReactNode
  variant?: 'default' | 'primary'
  label?: string
}

/**
 * 网格视图图标
 */
const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
)

/**
 * 列表视图图标
 */
const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

/**
 * 分享图标
 */
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
)

/**
 * 标签图标
 */
const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

/**
 * 搜索图标
 */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

/**
 * 更多选项图标
 */
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
)

/**
 * 亮色模式图标（太阳）
 */
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

/**
 * 暗色模式图标（月亮）
 */
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

/**
 * 默认工具栏按钮配置
 */
const defaultToolbarButtons: ToolbarButton[] = [
  { id: 'grid', title: '图标视图', icon: <GridIcon /> },
  { id: 'list', title: '列表视图', icon: <ListIcon /> },
  { id: 'share', title: '分享', icon: <ShareIcon /> },
  { id: 'tag', title: '标签', icon: <TagIcon /> },
]

/**
 * Toolbar 组件属性
 */
export interface ToolbarProps {
  /** 自定义按钮配置 */
  buttons?: ToolbarButton[]
  /** 点击按钮回调 */
  onButtonClick?: (id: string) => void
  /** 是否显示新建按钮 */
  showNewButton?: boolean
  /** 新建按钮文字 */
  newButtonLabel?: string
  /** 点击新建按钮回调 */
  onNewClick?: () => void
  /** 是否显示搜索按钮 */
  showSearch?: boolean
  /** 点击搜索回调 */
  onSearchClick?: () => void
  /** 是否显示更多按钮 */
  showMore?: boolean
  /** 点击更多回调 */
  onMoreClick?: () => void
  /** 是否显示主题切换按钮 */
  showThemeToggle?: boolean
  /** 当前主题 */
  theme?: 'light' | 'dark'
  /** 主题切换回调 */
  onThemeToggle?: () => void
}

/**
 * Toolbar 组件
 * 内容区工具栏，提供视图切换、分享、搜索等功能
 */
export const Toolbar: React.FC<ToolbarProps> = ({
  buttons = defaultToolbarButtons,
  onButtonClick,
  showNewButton = true,
  newButtonLabel = '+ 新建',
  onNewClick,
  showSearch = true,
  onSearchClick,
  showMore = true,
  onMoreClick,
  showThemeToggle = true,
  theme = 'light',
  onThemeToggle,
}) => {
  return (
    <div className="tahoe-toolbar">
      {buttons.map((button) => (
        <button
          key={button.id}
          className="tahoe-tool-btn"
          title={button.title}
          onClick={() => onButtonClick?.(button.id)}
        >
          {button.icon}
        </button>
      ))}

      <div className="tahoe-toolbar-divider" />

      {showThemeToggle && (
        <button
          className="tahoe-tool-btn tahoe-theme-toggle"
          title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
          onClick={onThemeToggle}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      )}

      {showNewButton && (
        <button className="tahoe-tool-btn tahoe-tool-btn-primary" title="新建" onClick={onNewClick}>
          <span>{newButtonLabel}</span>
        </button>
      )}

      {showSearch && (
        <button className="tahoe-tool-btn" title="搜索" onClick={onSearchClick}>
          <SearchIcon />
        </button>
      )}

      {showMore && (
        <button className="tahoe-tool-btn" title="更多" onClick={onMoreClick}>
          <MoreIcon />
        </button>
      )}
    </div>
  )
}

export default Toolbar
