'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useCart, useRegions } from 'medusa-react';
import { useTranslations } from 'next-intl';

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.2,
    },
  }),
};

export const RegionSwitcher = () => {
  const { regions, isLoading } = useRegions();
  const { cart, updateCart } = useCart();
  const t = useTranslations();

  const handleRegionChange = async (regionId: string) => {
    if (cart?.id) {
      await updateCart.mutateAsync({
        region_id: regionId,
      });
    }
  };

  if (isLoading) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="group relative h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-accent/50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Globe className="h-4 w-4" />
        </motion.div>
        <span className="sr-only">{t('common.loading')}</span>
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/20"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Button>
    );
  }

  const currentRegion = regions?.find(region => region.id === cart?.region_id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group relative h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-accent/50"
        >
          <Globe className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          <span className="sr-only">{t('region.switch')}</span>
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
        className="w-[250px] overflow-hidden rounded-lg border bg-background/95 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="mb-2 px-2 py-1.5 text-sm font-medium text-muted-foreground">
          {t('region.selectRegion')}
        </div>
        <div className="space-y-1">
          <AnimatePresence>
            {regions?.map((region, index) => (
              <motion.div
                key={region.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: 20 }}
              >
                <DropdownMenuItem
                  onClick={() => handleRegionChange(region.id)}
                  className={cn(
                    'group relative flex cursor-pointer items-center justify-between rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50',
                    currentRegion?.id === region.id && 'bg-accent text-accent-foreground'
                  )}
                >
                  <motion.div
                    className="absolute inset-0 rounded-md bg-accent/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="relative flex flex-col">
                    <span className="font-medium">{region.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {region.countries?.map(country => country.display_name).join(', ')}
                    </span>
                  </div>
                  <div className="relative flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {region.currency_code}
                    </span>
                    {currentRegion?.id === region.id && (
                      <motion.div
                        className="text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        ✓
                      </motion.div>
                    )}
                  </div>
                </DropdownMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
