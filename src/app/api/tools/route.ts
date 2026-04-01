import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

// GET - 获取所有工具
export async function GET(request: NextRequest) {
  try {
    // 从本地数据文件读取
    const dataPath = path.join(process.cwd(), 'data', 'tools.json');
    const fileData = readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(fileData);
    let tools = jsonData.tools || [];

    // 确保每个工具都有 slug
    tools = tools.map((tool: any) => ({
      ...tool,
      slug: tool.slug || generateSlug(tool.name)
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
    const requiredFields = ['name', 'url', 'shortDesc'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ 
          error: `缺少必填字段：${field}` 
        }, { status: 400 });
      }
    }

    // 生成 slug
    const slug = body.slug || generateSlug(body.name);

    // 读取现有数据
    const dataPath = path.join(process.cwd(), 'data', 'tools.json');
    const fileData = readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(fileData);
    const tools = jsonData.tools || [];

    // 检查 slug 是否已存在
    const existing = tools.find((t: any) => t.slug === slug);
    if (existing) {
      return NextResponse.json({ 
        error: '工具已存在（slug 冲突）'
      }, { status: 409 });
    }

    // 添加工具
    const newTool = {
      id: tools.length > 0 ? Math.max(...tools.map((t: any) => t.id)) + 1 : 1,
      name: body.name,
      slug: slug,
      url: body.url,
      category: body.category || '未分类',
      priceType: body.priceType || 'freemium',
      shortDesc: body.shortDesc,
      description: body.description || '',
      tags: body.tags || [],
      status: body.status || 'published',
      views: body.views || 0,
      rating: body.rating || 0,
    };

    tools.push(newTool);

    // 写回文件
    jsonData.tools = tools;
    const newData = JSON.stringify(jsonData, null, 2);
    // 注意：生产环境不应该直接写文件，这里仅用于开发

    return NextResponse.json({ 
      success: true,
      tool: newTool
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
