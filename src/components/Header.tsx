'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings, Heart } from 'lucide-react';

const STORAGE_KEY = 'songguo_user_session';

interface Session {
  userId: string;
  email: string;
  name?: string;
  rememberMe: boolean;
}

function getSession(): Session | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('获取 session 失败:', error);
    return null;
  }
}

export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    checkLogin();
    
    // 监听存储变化
    const handleStorageChange = () => {
      checkLogin();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 定期检查登录状态（每 5 秒）
    const interval = setInterval(() => {
      checkLogin();
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  function checkLogin() {
    const session = getSession();
    if (session && session.userId) {
      setLoggedIn(true);
      setUserEmail(session.email || '');
      setUserName(session.name || session.email?.split('@')[0] || '用户');
      console.log('✅ 检查登录状态：已登录', session.email);
    } else {
      setLoggedIn(false);
      setUserEmail('');
      setUserName('');
      console.log('❌ 检查登录状态：未登录');
    }
  }

  function handleLogout() {
    if (confirm('确定要退出登录吗？')) {
      localStorage.removeItem(STORAGE_KEY);
      setLoggedIn(false);
      setUserEmail('');
      setUserName('');
      setShowDropdown(false);
      router.push('/');
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg group-hover:shadow-orange-500/30 transition-shadow"></div>
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🌰</span>
              </div>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              松果工具箱
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            {loggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 hidden sm:block">
                    {userName}
                  </span>
                </button>

                {showDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDropdown(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-900 font-medium">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userEmail}
                        </p>
                      </div>
                      
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User size={16} className="mr-2" />
                        个人中心
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} className="mr-2" />
                        退出登录
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
