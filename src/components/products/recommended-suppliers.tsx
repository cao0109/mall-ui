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
    <div className="rounded-lg border bg-gradient-to-br from-card to-muted/5 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-primary"
        >
          查看全部
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {suppliers.map(supplier => (
          <div
            key={supplier.id}
            className="group relative flex flex-col items-center rounded-lg border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-muted-foreground/10 transition-colors group-hover:border-primary/30">
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
                  <span className="text-lg font-bold text-muted-foreground">
                    {supplier.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <h3 className="text-center text-sm font-medium">{supplier.name}</h3>
            <div className="mt-1 flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium">{supplier.rating}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              查看产品
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
