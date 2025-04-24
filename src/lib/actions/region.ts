import { Region } from '@medusajs/medusa';

import medusaClient from '../medusa';

export async function getRegion(locale: string): Promise<Region | null> {
  const { regions } = await medusaClient.regions.list();
  return regions.find(region => region.metadata?.locale === locale) || null;
}

export async function listRegions(): Promise<Region[]> {
  const { regions } = await medusaClient.regions.list();
  return regions;
}
