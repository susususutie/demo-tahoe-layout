import React, { useState, useRef, useEffect } from 'react';
import './TahoeLayout.css';

interface TahoeLayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  title?: string;
}

export const TahoeLayout: React.FC<TahoeLayoutProps> = ({
  children,
  sidebarContent,
  title = 'Tahoe Layout',
}) => {
  const [sidebarScrolled, setSidebarScrolled] = useState(false);
  const [contentScrolled, setContentScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebarEl = sidebarRef.current;
    const contentEl = contentRef.current;

    const handleSidebarScroll = () => {
      if (sidebarEl) {
        setSidebarScrolled(sidebarEl.scrollTop > 0);
      }
    };

    const handleContentScroll = () => {
      if (contentEl) {
        setContentScrolled(contentEl.scrollTop > 0);
      }
    };

    sidebarEl?.addEventListener('scroll', handleSidebarScroll);
    contentEl?.addEventListener('scroll', handleContentScroll);

    return () => {
      sidebarEl?.removeEventListener('scroll', handleSidebarScroll);
      contentEl?.removeEventListener('scroll', handleContentScroll);
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
      {/* Sidebar */}
      <aside className="tahoe-sidebar">
        <div
          className={`tahoe-sidebar-vignette top ${sidebarScrolled ? 'visible' : ''}`}
        />
        <div className="tahoe-sidebar-header">
          <div className="tahoe-avatar">S</div>
          <span className="tahoe-username">sutie</span>
        </div>
        <nav className="tahoe-sidebar-nav" ref={sidebarRef}>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`tahoe-nav-item ${activeItem === item.label ? 'active' : ''}`}
              onClick={() => setActiveItem(item.label)}
            >
              <span className="tahoe-nav-icon">{item.icon}</span>
              <span className="tahoe-nav-label">{item.label}</span>
            </button>
          ))}
          {/* Extra items to enable scrolling */}
          {Array.from({ length: 10 }).map((_, i) => (
            <button key={`extra-${i}`} className="tahoe-nav-item">
              <span className="tahoe-nav-icon">📁</span>
              <span className="tahoe-nav-label">Folder {i + 1}</span>
            </button>
          ))}
        </nav>
        <div
          className={`tahoe-sidebar-vignette bottom ${sidebarScrolled ? 'visible' : ''}`}
        />
      </aside>

      {/* Main Content */}
      <main className="tahoe-main">
        <div
          className={`tahoe-content-vignette top ${contentScrolled ? 'visible' : ''}`}
        />
        <div className="tahoe-content-header">
          <h1 className="tahoe-title">{title}</h1>
          <div className="tahoe-actions">
            <button className="tahoe-action-btn">+ New</button>
            <button className="tahoe-action-btn secondary">⋯</button>
          </div>
        </div>
        <div className="tahoe-content" ref={contentRef}>
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
