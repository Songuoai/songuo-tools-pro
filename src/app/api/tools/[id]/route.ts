import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - 获取单个工具
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const toolId = params.id;

    // 查询工具（包含分类信息）
    const { data, error } = await supabase
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
      .eq('id', toolId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ 
          error: '工具未找到' 
        }, { status: 404 });
      }
      console.error('查询工具失败:', error);
      return NextResponse.json({ 
        error: '查询失败',
        details: error.message 
      }, { status: 500 });
    }

    // 转换数据格式
    const tool = {
      id: (data as any).id,
      name: (data as any).name,
      slug: (data as any).slug,
      url: (data as any).url,
      logoUrl: (data as any).logo_url,
      category: (data as any).categories?.name || '未分类',
      categoryId: (data as any).category_id,
      priceType: (data as any).price_type,
      priceUrl: (data as any).price_url,
      shortDesc: (data as any).short_desc,
      description: (data as any).description,
      features: (data as any).features || [],
      tags: (data as any).tags || [],
      screenshots: (data as any).screenshots || [],
      status: (data as any).status,
      views: (data as any).views || 0,
      rating: Number((data as any).rating) || 0,
      createdAt: (data as any).created_at,
      updatedAt: (data as any).updated_at,
    };

    return NextResponse.json({ tool });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ 
      error: '服务器错误',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

// PUT - 更新工具
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const toolId = params.id;
    const body = await request.json();

    // 检查工具是否存在
    const { data: existing } = await supabase
      .from('tools')
      .select('id')
      .eq('id', toolId)
      .single();

    if (!existing) {
      return NextResponse.json({ 
        error: '工具未找到' 
      }, { status: 404 });
    }

    // 如果要更新 slug，检查是否冲突
    if (body.slug) {
      const { data: slugConflict } = await supabase
        .from('tools')
        .select('id')
        .eq('slug', body.slug)
        .neq('id', toolId)
        .single();

      if (slugConflict) {
        return NextResponse.json({ 
          error: 'slug 已存在',
          suggestion: body.slug + '-' + Date.now()
        }, { status: 409 });
      }
    }

    // 构建更新数据（只更新提供的字段）
    const updateData: Record<string, any> = {};
    const allowedFields = [
      'name', 'slug', 'url', 'category_id', 'price_type', 'price_url',
      'short_desc', 'description', 'features', 'logo_url', 'screenshots',
      'tags', 'status', 'views', 'rating'
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // 执行更新
    const { data, error } = await supabase
      .from('tools')
      .update(updateData as any)
      .eq('id', toolId)
      .select()
      .single();

    if (error) {
      console.error('更新工具失败:', error);
      return NextResponse.json({ 
        error: '更新工具失败',
        details: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      tool: {
        id: data.id,
        name: data.name,
        slug: data.slug,
        status: data.status,
        updatedAt: data.updated_at,
      }
    });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ 
      error: '服务器错误',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

// DELETE - 删除工具
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const toolId = params.id;

    // 检查工具是否存在
    const { data: existing } = await supabase
      .from('tools')
      .select('id')
      .eq('id', toolId)
      .single();

    if (!existing) {
      return NextResponse.json({ 
        error: '工具未找到' 
      }, { status: 404 });
    }

    // 执行删除
    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', toolId);

    if (error) {
      console.error('删除工具失败:', error);
      return NextResponse.json({ 
        error: '删除工具失败',
        details: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: '工具已删除'
    });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ 
      error: '服务器错误',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}
