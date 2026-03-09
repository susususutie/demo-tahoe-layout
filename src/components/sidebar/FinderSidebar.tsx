/**
 * Finder 风格侧边栏组件
 * - 分组标题（收藏/位置/标签）
 * - 圆角选中背景
 * - iCloud 同步状态
 * - 可收起/展开
 */

import React, { useState, useRef, useEffect } from 'react'
import { FloatingControls } from '../FloatingControls'
import type { SidebarProps, NavItem, NavSection } from './types'
import './FinderSidebar.css'

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
  Search,
  Star,
  Heart,
  Bell,
  User,
  Key,
  Lock,
  Moon,
  Sun,
  Battery,
  Bluetooth,
  Printer,
  ScanLine,
  Gamepad2,
  Mic,
  Camera,
  Music,
  Video,
  Play,
  Pause,
  Square,
  SkipForward,
  Shuffle,
  Repeat,
  List,
  Columns,
  PanelLeft,
  Maximize2,
  Minimize2,
  Fullscreen,
  PictureInPicture,
  Airplay,
  Cast,
  ScreenShare,
  CircleDot,
  Scissors,
  Copy,
  Clipboard,
  Undo2,
  Redo2,
  CheckSquare,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ListOrdered,
  IndentIncrease,
  IndentDecrease,
  Move,
  Scaling,
  RotateCw,
  FlipHorizontal,
  Crop,
  SlidersHorizontal,
  Filter,
  Wand2,
  Pencil,
  PenTool,
  Type,
  Palette,
  Droplet,
  Blend,
  Grid3x3,
  BoxSelect,
  CloudFog,
  SunDim,
  Droplets,
  Focus,
  Snowflake,
  SquareAsterisk,
  Waves,
  Replace,
  View,
  Spline,
  Grid2x2,
  Mail,
  Paintbrush,
  Eraser,
  Zap,
  Flame,
  Bandage,
  CopyPlus,
  Puzzle,
  EyeOff,
  Sparkles,
  Sunset,
  SunMedium,
  Paintbrush2,
  Shrink,
  ArrowLeftRight,
  Maximize,
  Minimize,
  SwatchBook,
  Feather,
  Sword,
  Telescope,
  Wind,
  CloudSun,
  Rainbow,
  CircleOff,
  ScatterChart,
  Film,
  History,
  Binary,
  Coffee,
  File,
  FileCode,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileJson,
  FileType,
  FileSpreadsheet,
  FileSymlink,
  FileTerminal,
  FileUp,
  FileDown,
  FilePlus,
  FileMinus,
  FileX,
  FileQuestion,
  FileCheck,
  FileClock,
  FileHeart,
  FileLock,
  FileSearch,
  FileWarning,
  type LucideProps,
} from 'lucide-react'

/** 内置应用图标文件映射表 - iconName 对应本地图标路径 */
const appIconFileMap: Record<string, string> = {
  finder: '/icons/finder.png',
  clock: '/icons/clock.png',
  textedit: '/icons/textedit.png',
}

