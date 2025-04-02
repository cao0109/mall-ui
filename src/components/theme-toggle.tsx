import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.2,
    },
  }),
};

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="group relative h-8 w-8 rounded-full transition-all duration-300 hover:scale-110 hover:bg-accent/50"
        aria-label={t('common.loading')}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Sun className="h-4 w-4" aria-hidden="true" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/20"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="group relative h-8 w-8 rounded-full transition-all duration-300 hover:scale-110 hover:bg-accent/50"
          aria-label={t('theme.currentTheme', {
            theme:
              theme === 'dark'
                ? t('theme.dark')
                : theme === 'light'
                  ? t('theme.light')
                  : t('theme.system'),
          })}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -180, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? (
                <Moon className="h-4 w-4" aria-hidden="true" />
              ) : theme === 'light' ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Monitor className="h-4 w-4" aria-hidden="true" />
              )}
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/20"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] overflow-hidden rounded-lg border bg-background/95 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="menu"
        aria-label={t('theme.selectTheme')}
      >
        <div className="mb-2 px-2 py-1.5 text-sm font-medium text-muted-foreground">
          {t('theme.selectTheme')}
        </div>
        <div className="space-y-1">
          <AnimatePresence>
            <motion.div
              key="light"
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
            >
              <DropdownMenuItem
                onClick={() => setTheme('light')}
                role="menuitem"
                className={cn(
                  'group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50',
                  theme === 'light' && 'bg-accent text-accent-foreground'
                )}
              >
                <motion.div
                  className="absolute inset-0 rounded-md bg-accent/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <Sun className="relative h-4 w-4" aria-hidden="true" />
                <span className="relative font-medium">{t('theme.light')}</span>
                {theme === 'light' && (
                  <motion.div
                    className="absolute right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <Check className="h-4 w-4" color="green" />
                  </motion.div>
                )}
              </DropdownMenuItem>
            </motion.div>
            <motion.div
              key="dark"
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
            >
              <DropdownMenuItem
                onClick={() => setTheme('dark')}
                role="menuitem"
                className={cn(
                  'group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50',
                  theme === 'dark' && 'bg-accent text-accent-foreground'
                )}
              >
                <motion.div
                  className="absolute inset-0 rounded-md bg-accent/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <Moon className="relative h-4 w-4" aria-hidden="true" />
                <span className="relative font-medium">{t('theme.dark')}</span>
                {theme === 'dark' && (
                  <motion.div
                    className="absolute right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    ✓
                  </motion.div>
                )}
              </DropdownMenuItem>
            </motion.div>
            <motion.div
              key="system"
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
            >
              <DropdownMenuItem
                onClick={() => setTheme('system')}
                role="menuitem"
                className={cn(
                  'group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50',
                  theme === 'system' && 'bg-accent text-accent-foreground'
                )}
              >
                <motion.div
                  className="absolute inset-0 rounded-md bg-accent/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <Monitor className="relative h-4 w-4" aria-hidden="true" />
                <span className="relative font-medium">{t('theme.system')}</span>
                {theme === 'system' && (
                  <motion.div
                    className="absolute right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    ✓
                  </motion.div>
                )}
              </DropdownMenuItem>
            </motion.div>
          </AnimatePresence>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
