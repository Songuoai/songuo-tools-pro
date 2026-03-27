/**
 * 松果工具箱 Pro - 统一设计系统
 * 国际大师级美学标准
 */

// ===================================
// 分类图标映射 - 精选 Emoji
// ===================================
export const categoryIcons: Record<string, string> = {
  'AI 工具': '🤖',
  'AI 设计': '🎨',
  'AI 视频': '🎬',
  'AI 音乐': '🎵',
  '效率办公': '💼',
  '影视资源': '🎥',
  '在线音乐': '🎧',
  '实用工具': '🛠️',
  '小程序': '📱',
  '开发编程': '💻',
};

// ===================================
// 分类渐变色 - 高级配色
// 灵感来源：Tailwind UI, Stripe, Vercel
// ===================================
export const categoryGradients: Record<string, string> = {
  'AI 工具': 'from-violet-500 to-purple-600',      // 紫罗兰 - 智能感
  'AI 设计': 'from-rose-500 to-pink-600',          // 玫瑰粉 - 创意感
  'AI 视频': 'from-blue-500 to-cyan-600',          // 蓝青 - 科技感
  'AI 音乐': 'from-emerald-500 to-teal-600',       // 翠绿 - 律动感
  '效率办公': 'from-sky-500 to-blue-600',          // 天空蓝 - 专业感
  '影视资源': 'from-orange-500 to-red-600',        // 橙红 - 娱乐感
  '在线音乐': 'from-fuchsia-500 to-pink-600',      // 紫红 - 艺术感
  '实用工具': 'from-amber-500 to-orange-600',      // 琥珀 - 实用感
  '开发编程': 'from-green-500 to-emerald-600',     // 绿 - 极客感
  '小程序': 'from-indigo-500 to-violet-600',       // 靛蓝 - 轻量感
};

// ===================================
// 价格标签 - 清晰直观
// ===================================
export const priceLabels: Record<string, string> = {
  free: '🆓 免费',
  freemium: '🎁 免费额度',
  paid: '💰 付费',
  'limited-free': '⏰ 限时免费',
  trial: '🧪 试用',
  contact: '📞 询价',
};

// ===================================
// 主色调系统 - 温暖活力橙
// ===================================
export const colors = {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
};

// ===================================
// 阴影系统 - 5 层深度
// ===================================
export const shadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  glow: '0 0 40px rgb(249 115 22 / 0.3)',
};

// ===================================
// 圆角系统
// ===================================
export const radius = {
  sm: '0.375rem',    // 6px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.5rem',   // 24px
  full: '9999px',
};

// ===================================
// 动画曲线 - 高级缓动
// ===================================
export const easing = {
  'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
  'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// ===================================
// 过渡时间
// ===================================
export const duration = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
};

// ===================================
// 字间距
// ===================================
export const tracking = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
};

// ===================================
// 行高
// ===================================
export const leading = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
};
