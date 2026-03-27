import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 检查是否是占位符配置
const isMockConfig = supabaseUrl.includes('placeholder') || !supabaseUrl.startsWith('https://');

// 创建 Supabase 客户端
export const supabase = createClient<Database>(
  isMockConfig ? 'https://placeholder.supabase.co' : supabaseUrl,
  isMockConfig ? 'placeholder-key' : supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        'X-Client-Info': 'songguo-tools-pro',
      },
    },
  }
);

// 服务端客户端（需要 service_role key）
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  if (!serviceRoleKey || serviceRoleKey.includes('placeholder')) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY 未配置');
  }

  return createClient<Database>(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// 工具数据访问层
export const toolsApi = {
  // 获取所有工具（带筛选）
  async getAll({ 
    category, 
    priceType, 
    search,
    limit = 100 
  }: { 
    category?: string;
    priceType?: string;
    search?: string;
    limit?: number;
  } = {}) {
    let query = supabase
      .from('tools')
      .select('*, categories(name, slug, icon)')
      .eq('status', 'published')
      .limit(limit);

    if (category) {
      query = query.eq('category_id', category);
    }

    if (priceType) {
      query = query.eq('price_type', priceType);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,short_desc.ilike.%${search}%`);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  },

  // 获取单个工具
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('tools')
      .select('*, categories(name, slug, icon)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  // 增加访问量
  async incrementViews(toolId: string) {
    const { error } = await supabase.rpc('increment_tool_views', {
      p_tool_id: toolId,
    });

    if (error) throw error;
  },

  // 获取热门工具
  async getPopular(limit = 10) {
    const { data, error } = await supabase
      .from('tools')
      .select('*, categories(name, slug, icon)')
      .eq('status', 'published')
      .order('views', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // 获取最新工具
  async getLatest(limit = 10) {
    const { data, error } = await supabase
      .from('tools')
      .select('*, categories(name, slug, icon)')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },
};

// 分类数据访问层
export const categoriesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },
};

// 用户数据访问层
export const usersApi = {
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },
};

// 收藏数据访问层
export const favoritesApi = {
  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('tool_id, tools(name, slug, short_desc, logo_url, rating, views)')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  async add(toolId: string, userId: string) {
    const { error } = await supabase
      .from('favorites')
      .insert({ tool_id: toolId, user_id: userId });

    if (error) throw error;
  },

  async remove(toolId: string, userId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('tool_id', toolId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  async isFavorite(toolId: string, userId: string) {
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('tool_id', toolId)
      .eq('user_id', userId)
      .single();

    return !!data;
  },
};

// 投稿数据访问层
export const submissionsApi = {
  async create(data: {
    tool_name: string;
    tool_url: string;
    category?: string;
    description?: string;
    submitter_name?: string;
    submitter_email: string;
  }) {
    const { error } = await supabase
      .from('submissions')
      .insert(data);

    if (error) throw error;
  },
};

// 检查是否使用模拟数据
export const useMockData = () => isMockConfig;

// Slug 生成工具
function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

// 模拟数据回退（当 Supabase 未配置时）
export const getMockTools = async () => {
  const { toolsDatabase } = await import('@/data/tools-database');
  const published = toolsDatabase.filter(t => t.status === 'published');
  // 为每个工具添加默认字段
  return published.map(tool => ({
    ...tool,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};

export const getMockCategories = async () => {
  return [
    { id: '1', name: 'AI 工具', slug: 'ai-tools', icon: '🤖', sort_order: 1 },
    { id: '2', name: 'AI 设计', slug: 'ai-design', icon: '🎨', sort_order: 2 },
    { id: '3', name: 'AI 视频', slug: 'ai-video', icon: '🎬', sort_order: 3 },
    { id: '4', name: 'AI 音乐', slug: 'ai-music', icon: '🎵', sort_order: 4 },
    { id: '5', name: '效率办公', slug: 'productivity', icon: '💼', sort_order: 5 },
    { id: '6', name: '影视资源', slug: 'media', icon: '🎥', sort_order: 6 },
    { id: '7', name: '在线音乐', slug: 'music', icon: '🎧', sort_order: 7 },
    { id: '8', name: '实用工具', slug: 'utilities', icon: '🛠️', sort_order: 8 },
    { id: '9', name: '小程序', slug: 'mini-programs', icon: '📱', sort_order: 9 },
  ];
};
