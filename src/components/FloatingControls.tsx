/**
 * 悬浮控制按钮组
 * - 三色窗口控制按钮（始终固定在左上角）
 */

import React from 'react';
import './FloatingControls.css';

interface FloatingControlsProps {
  /** 展开侧边栏回调 */
  onExpand: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onExpand,
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
    </div>
  );
};

export default FloatingControls;
