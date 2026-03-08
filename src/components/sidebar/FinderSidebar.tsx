/**
 * Finder 风格侧边栏组件
 * - 分组标题（收藏/位置/标签）
 * - 圆角选中背景
 * - iCloud 同步状态
 * - 可收起/展开
 */

import React, { useState, useRef, useEffect, type JSX } from 'react';
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

/** 内置图标组件 - macOS 风格 SVG 图标 */
const BuiltinIcon: React.FC<{ name: string; color?: string }> = ({ name, color }) => {
  const iconColor = color || 'currentColor';
  
  const icons: Record<string, JSX.Element> = {
    airdrop: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 6v2M12 16v2M6 12h2M16 12h2M7.05 7.05l1.41 1.41M15.54 15.54l1.41 1.41M7.05 16.95l1.41-1.41M15.54 8.46l1.41-1.41" />
      </svg>
    ),
    recent: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    applications: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2z" />
        <path d="M12 12l-9-4.5M12 12l9-4.5M12 12v10" />
      </svg>
    ),
    desktop: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
    documents: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
    downloads: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    icloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      </svg>
    ),
    share: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    mac: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    network: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <path d="M12 8v3M5 16v3M19 16v3M7.5 13.5l5 3M16.5 13.5l-5 3" />
      </svg>
    ),
    folder: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  };

  return icons[name] || null;
};

/** 单个导航项 */
const NavItemComponent: React.FC<{
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  highlightOnSelect?: boolean;
}> = ({ item, isActive, isCollapsed, onClick, highlightOnSelect }) => {
  // 计算选中时的文字颜色
  const activeTextColor = (() => {
    if (!isActive || !item.activeColor) return undefined;
    if (item.activeColor === 'default') return undefined;
    if (item.activeColor === 'macos') return '#007aff';
    return item.activeColor;
  })();

  // 计算文字样式
  const textStyle = activeTextColor
    ? { color: activeTextColor }
    : undefined;

  // 计算图标颜色
  const iconColor = (() => {
    // 固定图标颜色模式
    if (item.iconType === 'fixed' && item.iconColor) {
      return item.iconColor;
    }
    // 跟随文字颜色模式（选中时与文字同色）
    if (isActive && activeTextColor) {
      return activeTextColor;
    }
    return undefined;
  })();

  // 构建图标样式
  const iconStyle = iconColor
    ? { color: iconColor }
    : undefined;

  // 是否使用 CSS 绘制的固定颜色圆点
  const useFixedColorDot = item.iconType === 'fixed' && item.iconColor;

  // 渲染图标内容
  const renderIcon = () => {
    if (useFixedColorDot) {
      return null; // CSS 圆点由样式绘制
    }
    // 使用内置 SVG 图标
    if (item.iconName) {
      return <BuiltinIcon name={item.iconName} color={iconColor} />;
    }
    return null;
  };

  return (
    <button
      className={`finder-nav-item ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''} ${highlightOnSelect ? 'highlight' : ''}`}
      onClick={onClick}
      disabled={item.disabled}
      title={isCollapsed ? item.label : undefined}
      style={textStyle}
      data-icon-type={item.iconType}
      data-icon-color={item.iconColor}
    >
      <span 
        className={`finder-nav-icon ${useFixedColorDot ? 'finder-color-dot' : ''}`} 
        style={iconStyle}
      >
        {renderIcon()}
      </span>
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

/** 导航分组 - 支持展开/收起 */
const NavSectionComponent: React.FC<{
  section: NavSection;
  activeId: string;
  isCollapsed: boolean;
  onSelect: (id: string) => void;
}> = ({ section, activeId, isCollapsed, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);

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
            highlightOnSelect={section.highlightOnSelect}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`finder-section ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {section.title && (
        <div className="finder-section-header">
          <h3 className="finder-section-title">{section.title}</h3>
          <button
            className="finder-section-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? '收起分组' : '展开分组'}
            title={isExpanded ? '收起' : '展开'}
          >
            <svg
              className={isExpanded ? 'expanded' : ''}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
      <div className="finder-section-items">
        {section.items.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            isCollapsed={false}
            onClick={() => onSelect(item.id)}
            highlightOnSelect={section.highlightOnSelect}
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
  windowControls,
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

  // 窗口控制按钮处理
  const handleClose = () => {
    if (windowControls?.onClose) {
      windowControls.onClose();
    } else {
      handleToggle();
    }
  };

  const handleMinimize = () => {
    if (windowControls?.onMinimize) {
      windowControls.onMinimize();
    } else {
      handleToggle();
    }
  };

  const handleExpand = () => {
    if (windowControls?.onExpand) {
      windowControls.onExpand();
    } else {
      handleToggle();
    }
  };

  return (
    <aside className={`finder-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* 顶部遮罩 */}
      <div className={`finder-vignette top ${isScrolled ? 'visible' : ''}`} />

      {/* 头部区域：左侧三色按钮，右侧操作按钮 */}
      <div className="finder-sidebar-header">
        {/* 左侧：macOS 风格窗口控制按钮 */}
        <div className="finder-window-controls">
          <button
            className="finder-window-btn finder-close-btn"
            onClick={handleClose}
            aria-label="关闭"
            title="关闭"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
          <button
            className="finder-window-btn finder-minimize-btn"
            onClick={handleMinimize}
            aria-label="最小化"
            title="最小化"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button
            className="finder-window-btn finder-expand-btn"
            onClick={handleExpand}
            aria-label="展开"
            title="展开"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        {/* 右侧：用户信息和操作按钮 */}
        {!isCollapsed && (
          <div className="finder-header-right">
            {user && (
              <>
                {syncStatus && <SyncStatusIcon status={syncStatus} />}
                <span className="finder-username">{user.name}</span>
                <div className="finder-avatar">
                  {user.avatar || user.name.charAt(0).toUpperCase()}
                </div>
              </>
            )}
            {/* 右侧收起按钮 */}
            <button
              className="finder-collapse-btn"
              onClick={handleToggle}
              aria-label="收起侧边栏"
              title="收起侧边栏"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>
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
