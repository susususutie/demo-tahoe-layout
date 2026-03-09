import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Toolbar } from './Toolbar';
import type { BreadcrumbItem } from './Breadcrumb';

/**
 * ContentHeader 组件属性
 */
export interface ContentHeaderProps {
  /** 页面标题（无面包屑时显示） */
  title?: string;
  /** 面包屑路径 */
  breadcrumbs?: BreadcrumbItem[];
  /** 面包屑点击回调 */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
  /** 工具栏按钮点击回调 */
  onToolbarButtonClick?: (id: string) => void;
  /** 点击新建按钮回调 */
  onNewClick?: () => void;
  /** 点击搜索回调 */
  onSearchClick?: () => void;
  /** 点击更多回调 */
  onMoreClick?: () => void;
}

/**
 * ContentHeader 组件
 * 内容区头部，包含面包屑/标题和工具栏
 */
export const ContentHeader: React.FC<ContentHeaderProps> = ({
  title = 'Tahoe Layout',
  breadcrumbs,
  onBreadcrumbClick,
  onToolbarButtonClick,
  onNewClick,
  onSearchClick,
  onMoreClick,
}) => {
  return (
    <header className="tahoe-content-header">
      <div className="tahoe-header-left">
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
      <Toolbar
        onButtonClick={onToolbarButtonClick}
        onNewClick={onNewClick}
        onSearchClick={onSearchClick}
        onMoreClick={onMoreClick}
      />
    </header>
  );
};

export default ContentHeader;
