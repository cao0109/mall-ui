import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ProductDetail } from '@/components/product/product-detail';
import { getProduct, listProducts } from '@/lib/actions/product';
import { listRegions } from '@/lib/actions/region';

import Loading from './loading';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const regions = await listRegions();
  if (!regions) return [];

  const products = await Promise.all(
    regions.map(region => listProducts({ region_id: region.id }))
  ).then(responses => responses.flat());

  const staticParams = regions
    .map(region =>
      products.map(product => ({
        locale: region.metadata?.locale || 'zh',
        id: product.id,
      }))
    )
    .flat();

  return staticParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let product = null;
  try {
    product = await getProduct(id);
  } catch (error) {
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  return {
    title: `${product.title} | HiDoo`,
    description: product.description || product.title,
    openGraph: {
      title: `${product.title} | HiDoo`,
      description: product.description || product.title,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;

  let product = null;
  try {
    product = await getProduct(resolvedParams.id);
  } catch (error) {
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail product={product} />
    </Suspense>
  );
}
