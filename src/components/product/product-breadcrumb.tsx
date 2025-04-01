'use client';

import { PricedProduct } from '@/types/product';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProductBreadcrumbProps {
  product: PricedProduct;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <nav className="mb-4 overflow-x-auto whitespace-nowrap sm:mb-8">
      <ol className="flex items-center space-x-1 text-xs sm:space-x-2 sm:text-sm">
        <li>
          <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
            首页
          </Link>
        </li>
        <li>
          <ChevronRight className="h-3 w-3 text-muted-foreground sm:h-4 sm:w-4" />
        </li>
        <li>
          <Link
            href="/products"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            商品库
          </Link>
        </li>
        <li>
          <ChevronRight className="h-3 w-3 text-muted-foreground sm:h-4 sm:w-4" />
        </li>
        <li>
          <span className="font-medium text-foreground">
            {product.title!.slice(0, 30)}
            {product.title!.length > 30 ? '...' : ''}
          </span>
        </li>
      </ol>
    </nav>
  );
}
