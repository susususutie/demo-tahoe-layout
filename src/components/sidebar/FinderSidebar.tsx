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

// Lucide Icons - macOS 风格图标库
import {
  Clock,
  FolderOpen,
  LayoutGrid,
  Image,
  Download,
  Monitor,
  FileText,
  Cloud,
  Home,
  Share2,
  Globe,
  Trash2,
  Wifi,
  Folder,
  Settings,
  Menu,
  Accessibility,
  Target,
  Eye,
  type LucideProps,
} from 'lucide-react';

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

/** Lucide 图标映射 - macOS 风格 */
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  // 访达风格图标
  airdrop: Share2,      // 隔空投送
  recent: Clock,        // 最近使用
  applications: LayoutGrid, // 应用程序
  image: Image,         // 图片
  downloads: Download,  // 下载
  desktop: Monitor,     // 桌面
  documents: FileText,  // 文稿
  icloud: Cloud,        // iCloud
  share: FolderOpen,    // 共享
  mac: Home,            // Mac/位置
  network: Globe,       // 网络
  trash: Trash2,        // 废纸篓
  wifi: Wifi,           // 无线
  folder: Folder,       // 文件夹
  home: Home,           // 主页
  // 系统设置风格图标
  settings: Settings,   // 通用/设置
  menu: Menu,           // 菜单栏
  accessibility: Accessibility, // 辅助功能
  target: Target,       // 聚焦
  wallpaper: Cloud,     // 墙纸（用云朵代替）
  appearance: Eye,      // 外观
  display: Monitor,     // 显示器
};

/** 内置图标组件 - 使用 Lucide Icons */
const BuiltinIcon: React.FC<{ name: string; color?: string }> = ({ name, color }) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) return null;
  
  return <IconComponent size={18} color={color} strokeWidth={1.5} />;
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

  // 判断图标类型
  const useRoundedRect = item.iconType === 'roundedRect' && item.iconColor;
  const useCircle = item.iconType === 'circle' && item.iconColor;
  const useColoredRect = item.iconType === 'coloredRect' && item.iconColor && item.iconName;
  const useImage = item.iconType === 'image' && item.iconSrc;
  const useFixedColor = useRoundedRect || useCircle;

  // 计算图标颜色
  const iconColor = (() => {
    // 固定颜色图标（圆角矩形/圆形）- 使用固定颜色
    if (useFixedColor) {
      return item.iconColor;
    }
    // SVG 图标 - 跟随文字颜色（选中时变色）
    if (isActive && activeTextColor) {
      return activeTextColor;
    }
    return undefined;
  })();

  // 渲染图标内容
  const renderIcon = () => {
    // 图片图标（从 URL 加载，如 macosicons.com）
    if (useImage) {
      const size = item.iconSize || 20;
      return (
        <img 
          src={item.iconSrc} 
          alt={item.label}
          style={{ width: size, height: size, objectFit: 'contain' }}
        />
      );
    }
    // 固定颜色纯色块（圆角矩形/圆形）- 由 CSS 绘制
    if (useFixedColor) {
      return null;
    }
    // 彩色背景 + 白色图标
    if (useColoredRect) {
      return <BuiltinIcon name={item.iconName!} color="white" />;
    }
    // SVG 线条图标 - 可随文字变色
    if (item.iconName) {
      return <BuiltinIcon name={item.iconName} color={iconColor} />;
    }
    return null;
  };

  // 构建图标容器样式和类名
  const iconContainerStyle = (() => {
    if (useColoredRect) {
      return { backgroundColor: item.iconColor };
    }
    if (useFixedColor) {
      return { color: item.iconColor };
    }
    return undefined;
  })();
  
  const iconClassName = [
    'finder-nav-icon',
    useRoundedRect ? 'finder-rounded-rect' : '',
    useCircle ? 'finder-circle' : '',
    useColoredRect ? 'finder-colored-rect' : '',
    useImage ? 'finder-image-icon' : '',
  ].filter(Boolean).join(' ');

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
        className={iconClassName}
        style={iconContainerStyle}
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
