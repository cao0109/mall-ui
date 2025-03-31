'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';

interface Supplier {
  id: number | string;
  name: string;
  logo?: string;
  rating: number;
}

interface RecommendedSuppliersProps {
  suppliers: Supplier[];
  title?: string;
}

export function RecommendedSuppliers({
  suppliers,
  title = '推荐优质供应商',
}: RecommendedSuppliersProps) {
  return (
    <div className="rounded-lg border bg-gradient-to-br from-card to-muted/5 p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-primary"
        >
          查看全部
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {suppliers.map(supplier => (
          <div
            key={supplier.id}
            className="group relative flex flex-col items-center rounded-lg border bg-background p-3 transition-all hover:border-primary/50 hover:shadow-md sm:p-4"
          >
            <div className="relative mb-2 h-12 w-12 overflow-hidden rounded-full border-2 border-muted-foreground/10 transition-colors group-hover:border-primary/30 sm:mb-3 sm:h-16 sm:w-16">
              {supplier.logo ? (
                <Image
                  src={supplier.logo}
                  alt={supplier.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <span className="text-base font-bold text-muted-foreground sm:text-lg">
                    {supplier.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <h3 className="text-center text-xs font-medium sm:text-sm">{supplier.name}</h3>
            <div className="mt-1 flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium">{supplier.rating}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full text-xs transition-colors hover:bg-primary hover:text-primary-foreground sm:mt-3"
            >
              查看产品
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
