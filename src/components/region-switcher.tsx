"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useCart, useRegions } from "medusa-react";

export const RegionSwitcher = () => {
  const { regions, isLoading } = useRegions();
  const { cart, updateCart } = useCart();

  const handleRegionChange = async (regionId: string) => {
    if (cart?.id) {
      await updateCart.mutateAsync({
        region_id: regionId,
      });
    }
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="relative h-8 w-8">
        <Globe className="h-4 w-4 animate-pulse" />
        <span className="sr-only">加载中...</span>
      </Button>
    );
  }

  const currentRegion = regions?.find(
    (region) => region.id === cart?.region_id
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Globe className="h-4 w-4" />
          <span className="sr-only">切换区域</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {regions?.map((region) => (
          <DropdownMenuItem
            key={region.id}
            onClick={() => handleRegionChange(region.id)}
            className={currentRegion?.id === region.id ? "bg-accent" : ""}
          >
            <div className="flex items-center justify-between w-full">
              <span>{region.name}</span>
              <span className="text-muted-foreground">
                {region.currency_code}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
