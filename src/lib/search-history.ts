/**
 * 博客搜索历史管理
 */

const STORAGE_KEY = 'blog_search_history';
const MAX_HISTORY_ITEMS = 10;

/**
 * 获取搜索历史
 * @returns 搜索历史数组
 */
export function getBlogSearchHistory(): string[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('获取搜索历史失败:', error);
    return [];
  }
}

/**
 * 添加搜索历史
 * @param query 搜索关键词
 */
export function addBlogSearchHistory(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return;
  
  try {
    const history = getBlogSearchHistory();
    
    // 过滤重复项
    const newHistory = history.filter(item => item.toLowerCase() !== query.toLowerCase());
    
    // 添加到最前面
    newHistory.unshift(query);
    
    // 限制历史记录数量
    if (newHistory.length > MAX_HISTORY_ITEMS) {
      newHistory.pop();
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('保存搜索历史失败:', error);
  }
}

/**
 * 清除所有搜索历史
 */
export function clearBlogSearchHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('清除搜索历史失败:', error);
  }
}

/**
 * 删除指定搜索历史项
 * @param query 要删除的搜索关键词
 */
export function removeBlogSearchHistoryItem(query: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getBlogSearchHistory();
    const filteredHistory = history.filter(item => item !== query);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
  } catch (error) {
    console.error('删除搜索历史项失败:', error);
  }
} 