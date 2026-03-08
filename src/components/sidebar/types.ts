/**
 * 侧边栏组件类型定义
 * 支持可插拔的侧边栏架构
 */

import type { ReactNode, JSX } from 'react';

/** 选中文字颜色模式 */
export type ActiveTextColor = 'default' | 'macos' | string;

/** 内置图标名称 - macOS 风格 */
export type BuiltinIconName =
  // 访达风格图标
  | 'airdrop'      // 隔空投送
  | 'recent'       // 最近使用
  | 'applications' // 应用程序
  | 'image'        // 图片
  | 'desktop'      // 桌面
  | 'documents'    // 文稿
  | 'downloads'    // 下载
  | 'icloud'       // iCloud
  | 'share'        // 共享
  | 'mac'          // Mac
  | 'network'      // 网络
  | 'trash'        // 废纸篓
  | 'wifi'         // 无线
  | 'folder'       // 文件夹
  | 'home'         // 主页
  // 系统设置风格图标
  | 'settings'     // 通用/设置
  | 'menu'         // 菜单栏
  | 'accessibility'// 辅助功能
  | 'target'       // 聚焦
  | 'wallpaper'    // 墙纸
  | 'appearance'   // 外观
  | 'display'      // 显示器
  // macOS 应用图标
  | 'finder'       // Finder
  | 'clock'        // 时钟
  | 'textedit'     // 文本编辑
  // 常用功能图标
  | 'search'       // 搜索
  | 'star'         // 收藏
  | 'heart'        // 喜欢
  | 'bell'         // 通知
  | 'user'         // 用户
  | 'key'          // 密码
  | 'lock'         // 安全
  | 'moon'         // 深色模式
  | 'sun'          // 浅色模式
  | 'battery'      // 电池
  | 'bluetooth'    // 蓝牙
  | 'printer'      // 打印机
  | 'scanner'      // 扫描仪
  | 'gamepad'      // 游戏手柄
  | 'mic'          // 麦克风
  | 'camera'       // 相机
  | 'music'        // 音乐
  | 'video'        // 视频
  | 'play'         // 播放
  | 'pause'        // 暂停
  | 'stop'         // 停止
  | 'skip'         // 跳过
  | 'shuffle'      // 随机
  | 'repeat'       // 重复
  | 'list'         // 列表
  | 'grid'         // 网格
  | 'columns'      // 分栏
  | 'sidebar'      // 侧边栏
  | 'maximize'     // 最大化
  | 'minimize'     // 最小化
  | 'fullscreen'   // 全屏
  | 'exitFullscreen' // 退出全屏
  | 'pictureInPicture' // 画中画
  | 'airplay'      // AirPlay
  | 'cast'         // 投屏
  | 'screenShare'  // 屏幕共享
  | 'record'       // 录制
  | 'cut'          // 剪切
  | 'copy'         // 复制
  | 'paste'        // 粘贴
  | 'undo'         // 撤销
  | 'redo'         // 重做
  | 'selectAll'    // 全选
  | 'bold'         // 粗体
  | 'italic'       // 斜体
  | 'underline'    // 下划线
  | 'strikethrough'// 删除线
  | 'code'         // 代码
  | 'link'         // 链接
  | 'quote'        // 引用
  | 'alignLeft'    // 左对齐
  | 'alignCenter'  // 居中对齐
  | 'alignRight'   // 右对齐
  | 'alignJustify' // 两端对齐
  | 'listOrdered'  // 有序列表
  | 'listUnordered'// 无序列表
  | 'indent'       // 增加缩进
  | 'outdent'      // 减少缩进
  | 'move'         // 移动
  | 'resize'       // 调整大小
  | 'rotate'       // 旋转
  | 'flip'         // 翻转
  | 'crop'         // 裁剪
  | 'adjust'       // 调整
  | 'filter'       // 滤镜
  | 'effects'      // 效果
  | 'markup'       // 标记
  | 'signature'    // 签名
  | 'text'         // 文本
  | 'font'         // 字体
  | 'color'        // 颜色
  | 'gradient'     // 渐变
  | 'pattern'      // 图案
  | 'texture'      // 纹理
  | 'shadow'       // 阴影
  | 'glow'         // 发光
  | 'blur'         // 模糊
  | 'sharpen'      // 锐化
  | 'noise'        // 噪点
  | 'pixelate'     // 像素化
  | 'distort'      // 扭曲
  | 'transform'    // 变换
  | 'perspective'  // 透视
  | 'warp'         // 变形
  | 'mesh'         // 网格变形
  | 'envelope'     // 变形工具
  | 'liquify'      // 液化
  | 'smudge'       // 涂抹
  | 'dodge'        // 减淡
  | 'burn'         // 加深
  | 'sponge'       // 海绵
  | 'heal'         // 修复
  | 'clone'        // 仿制
  | 'patch'        // 修补
  | 'redEye'       // 红眼
  | 'whiten'       // 美白
  | 'bronze'       // 古铜
  | 'tan'          // 日晒
  | 'makeup'       // 美妆
  | 'reshape'      // 重塑
  | 'slim'         // 瘦脸
  | 'enlarge'      // 放大
  | 'shrink'       // 缩小
  | 'smooth'       // 平滑
  | 'clarify'      // 清晰
  | 'denoise'      // 降噪
  | 'dehaze'       // 去雾
  | 'defringe'     // 去边
  | 'chromatic'    // 色差
  | 'vignette'     // 暗角
  | 'grain'        // 颗粒
  | 'film'         // 胶片
  | 'vintage'      // 复古
  | 'noir'         // 黑白
  | 'instant'      // 拍立得
  | 'transfer'     // 转换
  | 'chrome'       // 铬黄
  | 'fade'         // 褪色
  | 'process'      // 处理
  | 'tonal'        // 色调
  | 'mono'         // 单色
  | 'silver'       // 银色
  | 'sepia'        // 褐色
  // 文件类型图标
  | 'file'         // 文件
  | 'fileText'     // 文本文件
  | 'fileCode'     // 代码文件
  | 'fileImage'    // 图片文件
  | 'fileVideo'    // 视频文件
  | 'fileAudio'    // 音频文件
  | 'fileArchive'  // 压缩文件
  | 'fileJson'     // JSON文件
  | 'fileType'     // 类型文件
  | 'fileSpreadsheet' // 表格文件
  | 'fileSymlink'  // 符号链接
  | 'fileTerminal' // 终端文件
  | 'fileUp'       // 上传文件
  | 'fileDown'     // 下载文件
  | 'filePlus'     // 新建文件
  | 'fileMinus'    // 删除文件
  | 'fileX'        // 错误文件
  | 'fileQuestion' // 未知文件
  | 'fileCheck'    // 已检查文件
  | 'fileClock'    // 待处理文件
  | 'fileHeart'    // 收藏文件
  | 'fileLock'     // 锁定文件
  | 'fileSearch'   // 搜索文件
  | 'fileWarning'; // 警告文件

