import medusaClient from '../medusa';

export async function getProduct(id: string) {
  const { product } = await medusaClient.products.retrieve(id);
  return product;
}

export async function listProducts({
  region_id,
  limit,
  offset,
}: {
  region_id?: string;
  limit?: number;
  offset?: number;
}) {
  const { products } = await medusaClient.products.list({
    region_id,
    limit,
    offset,
  });
  return products;
}
