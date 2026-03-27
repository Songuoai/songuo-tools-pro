// Supabase 数据库类型定义

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// 分类
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// 工具
export interface Tool {
  id: string;
  name: string;
  slug: string;
  url: string;
  category_id: string;
  price_type: string;
  price_url?: string | null;
  short_desc: string;
  description: string;
  features?: string[] | null;
  logo_url?: string | null;
  screenshots?: string[] | null;
  tags?: string[] | null;
  status: string;
  views: number;
  rating: number;
  created_at: string;
  updated_at: string;
  
  // 关联数据
  categories?: Category;
}

// 用户
export interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// 收藏
export interface Favorite {
  id: string;
  user_id: string;
  tool_id: string;
  created_at: string;
  
  // 关联数据
  tools?: Tool;
}

// 评论
export interface Comment {
  id: string;
  tool_id: string;
  user_id: string;
  content: string;
  rating?: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  
  // 关联数据
  tools?: Tool;
  users?: User;
}

// 投稿
export interface Submission {
  id: string;
  tool_name: string;
  tool_url: string;
  category?: string | null;
  description?: string | null;
  submitter_name?: string | null;
  submitter_email: string;
  status: string;
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
}

// 专题
export interface Topic {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  cover_image?: string | null;
  tool_ids?: string[] | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// 访问统计
export interface Analytics {
  id: string;
  event_type: string;
  tool_id?: string | null;
  user_id?: string | null;
  metadata?: Json | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
}

// 管理员
export interface Admin {
  id: string;
  user_id: string;
  permissions?: string[] | null;
  created_at: string;
}

// 工具访问记录
export interface ToolView {
  id: string;
  tool_id: string;
  user_id?: string | null;
  ip_address?: string | null;
  created_at: string;
}

// 工具评分
export interface ToolRating {
  id: string;
  tool_id: string;
  user_id: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

// Database 类型（用于 Supabase 客户端）
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      tools: {
        Row: Tool;
        Insert: Omit<Tool, 'id' | 'created_at' | 'updated_at' | 'views' | 'rating'>;
        Update: Partial<Omit<Tool, 'id' | 'created_at' | 'updated_at'>>;
      };
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      favorites: {
        Row: Favorite;
        Insert: Omit<Favorite, 'id' | 'created_at'>;
        Update: Partial<Omit<Favorite, 'id' | 'created_at'>>;
      };
      comments: {
        Row: Comment;
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Comment, 'id' | 'created_at' | 'updated_at'>>;
      };
      submissions: {
        Row: Submission;
        Insert: Omit<Submission, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Submission, 'id' | 'created_at' | 'updated_at'>>;
      };
      topics: {
        Row: Topic;
        Insert: Omit<Topic, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Topic, 'id' | 'created_at' | 'updated_at'>>;
      };
      analytics: {
        Row: Analytics;
        Insert: Omit<Analytics, 'id' | 'created_at'>;
        Update: Partial<Omit<Analytics, 'id' | 'created_at'>>;
      };
      admins: {
        Row: Admin;
        Insert: Omit<Admin, 'id' | 'created_at'>;
        Update: Partial<Omit<Admin, 'id' | 'created_at'>>;
      };
      tool_views: {
        Row: ToolView;
        Insert: Omit<ToolView, 'id' | 'created_at'>;
        Update: Partial<Omit<ToolView, 'id' | 'created_at'>>;
      };
      tool_ratings: {
        Row: ToolRating;
        Insert: Omit<ToolRating, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ToolRating, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: {};
    Functions: {
      increment_tool_views: {
        Args: { p_tool_id: string };
        Returns: undefined;
      };
    };
    Enums: {};
  };
}

// API 响应类型
export interface ToolsResponse {
  data: Tool[] | null;
  error: Error | null;
  count?: number;
}

export interface ToolResponse {
  data: Tool | null;
  error: Error | null;
}

export interface CategoriesResponse {
  data: Category[] | null;
  error: Error | null;
}

// 筛选参数
export interface ToolFilters {
  category?: string;
  priceType?: string;
  search?: string;
  sort?: 'popular' | 'latest' | 'rating';
  limit?: number;
  offset?: number;
}

// 分页参数
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
