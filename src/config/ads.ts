// 百度联盟广告配置
// 符合百度联盟要求的广告位设计

export const adConfig = {
  // 首页广告位
  home: {
    // 顶部横幅（不影响导航）
    topBanner: {
      enabled: true,
      position: 'below-hero', // Hero 区域下方
      size: '728x90', // 标准横幅
      description: '首页顶部横幅广告',
    },
    // 列表页侧边栏
    sidebar: {
      enabled: true,
      position: 'tool-list-sidebar', // 列表页右侧
      size: '300x250', // 标准矩形
      description: '列表页侧边栏广告',
    },
    // 内容页底部
    contentBottom: {
      enabled: true,
      position: 'below-content', // 内容下方
      size: '728x90',
      description: '详情页底部广告',
    },
  },

  // 广告显示规则
  displayRules: {
    // 不遮挡主要内容
    neverOverlayContent: true,
    // 不影响用户操作
    neverBlockInteraction: true,
    // 广告与内容相关
    showRelevantAds: true,
    // 移动端自适应
    mobileResponsive: true,
  },

  // 广告加载策略
  loadingStrategy: {
    // 懒加载（提升性能）
    lazyLoad: true,
    // 优先加载内容
    contentFirst: true,
    // 异步加载
    async: true,
  },
}

// 广告位组件配置
export const adSlots = [
  {
    id: 'home-top',
    name: '首页顶部广告',
    page: 'home',
    position: 'below-hero',
    size: {
      desktop: '728x90',
      tablet: '468x60',
      mobile: '320x50',
    },
    priority: 1,
  },
  {
    id: 'list-sidebar',
    name: '列表页侧边栏广告',
    page: 'category',
    position: 'sidebar',
    size: {
      desktop: '300x250',
      tablet: '300x250',
      mobile: 'hidden', // 移动端隐藏
    },
    priority: 2,
  },
  {
    id: 'detail-bottom',
    name: '详情页底部广告',
    page: 'detail',
    position: 'below-content',
    size: {
      desktop: '728x90',
      tablet: '468x60',
      mobile: '320x50',
    },
    priority: 3,
  },
  {
    id: 'search-sidebar',
    name: '搜索页侧边栏广告',
    page: 'search',
    position: 'sidebar',
    size: {
      desktop: '300x250',
      tablet: '300x250',
      mobile: 'hidden',
    },
    priority: 4,
  },
]

// 百度联盟代码配置（上线时填写）
export const baiduUnionConfig = {
  // 网站 ID（上线后填写）
  siteId: '',
  // 广告单元 ID（上线后填写）
  adUnits: {
    'home-top': '',
    'list-sidebar': '',
    'detail-bottom': '',
    'search-sidebar': '',
  },
  // 广告样式
  style: {
    // 边框
    border: 'none',
    // 圆角
    borderRadius: '8px',
    // 阴影
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
}

// 广告位合规检查清单
export const complianceChecklist = [
  {
    item: '广告位是否明显标识',
    required: true,
    status: 'pending',
  },
  {
    item: '广告是否影响主要内容',
    required: true,
    status: 'pending',
  },
  {
    item: '广告是否遮挡用户操作',
    required: true,
    status: 'pending',
  },
  {
    item: '移动端广告是否适配',
    required: true,
    status: 'pending',
  },
  {
    item: '广告加载是否影响性能',
    required: true,
    status: 'pending',
  },
  {
    item: '广告内容是否合规',
    required: true,
    status: 'pending',
  },
  {
    item: '网站内容是否原创',
    required: true,
    status: 'pending',
  },
  {
    item: '网站是否有备案信息',
    required: true,
    status: 'completed', // ✅ 已有
  },
]

// 百度联盟申请建议
export const applicationTips = [
  '✅ 网站内容要丰富（200+ 工具）',
  '✅ 工具描述要原创（不抄袭）',
  '✅ 网站结构要清晰（分类明确）',
  '✅ 用户体验要好（加载快）',
  '✅ 移动端要适配（响应式）',
  '✅ 备案信息要完整（页脚展示）',
  '✅ 持续更新内容（保持活跃）',
  '✅ 广告位要合理（不影响体验）',
  '✅ 网站要合法合规（无违规内容）',
  '✅ 日访问量要达标（建议 100+ IP）',
]

// 广告收益预估
export const revenueEstimate = {
  // 基于行业平均水平
  dailyPageviews: 1000, // 日 PV
  adImpressions: 800, // 广告展示
  ctr: 0.02, // 点击率 2%
  cpc: 1.5, // 单次点击收益
  dailyRevenue: 24, // 日收益：800 * 0.02 * 1.5 = 24 元
  monthlyRevenue: 720, // 月收益：24 * 30 = 720 元
  yearlyRevenue: 8640, // 年收益：720 * 12 = 8640 元
  
  // 增长预期
  growth: {
    '3 个月': { pageviews: 3000, revenue: 2160 },
    '6 个月': { pageviews: 10000, revenue: 7200 },
    '12 个月': { pageviews: 30000, revenue: 21600 },
  },
}
