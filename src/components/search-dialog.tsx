'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Command, History, Search, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function SearchDialog() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const t = useTranslations();

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 保存搜索历史
  const saveSearchHistory = (query: string) => {
    if (!query.trim()) return;
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // 处理搜索
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    saveSearchHistory(query);
    // TODO: 实现搜索功能
    setIsSearchOpen(false);
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen} aria-label={t('common.search')}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group relative hidden h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-accent/50 md:flex"
          aria-label={t('common.search')}
        >
          <Search
            className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/20"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="top-[20%] gap-0 overflow-hidden p-0 sm:max-w-[425px]"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex items-center border-b px-4 py-3"
        >
          <Search className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <DialogTitle className="text-base font-medium">{t('common.search')}</DialogTitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="p-4"
        >
          <div className="relative w-full">
            <label htmlFor="search-input" className="sr-only">
              {t('search.searchContent')}
            </label>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="relative"
            >
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
                placeholder={t('search.searchPlaceholder')}
                className="w-full rounded-lg border border-input bg-background/50 py-2 pl-10 pr-4 text-sm ring-offset-background backdrop-blur-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={t('search.searchInput')}
              />
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
                aria-hidden="true"
              />
            </motion.div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Command className="h-3 w-3" />
              <span>{t('search.search')}</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">esc</kbd>
              <span>{t('search.close')}</span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t"
            >
              {/* 搜索历史 */}
              {searchHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {t('search.searchHistory')}
                    </h3>
                    <button
                      onClick={clearSearchHistory}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t('search.clearHistory')}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    {searchHistory.map((term, index) => (
                      <motion.button
                        key={term}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSearchQuery(term);
                          handleSearch(term);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <History className="h-4 w-4" />
                        <span>{term}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 热门搜索 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="border-t p-4"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {t('search.hotSearches')}
                  </h3>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    t('search.newArrivals'),
                    t('search.hotProducts'),
                    t('search.specialOffers'),
                    t('search.limitedEdition'),
                  ].map((term, index) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSearchQuery(term);
                        handleSearch(term);
                      }}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* 实时搜索建议 */}
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="border-t p-4"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {t('search.suggestions')}
                    </h3>
                  </div>
                  <div className="mt-2 space-y-1">
                    {[
                      t('search.relatedProducts', { query: searchQuery }),
                      t('search.specialOffersFor', { query: searchQuery }),
                      t('search.newArrivalsFor', { query: searchQuery }),
                    ].map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          handleSearch(suggestion);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Search className="h-4 w-4" />
                        <span>{suggestion}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
