export interface Supplier {
  id: string;
  name: string;
  code: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  status: "active" | "inactive";
  logo: string;
  rating: number;
  totalOrders: number;
  totalProducts: number;
  responseRate: number;
  deliveryRate: number;
  qualityScore: number;
  mainCategories: string[];
  certifications: string[];
  establishedYear: string;
  website: string;
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
  status: "active" | "inactive";
  image: string;
  category: string;
  stock: number;
  sales: number;
  rating: string;
  createdAt: string;
  updatedAt: string;
} 