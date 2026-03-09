import React from 'react';
import type { NavSection } from './types';

/**
 * ClassicSidebar 组件属性
 */
interface ClassicSidebarProps {
  /** 导航分组数据 */
  sections: NavSection[];
  /** 当前激活的导航项 ID */
  activeId: string;
  /** 是否收起 */
  collapsed?: boolean;
  /** 导航项点击回调 */
  onSelect?: (id: string) => void;
  /** 切换收起状态回调 */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** 头部标题 */
  headerTitle?: string;
}

/**
 * ClassicSidebar 组件
 * 经典风格侧边栏，保留原有简单样式作为备选
 */
export const ClassicSidebar: React.FC<ClassicSidebarProps> = ({
  sections,
  activeId,
  collapsed = false,
  onSelect,
  onCollapsedChange,
  headerTitle = 'Sidebar',
}) => {
  // 获取第一个分组的导航项
  const firstSectionItems = sections[0]?.items ?? [];

  const handleToggle = () => {
    onCollapsedChange?.(!collapsed);
  };

  const handleSelect = (id: string) => {
    onSelect?.(id);
  };

  return (
    <div className={`tahoe-sidebar-classic-wrapper ${collapsed ? 'collapsed' : ''}`}>
      <aside className={`tahoe-sidebar-classic ${collapsed ? 'collapsed' : ''}`}>
        <div className="tahoe-classic-header">
          <span>{headerTitle}</span>
          <button onClick={handleToggle}>
            {collapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="tahoe-classic-nav">
          {firstSectionItems.map((item) => (
            <button
              key={item.id}
              className={activeId === item.id ? 'active' : ''}
              onClick={() => handleSelect(item.id)}
            >
              {collapsed ? item.label.charAt(0) : item.label}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default ClassicSidebar;
