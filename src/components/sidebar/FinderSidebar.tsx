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

/** macOS 应用图标组件 - Big Sur 风格 */
const AppIconSiri: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <defs>
      <linearGradient id="siriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5e5ce6" />
        <stop offset="30%" stopColor="#007aff" />
        <stop offset="60%" stopColor="#34c759" />
        <stop offset="100%" stopColor="#ff2d55" />
      </linearGradient>
    </defs>
    <rect width="28" height="28" rx="6" fill="url(#siriGrad)" />
    <circle cx="14" cy="14" r="6" fill="white" />
  </svg>
);

const AppIconSafari: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#007aff" />
    <circle cx="14" cy="14" r="8" fill="none" stroke="white" strokeWidth="1.5" />
    <path d="M14 6v16M6 14h16" stroke="white" strokeWidth="1" />
  </svg>
);

const AppIconSettings: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#8e8e93" />
    <circle cx="14" cy="14" r="5" fill="none" stroke="white" strokeWidth="1.5" />
    <path d="M14 4v3M14 21v3M4 14h3M21 14h3" stroke="white" strokeWidth="1.5" />
  </svg>
);

const AppIconAppStore: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <defs>
      <linearGradient id="storeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#007aff" />
        <stop offset="100%" stopColor="#5856d6" />
      </linearGradient>
    </defs>
    <rect width="28" height="28" rx="6" fill="url(#storeGrad)" />
    <path d="M10 18l4-10 4 10M12 14h8" stroke="white" strokeWidth="1.5" fill="none" />
  </svg>
);

const AppIconMail: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#007aff" />
    <rect x="6" y="9" width="16" height="10" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
    <path d="M6 11l8 6 8-6" stroke="white" strokeWidth="1.5" fill="none" />
  </svg>
);

const AppIconMessages: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#34c759" />
    <path d="M14 6c-5 0-9 3-9 7 0 2 1 4 3 5l-1 4 4-2c1 0 2 0 3 0 5 0 9-3 9-7s-4-7-9-7z" fill="white" />
  </svg>
);

const AppIconPhotos: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="white" />
    <circle cx="20" cy="8" r="4" fill="#ff2d55" />
    <circle cx="8" cy="10" r="4" fill="#007aff" />
    <circle cx="14" cy="20" r="4" fill="#34c759" />
    <circle cx="22" cy="18" r="3" fill="#ffcc00" />
  </svg>
);

const AppIconCalendar: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#ff3b30" />
    <rect x="6" y="8" width="16" height="14" rx="2" fill="white" />
    <path d="M6 12h16M10 6v4M18 6v4" stroke="white" strokeWidth="1.5" />
  </svg>
);

const AppIconMusic: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <defs>
      <linearGradient id="musicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff2d55" />
        <stop offset="50%" stopColor="#ff3b30" />
        <stop offset="100%" stopColor="#ff9500" />
      </linearGradient>
    </defs>
    <rect width="28" height="28" rx="6" fill="url(#musicGrad)" />
    <circle cx="10" cy="20" r="3" fill="white" />
    <circle cx="20" cy="16" r="3" fill="white" />
    <path d="M13 20V9l10-4v11" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

const AppIconNotes: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#ffcc00" />
    <rect x="6" y="5" width="16" height="18" rx="1" fill="white" />
    <path d="M9 10h10M9 14h10M9 18h6" stroke="#ffcc00" strokeWidth="1.5" />
  </svg>
);

const AppIconReminders: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#007aff" />
    <circle cx="14" cy="14" r="6" fill="none" stroke="white" strokeWidth="2" />
    <path d="M14 8v6l4 4" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

const AppIconTerminal: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#1c1c1e" />
    <path d="M8 8l6 6-6 6M14 20h8" stroke="white" strokeWidth="1.5" fill="none" />
  </svg>
);

const AppIconMaps: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#34c759" />
    <path d="M14 6c-4 0-7 3-7 7 0 5 7 9 7 9s7-4 7-9c0-4-3-7-7-7z" fill="white" />
    <circle cx="14" cy="13" r="2" fill="#34c759" />
  </svg>
);

const AppIconWeather: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#007aff" />
    <circle cx="10" cy="12" r="4" fill="white" />
    <path d="M8 20h10c3 0 5-2 5-5s-2-5-5-5c0-3-3-5-6-5" stroke="white" strokeWidth="1.5" fill="none" />
  </svg>
);

const AppIconBooks: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#ff9500" />
    <path d="M6 6h16v18H6z" fill="white" />
    <path d="M6 6l8 5 8-5M6 24l8-5 8 5" stroke="#ff9500" strokeWidth="1" fill="none" />
  </svg>
);

const AppIconCalculator: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#8e8e93" />
    <rect x="6" y="6" width="16" height="16" rx="2" fill="white" />
    <path d="M9 11h10M9 15h4M9 19h4M16 15h3M16 19h3" stroke="#8e8e93" strokeWidth="1.5" />
  </svg>
);

const AppIconFaceTime: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#34c759" />
    <rect x="6" y="8" width="16" height="12" rx="2" fill="white" />
    <path d="M18 14l4-2v4l-4-2z" fill="white" />
  </svg>
);

const AppIconTV: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#1c1c1e" />
    <rect x="5" y="7" width="18" height="12" rx="2" fill="white" />
    <path d="M11 19l-3 4M17 19l3 4" stroke="white" strokeWidth="1.5" />
  </svg>
);

const AppIconPodcasts: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <defs>
      <linearGradient id="podcastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5856d6" />
        <stop offset="100%" stopColor="#af52de" />
      </linearGradient>
    </defs>
    <rect width="28" height="28" rx="6" fill="url(#podcastGrad)" />
    <circle cx="14" cy="14" r="4" fill="none" stroke="white" strokeWidth="2" />
    <path d="M14 22v2M10 18c-2-2-2-6 0-8M18 18c2-2 2-6 0-8" stroke="white" strokeWidth="1.5" fill="none" />
  </svg>
);

const AppIconStocks: React.FC = () => (
  <svg viewBox="0 0 28 28" width="28" height="28">
    <rect width="28" height="28" rx="6" fill="#1c1c1e" />
    <path d="M6 18l6-6 4 4 6-8" stroke="#34c759" strokeWidth="2" fill="none" />
  </svg>
);

/** 应用图标映射表 */
const appIconMap: Record<string, React.FC> = {
  siri: AppIconSiri,
  safari: AppIconSafari,
  settings: AppIconSettings,
  appstore: AppIconAppStore,
  mail: AppIconMail,
  messages: AppIconMessages,
  photos: AppIconPhotos,
  calendar: AppIconCalendar,
  music: AppIconMusic,
  notes: AppIconNotes,
  reminders: AppIconReminders,
  terminal: AppIconTerminal,
  maps: AppIconMaps,
  weather: AppIconWeather,
  books: AppIconBooks,
  calculator: AppIconCalculator,
  facetime: AppIconFaceTime,
  tv: AppIconTV,
  podcasts: AppIconPodcasts,
  stocks: AppIconStocks,
};

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
  const useAppIcon = item.iconType === 'appIcon' && item.iconName;
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
    // 应用图标（内置 SVG）
    if (useAppIcon) {
      const AppIconComponent = appIconMap[item.iconName!];
      return AppIconComponent ? <AppIconComponent /> : null;
    }
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
      // 支持渐变背景（如果包含 linear-gradient）或纯色
      const isGradient = item.iconColor?.includes('gradient');
      return isGradient 
        ? { background: item.iconColor }
        : { backgroundColor: item.iconColor };
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
    useAppIcon ? 'finder-app-icon' : '',
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