/** Lucide 图标映射 - macOS 风格 */
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  // 访达风格图标
  airdrop: Share2, // 隔空投送
  recent: Clock, // 最近使用
  applications: LayoutGrid, // 应用程序
  image: Image, // 图片
  downloads: Download, // 下载
  desktop: Monitor, // 桌面
  documents: FileText, // 文稿
  icloud: Cloud, // iCloud
  share: FolderOpen, // 共享
  mac: Home, // Mac/位置
  network: Globe, // 网络
  trash: Trash2, // 废纸篓
  wifi: Wifi, // 无线
  folder: Folder, // 文件夹
  home: Home, // 主页
  // 系统设置风格图标
  settings: Settings, // 通用/设置
  menu: Menu, // 菜单栏
  accessibility: Accessibility, // 辅助功能
  target: Target, // 聚焦
  wallpaper: Cloud, // 墙纸（用云朵代替）
  appearance: Eye, // 外观
  display: Monitor, // 显示器
  // 更多常用图标
  search: Search, // 搜索
  star: Star, // 收藏
  heart: Heart, // 喜欢
  bell: Bell, // 通知
  user: User, // 用户
  key: Key, // 密码
  lock: Lock, // 安全
  moon: Moon, // 深色模式
  sun: Sun, // 浅色模式
  battery: Battery, // 电池
  wifi2: Wifi, // WiFi（备用）
  bluetooth: Bluetooth, // 蓝牙
  printer: Printer, // 打印机
  scanner: ScanLine, // 扫描仪
  gamepad: Gamepad2, // 游戏手柄
  mic: Mic, // 麦克风
  camera: Camera, // 相机
  music: Music, // 音乐
  video: Video, // 视频
  play: Play, // 播放
  pause: Pause, // 暂停
  stop: Square, // 停止
  skip: SkipForward, // 跳过
  shuffle: Shuffle, // 随机
  repeat: Repeat, // 重复
  list: List, // 列表
  grid: LayoutGrid, // 网格
  columns: Columns, // 分栏
  sidebar: PanelLeft, // 侧边栏
  maximize: Maximize2, // 最大化
  minimize: Minimize2, // 最小化
  fullscreen: Fullscreen, // 全屏
  exitFullscreen: Minimize2, // 退出全屏
  pictureInPicture: PictureInPicture, // 画中画
  airplay: Airplay, // AirPlay
  cast: Cast, // 投屏
  screenShare: ScreenShare, // 屏幕共享
  record: CircleDot, // 录制
  cut: Scissors, // 剪切
  copy: Copy, // 复制
  paste: Clipboard, // 粘贴
  undo: Undo2, // 撤销
  redo: Redo2, // 重做
  selectAll: CheckSquare, // 全选
  bold: Bold, // 粗体
  italic: Italic, // 斜体
  underline: Underline, // 下划线
  strikethrough: Strikethrough, // 删除线
  code: Code, // 代码
  link: Link, // 链接
  quote: Quote, // 引用
  alignLeft: AlignLeft, // 左对齐
  alignCenter: AlignCenter, // 居中对齐
  alignRight: AlignRight, // 右对齐
  alignJustify: AlignJustify, // 两端对齐
  listOrdered: ListOrdered, // 有序列表
  listUnordered: List, // 无序列表
  indent: IndentIncrease, // 增加缩进
  outdent: IndentDecrease, // 减少缩进
  move: Move, // 移动
  resize: Scaling, // 调整大小
  rotate: RotateCw, // 旋转
  flip: FlipHorizontal, // 翻转
  crop: Crop, // 裁剪
  adjust: SlidersHorizontal, // 调整
  filter: Filter, // 滤镜
  effects: Wand2, // 效果
  markup: Pencil, // 标记
  signature: PenTool, // 签名
  text: Type, // 文本
  font: Palette, // 字体
  color: Droplet, // 颜色
  gradient: Blend, // 渐变
  pattern: Grid3x3, // 图案
  texture: BoxSelect, // 纹理
  shadow: CloudFog, // 阴影
  glow: SunDim, // 发光
  blur: Droplets, // 模糊
  sharpen: Focus, // 锐化
  noise: Snowflake, // 噪点
  pixelate: SquareAsterisk, // 像素化
  distort: Waves, // 扭曲
  transform: Replace, // 变换
  perspective: View, // 透视
  warp: Spline, // 变形
  mesh: Grid2x2, // 网格变形
  envelope: Mail, // 变形工具
  liquify: Paintbrush, // 液化
  smudge: Eraser, // 涂抹
  dodge: Zap, // 减淡
  burn: Flame, // 加深
  sponge: Droplet, // 海绵
  heal: Bandage, // 修复
  clone: CopyPlus, // 仿制
  patch: Puzzle, // 修补
  redEye: EyeOff, // 红眼
  whiten: Sparkles, // 美白
  bronze: Sunset, // 古铜
  tan: SunMedium, // 日晒
  makeup: Paintbrush2, // 美妆
  reshape: Shrink, // 重塑
  slim: ArrowLeftRight, // 瘦脸
  enlarge: Maximize, // 放大
  shrink: Minimize, // 缩小
  liquefy: SwatchBook, // 液化
  smooth: Feather, // 平滑
  sharpen2: Sword, // 锐化2
  clarify: Telescope, // 清晰
  denoise: Wind, // 降噪
  dehaze: CloudSun, // 去雾
  defringe: Target, // 去边
  chromatic: Rainbow, // 色差
  vignette: CircleOff, // 暗角
  grain: ScatterChart, // 颗粒
  film: Film, // 胶片
  vintage: History, // 复古
  noir: Moon, // 黑白
  instant: Camera, // 拍立得
  transfer: Shuffle, // 转换
  mono: Binary, // 单色
  sepia: Coffee, // 褐色
  // 文件类型图标
  file: File, // 文件
  fileText: FileText, // 文本文件
  fileCode: FileCode, // 代码文件
  fileImage: FileImage, // 图片文件
  fileVideo: FileVideo, // 视频文件
  fileAudio: FileAudio, // 音频文件
  fileArchive: FileArchive, // 压缩文件
  fileJson: FileJson, // JSON文件
  fileType: FileType, // 类型文件
  fileSpreadsheet: FileSpreadsheet, // 表格文件
  fileSymlink: FileSymlink, // 符号链接
  fileTerminal: FileTerminal, // 终端文件
  fileUp: FileUp, // 上传文件
  fileDown: FileDown, // 下载文件
  filePlus: FilePlus, // 新建文件
  fileMinus: FileMinus, // 删除文件
  fileX: FileX, // 错误文件
  fileQuestion: FileQuestion, // 未知文件
  fileCheck: FileCheck, // 已检查文件
  fileClock: FileClock, // 待处理文件
  fileHeart: FileHeart, // 收藏文件
  fileLock: FileLock, // 锁定文件
  fileSearch: FileSearch, // 搜索文件
  fileWarning: FileWarning, // 警告文件
}

