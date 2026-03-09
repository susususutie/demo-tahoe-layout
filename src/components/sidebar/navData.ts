import type { NavSection } from './types';

/**
 * 默认导航数据 - 访达风格分组
 */
export const getDefaultNavSections = (): NavSection[] => [
  // 应用程序分组：不显示标题和展开图标
  {
    id: 'apps',
    // title 不传，不显示分组标题和展开按钮
    items: [
      // 使用 appIcon 类型：内置应用图标（通过 iconName 匹配 /icons/ 目录下的文件）
      { id: 'finder', label: 'Finder', iconType: 'appIcon', iconName: 'finder', activeColor: 'macos' },
      { id: 'clock', label: '时钟', iconType: 'appIcon', iconName: 'clock', activeColor: 'macos' },
      { id: 'textedit', label: '文本编辑', iconType: 'appIcon', iconName: 'textedit', activeColor: 'macos' },
    ],
  },
  {
    id: 'favorites',
    title: '个人收藏',
    items: [
      // 所有菜单选中时文字都变为 macOS 蓝色，使用 Lucide 图标
      { id: 'recent', iconName: 'recent', label: '最近使用', activeColor: 'macos' },
      { id: 'applications', iconName: 'applications', label: '应用程序', activeColor: 'macos' },
      { id: 'desktop', iconName: 'desktop', label: '桌面', badge: 3, activeColor: 'macos' },
      { id: 'documents', iconName: 'documents', label: '文稿', activeColor: 'macos' },
      { id: 'downloads', iconName: 'downloads', label: '下载', activeColor: 'macos' },
      { id: 'image', iconName: 'image', label: '图片', activeColor: 'macos' },
      { id: 'music', iconName: 'music', label: '音乐', activeColor: 'macos' },
      { id: 'video', iconName: 'video', label: '视频', activeColor: 'macos' },
    ],
  },
  {
    id: 'tools',
    title: '工具',
    items: [
      { id: 'search', iconName: 'search', label: '搜索', activeColor: 'macos' },
      { id: 'settings', iconName: 'settings', label: '设置', activeColor: 'macos' },
      { id: 'share', iconName: 'share', label: '共享', activeColor: 'macos' },
      { id: 'trash', iconName: 'trash', label: '废纸篓', activeColor: 'macos' },
    ],
  },
  // 快捷方式分组：正常显示标题和展开按钮
  {
    id: 'shortcuts',
    title: '快捷方式',
    items: [
      { id: 'star', iconName: 'star', label: '收藏', activeColor: 'macos' },
      { id: 'heart', iconName: 'heart', label: '喜欢', activeColor: 'macos' },
      { id: 'bell', iconName: 'bell', label: '通知', activeColor: 'macos' },
      { id: 'user', iconName: 'user', label: '用户', activeColor: 'macos' },
    ],
  },
  {
    id: 'tags',
    title: '标签',
    items: [
      // 使用 circle 类型的圆形图标（固定颜色，标签用）
      { id: 'tag-red', label: '红色', iconType: 'circle', iconColor: '#ff3b30', activeColor: '#ff3b30' },
      { id: 'tag-orange', label: '工作', iconType: 'circle', iconColor: '#ff9500', activeColor: '#ff9500' },
      { id: 'tag-yellow', label: '黄色', iconType: 'circle', iconColor: '#ffcc00', activeColor: '#ffcc00' },
      { id: 'tag-green', label: '已完成', iconType: 'circle', iconColor: '#34c759', activeColor: '#34c759' },
      { id: 'tag-blue', label: '个人', iconType: 'circle', iconColor: '#007aff', activeColor: '#007aff' },
      { id: 'tag-purple', label: '紫色', iconType: 'circle', iconColor: '#af52de', activeColor: '#af52de' },
    ],
  },
];
