/**
 * 面包屑导航组件
 * 参考 macOS Finder 路径栏设计
 */

import React from 'react'
import './Breadcrumb.css'

export interface BreadcrumbItem {
  id: string
  label: string
  icon?: React.ReactNode
}

export interface BreadcrumbProps {
  /** 路径项列表 */
  items: BreadcrumbItem[]
  /** 当前选中项索引（可选，用于高亮） */
  activeIndex?: number
  /** 点击回调 */
  onItemClick?: (item: BreadcrumbItem, index: number) => void
  /** 自定义分隔符 */
  separator?: React.ReactNode
  /** 是否显示首页图标 */
  showHome?: boolean
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  activeIndex = -1,
  onItemClick,
  separator,
  showHome = true,
}) => {
  const handleClick = (item: BreadcrumbItem, index: number) => {
    onItemClick?.(item, index)
  }

  return (
    <nav className="tahoe-breadcrumb" aria-label="面包屑导航">
      <ol className="tahoe-breadcrumb-list">
        {/* 首页图标 */}
        {showHome && (
          <li className="tahoe-breadcrumb-item">
            <button
              className="tahoe-breadcrumb-btn tahoe-breadcrumb-home"
              onClick={() => handleClick({ id: 'home', label: '首页' }, -1)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
            {separator || <ChevronRight />}
          </li>
        )}

        {/* 路径项 */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isActive = index === activeIndex

          return (
            <li
              key={item.id}
              className={`tahoe-breadcrumb-item ${isActive ? 'active' : ''} ${isLast ? 'last' : ''}`}
            >
              <button
                className="tahoe-breadcrumb-btn"
                onClick={() => handleClick(item, index)}
                disabled={isLast && !onItemClick}
              >
                {item.icon && <span className="tahoe-breadcrumb-icon">{item.icon}</span>}
                <span className="tahoe-breadcrumb-label">{item.label}</span>
              </button>
              {!isLast && (separator || <ChevronRight />)}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** 右箭头分隔符 */
const ChevronRight: React.FC = () => (
  <svg
    className="tahoe-breadcrumb-separator"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default Breadcrumb
