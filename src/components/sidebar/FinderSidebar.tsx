/**
 * Finder 风格侧边栏组件
 * - 分组标题（收藏/位置/标签）
 * - 圆角选中背景
 * - iCloud 同步状态
 * - 可收起/展开
 */

import React, { useState, useRef, useEffect } from 'react';
import type { SidebarProps, NavItem, NavSection, SyncStatus } from './types';
import './FinderSidebar.css';

/** iCloud 同步状态图标 */
const SyncStatusIcon: React.FC<{ status: SyncStatus }> = ({ status }) => {
  const icons: Record<SyncStatus, string> = {
    synced: '☁️',
    syncing: '🔄',
    offline: '⚠️',
    error: '❌',
  };

  const titles: Record<SyncStatus, string> = {
    synced: '已同步到 iCloud',
    syncing: '正在同步...',
    offline: '离线',
    error: '同步错误',
  };

  return (
    <span className="finder-sync-icon" title={titles[status]}>
      {icons[status]}
    </span>
  );
};

/** 单个导航项 */
const NavItemComponent: React.FC<{
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}> = ({ item, isActive, isCollapsed, onClick }) => {
  return (
    <button
      className={`finder-nav-item ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={item.disabled}
      title={isCollapsed ? item.label : undefined}
    >
      <span className="finder-nav-icon">{item.icon}</span>
      {!isCollapsed && (
        <>
          <span className="finder-nav-label">{item.label}</span>
          {item.badge !== undefined && item.badge > 0 && (
            <span className="finder-nav-badge">{item.badge}</span>
          )}
        </>
      )}
    </button>
  );
};

/** 导航分组 */
const NavSectionComponent: React.FC<{
  section: NavSection;
  activeId: string;
  isCollapsed: boolean;
  onSelect: (id: string) => void;
}> = ({ section, activeId, isCollapsed, onSelect }) => {
  if (isCollapsed) {
    // 收起状态只显示图标，不显示分组标题
    return (
      <div className="finder-section">
        {section.items.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            isCollapsed={true}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="finder-section">
      {section.title && (
        <h3 className="finder-section-title">{section.title}</h3>
      )}
      <div className="finder-section-items">
        {section.items.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            isCollapsed={false}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

/** Finder 风格侧边栏 */
export const FinderSidebar: React.FC<SidebarProps> = ({
  sections,
  activeId,
  onSelect,
  config = {},
  onCollapsedChange,
  footer,
  syncStatus,
  user,
}) => {
  const {
    defaultCollapsed = false,
    showToggle = true,
  } = config;

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // 监听滚动
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const handleScroll = () => {
      setIsScrolled(navEl.scrollTop > 0);
    };

    navEl.addEventListener('scroll', handleScroll);
    return () => navEl.removeEventListener('scroll', handleScroll);
  }, []);

  // 通知父组件收起状态变化
  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`finder-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* 顶部遮罩 */}
      <div className={`finder-vignette top ${isScrolled ? 'visible' : ''}`} />

      {/* 头部 */}
      <div className="finder-sidebar-header">
        {!isCollapsed && user && (
          <>
            <div className="finder-avatar">
              {user.avatar || user.name.charAt(0).toUpperCase()}
            </div>
            <span className="finder-username">{user.name}</span>
            {syncStatus && <SyncStatusIcon status={syncStatus} />}
          </>
        )}

        {/* 收起/展开按钮 */}
        {showToggle && (
          <button
            className="finder-toggle-btn"
            onClick={handleToggle}
            aria-label={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
          >
            <svg
              className={`finder-toggle-icon ${isCollapsed ? 'collapsed' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
      </div>

      {/* 导航区域 */}
      <nav className="finder-nav" ref={navRef}>
        {sections.map((section) => (
          <NavSectionComponent
            key={section.id}
            section={section}
            activeId={activeId}
            isCollapsed={isCollapsed}
            onSelect={onSelect}
          />
        ))}
        {footer && !isCollapsed && (
          <div className="finder-footer">{footer}</div>
        )}
      </nav>

      {/* 底部遮罩 */}
      <div className="finder-vignette bottom" />

      {/* 收起状态下的悬浮展开按钮 */}
      {isCollapsed && showToggle && (
        <button
          className="finder-floating-toggle"
          onClick={handleToggle}
          aria-label="展开侧边栏"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </aside>
  );
};

FinderSidebar.displayName = 'FinderSidebar';

export default FinderSidebar;
