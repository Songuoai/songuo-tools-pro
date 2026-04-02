import Link from 'next/link';

export function generateStaticParams() {
  return [{ slug: 'example' }];
}

export default function EditToolPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">后台管理功能</h1>
        <p className="text-gray-600 mb-6">此页面需要登录和数据库支持</p>
        <Link href="/admin/login" className="text-orange-600 hover:underline">
          前往登录
        </Link>
      </div>
    </div>
  );
}
