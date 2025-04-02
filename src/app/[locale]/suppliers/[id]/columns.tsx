'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { SupplierProduct } from '@/types/supplier';

export const columns: ColumnDef<SupplierProduct>[] = [
  {
    accessorKey: 'productCode',
    header: '产品代码',
  },
  {
    accessorKey: 'productName',
    header: '产品名称',
  },
  {
    accessorKey: 'price',
    header: '价格',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const currency = row.original.currency;
      const formatted = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency,
      }).format(price);

      return formatted;
    },
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {status === 'active' ? '启用' : '禁用'}
        </Badge>
      );
    },
  },
];
