'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳', description: '简体中文' },
  { code: 'en', name: 'English', flag: '🇺🇸', description: 'English' },
];

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

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group relative h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-accent/50"
        >
          <Languages className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          <span className="sr-only">切换语言</span>
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
      >
        <div className="mb-2 px-2 py-1.5 text-sm font-medium text-muted-foreground">选择语言</div>
        <div className="space-y-1">
          <AnimatePresence>
            {languages.map((lang, index) => (
              <motion.div
                key={lang.code}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
              >
                <DropdownMenuItem
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    'group relative flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50',
                    locale === lang.code && 'bg-accent text-accent-foreground'
                  )}
                  disabled={isPending}
                >
                  <motion.div
                    className="absolute inset-0 rounded-md bg-accent/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="relative text-xl">{lang.flag}</span>
                  <div className="relative flex flex-col">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.description}</span>
                  </div>
                  {locale === lang.code && (
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
            ))}
          </AnimatePresence>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
