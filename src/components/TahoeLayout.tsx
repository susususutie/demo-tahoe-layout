import React, { useState, useRef, useEffect } from 'react';
import './TahoeLayout.css';

interface TahoeLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  title?: string;
  defaultCollapsed?: boolean;
}

export const TahoeLayout: React.FC<TahoeLayoutProps> = ({
  children,
  sidebarContent,
  title = 'Tahoe Layout',
  defaultCollapsed = false,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);
  const [sidebarScrolled, setSidebarScrolled] = useState(false);
  const [contentScrolled, setContentScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sidebarEl = sidebarRef.current;
    const mainEl = mainRef.current;

    const handleSidebarScroll = () => {
      if (sidebarEl) {
        setSidebarScrolled(sidebarEl.scrollTop > 0);
      }
    };

    const handleMainScroll = () => {
      if (mainEl) {
        setContentScrolled(mainEl.scrollTop > 0);
      }
    };

    sidebarEl?.addEventListener('scroll', handleSidebarScroll);
    mainEl?.addEventListener('scroll', handleMainScroll);

    return () => {
      sidebarEl?.removeEventListener('scroll', handleSidebarScroll);
      mainEl?.removeEventListener('scroll', handleMainScroll);
    };
  }, []);

  const navItems = [
    { icon: '🏠', label: 'Dashboard' },
    { icon: '📄', label: 'Documents' },
    { icon: '🖼️', label: 'Images' },
    { icon: '🎵', label: 'Music' },
    { icon: '🎬', label: 'Videos' },
    { icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="tahoe-layout">
      {/* Sidebar - 访达风格圆角设计 */}
      <aside
        className={`tahoe-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}
      >
        <div
          className={`tahoe-sidebar-vignette top ${sidebarScrolled ? 'visible' : ''}`}
        />
        <div className="tahoe-sidebar-header">
          {!sidebarCollapsed && (
            <>
              <div className="tahoe-avatar">S</div>
              <span className="tahoe-username">sutie</span>
            </>
          )}
          {/* 收起/展开按钮 */}
          <button
            className="tahoe-sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'}
          >
            <span className={`tahoe-toggle-icon ${sidebarCollapsed ? 'collapsed' : ''}`}>
              ◀
            </span>
          </button>
        </div>
        <nav className="tahoe-sidebar-nav" ref={sidebarRef}>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`tahoe-nav-item ${activeItem === item.label ? 'active' : ''}`}
              onClick={() => setActiveItem(item.label)}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className="tahoe-nav-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <span className="tahoe-nav-label">{item.label}</span>
              )}
            </button>
          ))}
          {/* Extra items to enable scrolling */}
          {!sidebarCollapsed && Array.from({ length: 10 }).map((_, i) => (
            <button key={`extra-${i}`} className="tahoe-nav-item">
              <span className="tahoe-nav-icon">📁</span>
              <span className="tahoe-nav-label">Folder {i + 1}</span>
            </button>
          ))}
          {/* Custom sidebar content */}
          {!sidebarCollapsed && sidebarContent && (
            <div className="tahoe-sidebar-custom">{sidebarContent}</div>
          )}
        </nav>
        <div
          className={`tahoe-sidebar-vignette bottom ${sidebarScrolled ? 'visible' : ''}`}
        />
      </aside>

      {/* Main Content */}
      <main className="tahoe-main" ref={mainRef}>
        <div
          className={`tahoe-content-vignette top ${contentScrolled ? 'visible' : ''}`}
        />
        <div className="tahoe-content-header">
          <div className="tahoe-header-left">
            {/* 当侧边栏收起时显示展开按钮 */}
            {sidebarCollapsed && (
              <button
                className="tahoe-sidebar-show-btn"
                onClick={() => setSidebarCollapsed(false)}
                aria-label="展开侧边栏"
              >
                ☰
              </button>
            )}
            <h1 className="tahoe-title">{title}</h1>
          </div>
          <div className="tahoe-actions">
            <button className="tahoe-action-btn">+ New</button>
            <button className="tahoe-action-btn secondary">⋯</button>
          </div>
        </div>
        <div className="tahoe-content">
          {children}
        </div>
        <div
          className={`tahoe-content-vignette bottom ${contentScrolled ? 'visible' : ''}`}
        />
      </main>
    </div>
  );
};

export default TahoeLayout;