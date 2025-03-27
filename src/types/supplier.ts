export interface Supplier {
  id: string;
  name: string;
  code: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface SupplierProduct {
  id: string;
  supplierId: string;
  productId: string;
  productName: string;
  productCode: string;
  price: number;
  currency: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
} 