/** 内置图标组件 - 使用 Lucide Icons */
const BuiltinIcon: React.FC<{ name: string; color?: string }> = ({ name, color }) => {
  const IconComponent = iconMap[name]

  if (!IconComponent) return null

  return <IconComponent size={18} color={color} strokeWidth={1.5} />
}

/** 单个导航项 */
const NavItemComponent: React.FC<{
  item: NavItem
  isActive: boolean
  isCollapsed: boolean
  onClick: () => void
  highlightOnSelect?: boolean
}> = ({ item, isActive, isCollapsed, onClick, highlightOnSelect }) => {
  // 计算选中时的文字颜色
  const activeTextColor = (() => {
    if (!isActive || !item.activeColor) return undefined
    if (item.activeColor === 'default') return undefined
    if (item.activeColor === 'macos') return '#007aff'
    return item.activeColor
  })()

  // 计算文字样式
  const textStyle = activeTextColor ? { color: activeTextColor } : undefined

  // 判断图标类型
  const useRoundedRect = item.iconType === 'roundedRect' && item.iconColor
  const useCircle = item.iconType === 'circle' && item.iconColor
  const useColoredRect = item.iconType === 'coloredRect' && item.iconColor && item.iconName
  const useImage = item.iconType === 'image' && item.iconSrc
  const useAppIcon = item.iconType === 'appIcon' && item.iconName
  const useFixedColor = useRoundedRect || useCircle

  // 计算图标颜色
  const iconColor = (() => {
    // 固定颜色图标（圆角矩形/圆形）- 使用固定颜色
    if (useFixedColor) {
      return item.iconColor
    }
    // SVG 图标 - 跟随文字颜色（选中时变色）
    if (isActive && activeTextColor) {
      return activeTextColor
    }
    return undefined
  })()

  // 渲染图标内容
  const renderIcon = () => {
    // 应用图标（内置图标文件，通过 iconName 匹配）
    if (useAppIcon) {
      const iconPath = appIconFileMap[item.iconName!]
      if (!iconPath) return null
      return <img src={iconPath} alt={item.label} style={{ objectFit: 'contain' }} />
    }
    // 图片图标（从外部 URL 加载）
    if (useImage) {
      const size = item.iconSize || 20
      return (
        <img
          src={item.iconSrc}
          alt={item.label}
          style={{ width: size, height: size, objectFit: 'contain' }}
        />
      )
    }
    // 固定颜色纯色块（圆角矩形/圆形）- 由 CSS 绘制
    if (useFixedColor) {
      return null
    }
    // 彩色背景 + 白色图标
    if (useColoredRect) {
      return <BuiltinIcon name={item.iconName!} color="white" />
    }
    // SVG 线条图标 - 可随文字变色
    if (item.iconName) {
      return <BuiltinIcon name={item.iconName} color={iconColor} />
    }
    return null
  }

  // 构建图标容器样式和类名
  const iconContainerStyle = (() => {
    if (useColoredRect) {
      // 支持渐变背景（如果包含 linear-gradient）或纯色
      const isGradient = item.iconColor?.includes('gradient')
      return isGradient ? { background: item.iconColor } : { backgroundColor: item.iconColor }
    }
    if (useFixedColor) {
      return { color: item.iconColor }
    }
    return undefined
  })()

  const iconClassName = [
    'finder-nav-icon',
    useRoundedRect ? 'finder-rounded-rect' : '',
    useCircle ? 'finder-circle' : '',
    useColoredRect ? 'finder-colored-rect' : '',
    useImage ? 'finder-image-icon' : '',
    useAppIcon ? 'finder-app-icon' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={`finder-nav-item ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''} ${
        highlightOnSelect ? 'highlight' : ''
      }`}
      onClick={onClick}
      disabled={item.disabled}
      title={isCollapsed ? item.label : undefined}
      style={textStyle}
      data-icon-type={item.iconType}
      data-icon-color={item.iconColor}
    >
      <span className={iconClassName} style={iconContainerStyle}>
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
  )
}

