// Slug 生成工具

/**
 * 将工具名称转换为 slug
 * 例如："ChatGPT" -> "chatgpt"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .replace(/^-+|-+$/g, '');
}

/**
 * 为工具数据添加 slug 字段
 */
export function addSlugToTool(tool: any) {
  return {
    ...tool,
    slug: generateSlug(tool.name),
  };
}

/**
 * 为工具数组添加 slug 字段
 */
export function addSlugsToTools(tools: any[]) {
  return tools.map(tool => addSlugToTool(tool));
}
