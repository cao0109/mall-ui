import medusaClient from '../medusa';

export async function getProductCategories() {
  const { product_categories } = await medusaClient.productCategories.list();
  return product_categories;
}

export async function getProductCategory(id: string) {
  const { product_category } = await medusaClient.productCategories.retrieve(id);
  return product_category;
}

export async function listProductCategories({
  limit,
  offset,
  parent_category_id,
  expand,
}: {
  limit?: number;
  offset?: number;
  parent_category_id?: string;
  expand?: string;
}) {
  const { product_categories } = await medusaClient.productCategories.list({
    limit,
    offset,
    parent_category_id,
    expand,
  });
  return product_categories;
}

export async function getProductCategoryById(id: string) {
  const { product_category } = await medusaClient.productCategories.retrieve(id);
  return product_category;
}
