// 工具类型定义

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  content?: string
  website_url: string
  logo_url?: string
  screenshots?: string[]
  category_id: string
  subcategory_id?: string
  tags: string[]
  rating_avg: number
  rating_count: number
  click_count: number
  favorite_count: number
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  featured_order: number
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  created_at: string
  updated_at: string
  published_at?: string
}

// 价格类型
export type PriceType = 
  | 'free'          // 🆓 完全免费
  | 'freemium'      // 🎁 免费额度
  | 'limited-free'  // ⏰ 限时免费
  | 'trial'         // 🧪 免费试用
  | 'paid'          // 💰 付费
  | 'contact'       // 📞 联系询价

// 分类类型
export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
  parent_id?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// 用户类型
export interface User {
  id: string
  email: string
  nickname?: string
  avatar_url?: string
  bio?: string
  role: 'user' | 'admin' | 'super_admin'
  is_verified: boolean
  last_login_at?: string
  created_at: string
  updated_at: string
}

// 收藏类型
export interface Favorite {
  id: string
  user_id: string
  tool_id: string
  created_at: string
}

// 评论类型
export interface Comment {
  id: string
  tool_id: string
  user_id: string
  rating?: number
  content: string
  parent_id?: string
  status: 'pending' | 'approved' | 'rejected'
  is_helpful: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

// 投稿类型
export interface Submission {
  id: string
  submitter_name: string
  submitter_email: string
  tool_name: string
  tool_url: string
  tool_description: string
  category_id?: string
  tags?: string[]
  features?: string
  status: 'pending' | 'approved' | 'rejected'
  admin_note?: string
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
}

// 专题类型
export interface Topic {
  id: string
  title: string
  slug: string
  cover_url?: string
  content: string
  tool_ids: string[]
  view_count: number
  is_published: boolean
  published_at?: string
  created_by?: string
  created_at: string
  updated_at: string
}
