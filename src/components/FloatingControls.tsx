/**
 * 悬浮控制按钮组
 * - 三色窗口控制按钮（始终固定在左上角）
 * - 收起侧边栏按钮（侧边栏展开时显示在右侧）
 */

import React from 'react'
import './FloatingControls.css'

export interface FloatingControlsProps {
  /** 侧边栏是否收起 */
  isCollapsed: boolean
  /** 展开侧边栏回调 */
  onExpand: () => void
  /** 收起侧边栏回调 */
  onCollapse: () => void
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  isCollapsed,
  onExpand,
  onCollapse,
}) => {
  return (
    <div className={`floating-controls ${isCollapsed ? 'collapsed' : ''}`}>
      {/* 三色窗口控制按钮 - 始终显示 */}
      <div className="floating-window-controls">
        <button
          className="floating-btn floating-close-btn"
          onClick={isCollapsed ? onExpand : onCollapse}
          aria-label={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
          title={isCollapsed ? '展开' : '收起'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
        <button className="floating-btn floating-minimize-btn" aria-label="最小化" title="最小化">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button className="floating-btn floating-expand-btn" aria-label="缩放" title="缩放">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* 侧边栏切换按钮 - 始终显示，位置随状态变化 */}
      <button
        className="floating-toggle-btn"
        onClick={isCollapsed ? onExpand : onCollapse}
        aria-label={isCollapsed ? '展开侧边栏' : '隐藏侧边栏'}
        title={isCollapsed ? '展开侧边栏' : '隐藏侧边栏'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="8" y1="5" x2="8" y2="19" />
        </svg>
      </button>
    </div>
  )
}

export default FloatingControls
