/**
 * 悬浮控制按钮组
 * - 三色窗口控制按钮（始终固定在左上角）
 * - 展开侧边栏按钮（侧边栏收起时显示）
 */

import React from 'react';
import './FloatingControls.css';

interface FloatingControlsProps {
  /** 侧边栏是否收起 */
  isCollapsed: boolean;
  /** 展开侧边栏回调 */
  onExpand: () => void;
  /** 隐藏侧边栏回调 */
  onCollapse: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  isCollapsed,
  onExpand,
  onCollapse,
}) => {
  return (
    <div className="floating-controls">
      {/* 三色窗口控制按钮 - 始终显示 */}
      <div className="floating-window-controls">
        <button
          className="floating-btn floating-close-btn"
          onClick={onExpand}
          aria-label="展开侧边栏"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
        <button
          className="floating-btn floating-minimize-btn"
          onClick={onExpand}
          aria-label="展开侧边栏"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          className="floating-btn floating-expand-btn"
          onClick={onExpand}
          aria-label="展开侧边栏"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* 隐藏侧边栏按钮 - 仅展开时显示 */}
      <button
        className={`floating-hide-btn ${!isCollapsed ? 'visible' : ''}`}
        onClick={onCollapse}
        aria-label="隐藏侧边栏"
        title="隐藏侧边栏"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="8" y1="5" x2="8" y2="19" />
        </svg>
      </button>

      {/* 展开侧边栏按钮 - 仅收起时显示 */}
      <button
        className={`floating-sidebar-btn ${isCollapsed ? 'visible' : ''}`}
        onClick={onExpand}
        aria-label="展开侧边栏"
        title="展开侧边栏"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="8" y1="5" x2="8" y2="19" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingControls;