/** 导航分组 - 支持展开/收起 */
const NavSectionComponent: React.FC<{
  section: NavSection
  activeId: string
  isCollapsed: boolean
  onSelect: (id: string) => void
}> = ({ section, activeId, isCollapsed, onSelect }) => {
  // collapsible 默认为 true，defaultExpanded 默认为 true
  const collapsible = section.collapsible !== false
  const defaultExpanded = section.defaultExpanded !== false
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // 不可折叠时强制展开
  const effectiveExpanded = collapsible ? isExpanded : true

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
    )
  }

  const hasTitle = !!section.title

  return (
    <div className={`finder-section ${effectiveExpanded ? 'expanded' : 'collapsed'}`}>
      {/* 标题区域：有标题时渲染头部 */}
      {hasTitle && (
        <div className="finder-section-header">
          <h3 className="finder-section-title">{section.title}</h3>
          {/* 仅当 collapsible 为 true 且存在标题时显示展开/收起按钮 */}
          {collapsible && (
            <button
              className="finder-section-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={effectiveExpanded ? '收起分组' : '展开分组'}
              title={effectiveExpanded ? '收起' : '展开'}
            >
              <svg
                className={effectiveExpanded ? 'expanded' : ''}
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
          )}
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
  )
}

/** Finder 风格侧边栏 */
export const FinderSidebar: React.FC<SidebarProps> = ({
  sections,
  activeId,
  onSelect,
  config = {},
  onCollapsedChange,
  footer,
  collapsed: controlledCollapsed,
}) => {
  const { defaultCollapsed = false } = config

  // 内部状态（非受控模式）
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)

  // 判断是否使用受控模式
  const isControlled = controlledCollapsed !== undefined
  const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed

  const setIsCollapsed = (value: boolean | ((prev: boolean) => boolean)) => {
    if (isControlled) {
      // 受控模式：只通知父组件
      const newValue = typeof value === 'function' ? value(controlledCollapsed!) : value
      onCollapsedChange?.(newValue)
    } else {
      // 非受控模式：更新内部状态
      setInternalCollapsed(value)
    }
  }

  const navRef = useRef<HTMLDivElement>(null)

  // 通知父组件收起状态变化（非受控模式）
  useEffect(() => {
    if (!isControlled) {
      onCollapsedChange?.(isCollapsed)
    }
  }, [isCollapsed, onCollapsedChange, isControlled])

  // 侧边栏宽度状态（最小216px）
  const [sidebarWidth, setSidebarWidth] = useState(200)
  const MIN_WIDTH = 216
  const MAX_WIDTH = 400
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  // 开始拖动
  const handleResizeStart = (e: React.MouseEvent) => {
    if (isCollapsed) return
    isResizing.current = true
    startX.current = e.clientX
    startWidth.current = sidebarWidth
    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'
  }

  // 拖动中
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return
      const delta = e.clientX - startX.current
      const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth.current + delta))
      setSidebarWidth(newWidth)
      // 更新CSS变量
      document.documentElement.style.setProperty('--finder-width', `${newWidth}px`)
    }

    const handleMouseUp = () => {
      isResizing.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [sidebarWidth])

  return (
    <>
      {/* 悬浮控制按钮组 - 固定在左上角，不随侧边栏移动 */}
      <FloatingControls
        isCollapsed={isCollapsed}
        onExpand={() => setIsCollapsed(false)}
        onCollapse={() => setIsCollapsed(true)}
      />

      {/* 侧边栏占位容器 - 占用空间防止内容区被遮挡 */}
      <div className={`finder-sidebar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <aside className={`finder-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
          {/* 头部固定区域 - 带模糊遮罩，滚动时内容能透过遮罩显示 */}
          <div className='finder-sidebar-header' />

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
            {footer && !isCollapsed && <div className="finder-footer">{footer}</div>}
          </nav>

          {/* 拖动调整宽度的手柄 */}
          {!isCollapsed && (
            <div
              className="finder-resize-handle"
              onMouseDown={handleResizeStart}
              title="拖动调整宽度"
            />
          )}
        </aside>
      </div>
    </>
  )
}

FinderSidebar.displayName = 'FinderSidebar'

export default FinderSidebar
