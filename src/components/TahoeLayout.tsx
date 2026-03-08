import React, { useState, useRef, useEffect } from 'react';
import { FinderSidebar } from './sidebar';
import { Breadcrumb } from './Breadcrumb';
import type { NavSection, SidebarConfig } from './sidebar/types';
import type { BreadcrumbItem } from './Breadcrumb';
import './TahoeLayout.css';

/** 侧边栏变体类型 */
type SidebarVariant = 'finder' | 'classic';

interface TahoeLayoutProps {
  children: React.ReactNode;
  title?: string;
  /** 侧边栏变体 */
  sidebarVariant?: SidebarVariant;
  /** 自定义侧边栏配置 */
  sidebarConfig?: SidebarConfig;
  /** 面包屑路径 */
  breadcrumbs?: BreadcrumbItem[];
  /** 面包屑点击回调 */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
  /** 导航选中回调 */
  onNavSelect?: (id: string) => void;
}

/**
 * 示例导航数据 - 访达风格分组
 */
const getDefaultNavSections = (): NavSection[] => [
  {
    id: 'favorites',
    title: '个人收藏',
    items: [
      // 所有菜单选中时文字都变为 macOS 蓝色，使用内置 SVG 图标
      { id: 'airdrop', iconName: 'airdrop', label: '隔空投送', activeColor: 'macos' },
      { id: 'recent', iconName: 'recent', label: '最近使用', activeColor: 'macos' },
      { id: 'applications', iconName: 'applications', label: '应用程序', activeColor: 'macos' },
      { id: 'desktop', iconName: 'desktop', label: '桌面', badge: 3, activeColor: 'macos' },
      { id: 'documents', iconName: 'documents', label: '文稿', activeColor: 'macos' },
      { id: 'downloads', iconName: 'downloads', label: '下载', activeColor: 'macos' },
    ],
  },
  {
    id: 'icloud',
    title: 'iCloud',
    items: [
      { id: 'icloud-drive', iconName: 'icloud', label: 'iCloud 云盘' },
      { id: 'shared', iconName: 'share', label: '共享' },
    ],
  },
  {
    id: 'locations',
    title: '位置',
    items: [
      { id: 'mac', iconName: 'mac', label: 'Mac' },
      { id: 'network', iconName: 'network', label: '网络' },
    ],
  },
  {
    id: 'tags',
    title: '标签',
    items: [
      // 所有标签都使用 CSS 绘制的固定颜色圆点，选中时文字颜色也对应变化
      { id: 'tag-red', label: '红色', iconType: 'fixed', iconColor: '#ff3b30', activeColor: '#ff3b30' },
      { id: 'tag-orange', label: '工作', iconType: 'fixed', iconColor: '#ff9500', activeColor: '#ff9500' },
      { id: 'tag-yellow', label: '黄色', iconType: 'fixed', iconColor: '#ffcc00', activeColor: '#ffcc00' },
      { id: 'tag-green', label: '已完成', iconType: 'fixed', iconColor: '#34c759', activeColor: '#34c759' },
      { id: 'tag-blue', label: '个人', iconType: 'fixed', iconColor: '#007aff', activeColor: '#007aff' },
      { id: 'tag-purple', label: '紫色', iconType: 'fixed', iconColor: '#af52de', activeColor: '#af52de' },
    ],
  },
];

export const TahoeLayout: React.FC<TahoeLayoutProps> = ({
  children,
  title = 'Tahoe Layout',
  sidebarVariant = 'finder',
  sidebarConfig,
  breadcrumbs,
  onBreadcrumbClick,
  onNavSelect,
}) => {
  const [activeNavId, setActiveNavId] = useState('recent');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    sidebarConfig?.defaultCollapsed ?? false
  );
  const [contentScrolled, setContentScrolled] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // 导航数据
  const navSections = getDefaultNavSections();

  // 监听主内容区滚动
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      setContentScrolled(mainEl.scrollTop > 0);
    };

    mainEl.addEventListener('scroll', handleScroll);
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理导航选择
  const handleNavSelect = (id: string) => {
    setActiveNavId(id);
    onNavSelect?.(id);
  };

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
            onCollapsedChange={setIsSidebarCollapsed}
            syncStatus="synced"
            user={{ name: 'sutie' }}
          />
        );
      case 'classic':
        return <ClassicSidebar />;
      default:
        return null;
    }
  };

  // 经典侧边栏（保留原有简单样式作为备选）
  const ClassicSidebar = () => (
    <aside className={`tahoe-sidebar-classic ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="tahoe-classic-header">
        <span>Sidebar</span>
        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
          {isSidebarCollapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="tahoe-classic-nav">
        {navSections[0].items.map((item) => (
          <button
            key={item.id}
            className={activeNavId === item.id ? 'active' : ''}
            onClick={() => handleNavSelect(item.id)}
          >
            {isSidebarCollapsed ? item.label.charAt(0) : item.label}
          </button>
        ))}
      </nav>
    </aside>
  );

  return (
    <div className="tahoe-layout">
      {/* 侧边栏 */}
      {renderSidebar()}

      {/* 主内容区 */}
      <main className="tahoe-main" ref={mainRef}>
        {/* 滚动遮罩 - 顶部 */}
        <div className={`tahoe-content-vignette top ${contentScrolled ? 'visible' : ''}`} />

        {/* 内容头部 */}
        <header className="tahoe-content-header">
          <div className="tahoe-header-left">
            {/* 当侧边栏收起时显示展开按钮 */}
            {isSidebarCollapsed && (
              <button
                className="tahoe-sidebar-show-btn"
                onClick={() => setIsSidebarCollapsed(false)}
                aria-label="展开侧边栏"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
            )}

            {/* 面包屑导航 */}
            {breadcrumbs ? (
              <Breadcrumb
                items={breadcrumbs}
                onItemClick={onBreadcrumbClick}
              />
            ) : (
              <h1 className="tahoe-title">{title}</h1>
            )}
          </div>

          {/* 工具栏 */}
          <div className="tahoe-toolbar">
            <button className="tahoe-tool-btn" title="图标视图">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button className="tahoe-tool-btn" title="列表视图">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button className="tahoe-tool-btn" title="分享">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
            <button className="tahoe-tool-btn" title="标签">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </button>
            <div className="tahoe-toolbar-divider" />
            <button className="tahoe-tool-btn tahoe-tool-btn-primary" title="新建">
              <span>+ 新建</span>
            </button>
            <button className="tahoe-tool-btn" title="搜索">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <button className="tahoe-tool-btn" title="更多">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
          </div>
        </header>

        {/* 内容区域 */}
        <div className="tahoe-content">
          {children}
        </div>

        {/* 滚动遮罩 - 底部 */}
        <div className="tahoe-content-vignette bottom" />
      </main>
    </div>
  );
};

export default TahoeLayout;
