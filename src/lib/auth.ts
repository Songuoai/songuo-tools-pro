/**
 * 登录状态管理
 * 使用 localStorage 持久化存储登录状态
 */

// 存储键名
const STORAGE_KEY = 'songguo_user_session';

// 用户会话类型
export interface UserSession {
  userId: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number; // 过期时间戳
  rememberMe: boolean; // 是否记住我
}

/**
 * 保存登录状态
 */
export function saveSession(session: UserSession): void {
  try {
    if (session.rememberMe) {
      // 记住我：永久存储（除非手动清除）
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      // 不记住我：会话存储（关闭浏览器清除）
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  } catch (error) {
    console.error('保存登录状态失败:', error);
  }
}

/**
 * 获取登录状态
 */
export function getSession(): UserSession | null {
  try {
    // 先检查 localStorage
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      return JSON.parse(localData);
    }

    // 再检查 sessionStorage
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    if (sessionData) {
      return JSON.parse(sessionData);
    }

    return null;
  } catch (error) {
    console.error('获取登录状态失败:', error);
    return null;
  }
}

/**
 * 检查是否已登录
 */
export function isLoggedIn(): boolean {
  const session = getSession();
  if (!session) return false;

  // 检查是否过期
  if (session.expiresAt && Date.now() > session.expiresAt) {
    clearSession();
    return false;
  }

  return true;
}

/**
 * 清除登录状态（退出登录）
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('清除登录状态失败:', error);
  }
}

/**
 * 获取当前用户邮箱
 */
export function getCurrentUserEmail(): string | null {
  const session = getSession();
  return session?.email || null;
}

/**
 * 获取当前用户 ID
 */
export function getCurrentUserId(): string | null {
  const session = getSession();
  return session?.userId || null;
}