/** 导航项数据 */
export interface NavItem {
  id: string;
  label: string;
  badge?: number;
  shortcut?: string;
  disabled?: boolean;
  /** 
   * 选中时的文字颜色
   * - 'default': 不改变（保持默认黑色/白色）
   * - 'macos': 使用 macOS 默认蓝色 (#007aff)
   * - string: 自定义颜色值（如 '#ff3b30'）
   */
  activeColor?: ActiveTextColor;
  /** 
   * 图标类型
   * - 'svg' | undefined: 使用 SVG 线条图标（根据 iconName 渲染，可随文字变色）
   * - 'appIcon': 使用 macOS 应用图标（内置图标文件，通过 iconName 匹配）
   * - 'image': 使用外部图片图标（从 URL 加载，通过 iconSrc）
   * - 'roundedRect': 固定颜色的圆角矩形图标（不受选中影响）
   * - 'circle': 固定颜色的圆形图标（不受选中影响，标签用）
   * - 'coloredRect': 彩色圆角矩形背景 + 白色图标（macOS 系统设置风格）
   */
  iconType?: 'svg' | 'appIcon' | 'image' | 'roundedRect' | 'circle' | 'coloredRect';
  /** 
   * 内置图标名称（当 iconType 为 'svg' 或 undefined 时使用）
   * 如 'airdrop', 'recent', 'documents' 等
   */
  iconName?: BuiltinIconName;
  /** 
   * 图片图标 URL（当 iconType 为 'image' 时使用）
   * 可以是 macosicons.com 下载的图标，或其他图片链接
   */
  iconSrc?: string;
  /** 
   * 图标尺寸（当 iconType 为 'image' 时使用，默认 20px）
   */
  iconSize?: number;
  /** 
   * 圆角矩形图标颜色（当 iconType 为 'roundedRect' 或 'circle' 或 'coloredRect' 时使用）
   * 如 '#ff3b30' 表示红色圆角矩形
   */
  iconColor?: string;
}

/** 导航分组 */
export interface NavSection {
  id: string;
  title?: string;
  items: NavItem[];
  /** 选中时是否高亮显示（深色背景+蓝色文字） */
  highlightOnSelect?: boolean;
  /** 是否显示展开/收起图标，默认为 true */
  collapsible?: boolean;
  /** 默认展开状态，默认为 true。当 collapsible 为 false 时，始终展开 */
  defaultExpanded?: boolean;
}

/** iCloud 同步状态 */
export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';

/** 侧边栏配置 */
export interface SidebarConfig {
  /** 是否默认收起 */
  defaultCollapsed?: boolean;
  /** 是否显示收起按钮 */
  showToggle?: boolean;
  /** 自定义宽度（展开时） */
  width?: number;
  /** 收起后宽度 */
  collapsedWidth?: number;
}

/** 窗口控制按钮回调 */
export interface WindowControlCallbacks {
  /** 关闭按钮回调，不传则默认收起侧边栏 */
  onClose?: () => void;
  /** 最小化按钮回调，不传则默认收起侧边栏 */
  onMinimize?: () => void;
  /** 展开/最大化按钮回调，不传则默认展开侧边栏 */
  onExpand?: () => void;
}

/** 侧边栏 Props */
export interface SidebarProps {
  /** 导航分组数据 */
  sections: NavSection[];
  /** 当前激活项 ID */
  activeId: string;
  /** 选中回调 */
  onSelect: (id: string) => void;
  /** 配置项 */
  config?: SidebarConfig;
  /** 收起状态变化回调 */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** 自定义内容（底部） */
  footer?: ReactNode;
  /** 同步状态（iCloud 风格） */
  syncStatus?: SyncStatus;
  /** 用户信息 */
  user?: {
    name: string;
    avatar?: ReactNode;
  };
  /** 窗口控制按钮回调 */
  windowControls?: WindowControlCallbacks;
}

/** 侧边栏样式变体 */
export type SidebarVariant = 'finder' | 'minimal' | 'modern';

/** 侧边栏组件接口 */
export interface SidebarComponent {
  (props: SidebarProps): JSX.Element;
  /** 组件标识 */
  displayName: string;
  /** 支持的变体 */
  variants?: SidebarVariant[];
}
