'use client';

import { motion } from 'framer-motion';
import { Package, RefreshCcw, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const t = useTranslations('error');
  const router = useRouter();

  return (
    <div className="container relative mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center py-8">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative w-full max-w-lg rounded-xl border bg-card p-8 shadow-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Package className="h-10 w-10 text-primary" />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <h2 className="mb-2 text-2xl font-bold">{t('productNotFound.title')}</h2>
          <p className="mb-6 text-muted-foreground">{t('productNotFound.description')}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="default" className="gap-2" onClick={() => router.push('/products')}>
              <Search className="h-4 w-4" />
              {t('productNotFound.browseProducts')}
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => router.refresh()}>
              <RefreshCcw className="h-4 w-4" />
              {t('productNotFound.tryAgain')}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
