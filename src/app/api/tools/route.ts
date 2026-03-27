import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - 获取所有工具（支持筛选）
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const priceType = searchParams.get('priceType');
    const search = searchParams.get('search');
    const status = searchParams.get('status') || 'published';
    const limit = parseInt(searchParams.get('limit') || '100');

    // 构建查询
    let query = supabase
      .from('tools')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          icon
        )
      `)
      .eq('status', status)
      .limit(limit);

    // 分类筛选
    if (category) {
      query = query.eq('category_id', category);
    }

    // 价格类型筛选
    if (priceType) {
      query = query.eq('price_type', priceType);
    }

    // 搜索
    if (search) {
      query = query.or(`name.ilike.%${search}%,short_desc.ilike.%${search}%`);
    }

    // 执行查询
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('查询工具失败:', error);
      return NextResponse.json({ error: '查询失败', details: error.message }, { status: 500 });
    }

    // 转换数据格式（兼容旧格式）
    const tools = (data || []).map(tool => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      url: tool.url,
      logoUrl: tool.logo_url,
      category: tool.categories?.name || '未分类',
      categoryId: tool.category_id,
      priceType: tool.price_type,
      priceUrl: tool.price_url,
      shortDesc: tool.short_desc,
      description: tool.description,
      features: tool.features || [],
      tags: tool.tags || [],
      screenshots: tool.screenshots || [],
      status: tool.status,
      views: tool.views || 0,
      rating: Number(tool.rating) || 0,
      createdAt: tool.created_at,
      updatedAt: tool.updated_at,
    }));

    return NextResponse.json({ 
      tools,
      count: tools.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ 
      error: '服务器错误',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

// POST - 添加工具
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证必填字段
    const requiredFields = ['name', 'url', 'short_desc', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ 
          error: `缺少必填字段：${field}` 
        }, { status: 400 });
      }
    }

    // 生成 slug
    const slug = body.slug || generateSlug(body.name);

    // 检查 slug 是否已存在
    const { data: existing } = await supabase
      .from('tools')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json({ 
        error: '工具已存在（slug 冲突）',
        suggestion: generateSlug(body.name + '-' + Date.now())
      }, { status: 409 });
    }

    // 插入数据
    const { data, error } = await supabase
      .from('tools')
      .insert([{
        name: body.name,
        slug: slug,
        url: body.url,
        category_id: body.category_id || null,
        price_type: body.price_type || 'freemium',
        price_url: body.price_url,
        short_desc: body.short_desc,
        description: body.description,
        features: body.features || [],
        logo_url: body.logo_url,
        screenshots: body.screenshots || [],
        tags: body.tags || [],
        status: body.status || 'draft',
        views: body.views || 0,
        rating: body.rating || 0,
      }])
      .select()
      .single();

    if (error) {
      console.error('添加工具失败:', error);
      return NextResponse.json({ 
        error: '添加工具失败',
        details: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      tool: {
        id: data.id,
        name: data.name,
        slug: data.slug,
        url: data.url,
        category: data.category_id,
        priceType: data.price_type,
        shortDesc: data.short_desc,
        status: data.status,
        createdAt: data.created_at,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ 
      error: '服务器错误',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

// 生成 slug 的辅助函数
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
