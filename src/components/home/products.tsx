"use client";

import { SectionHeader } from "@/components/home/section-header";
import { ProductCard } from "@/components/product/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/lib/data";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Products() {
  const t = useTranslations();
  const [selectedTab, setSelectedTab] = useState("hot");

  return (
    <div className="space-y-6">
      <SectionHeader
        title={
          selectedTab === "hot"
            ? t("home.products.hot.title")
            : t("home.products.new.title")
        }
        subtitle={
          selectedTab === "hot"
            ? t("home.products.hot.subtitle")
            : t("home.products.new.subtitle")
        }
        action={{
          label: t("home.products.viewMore"),
          onClick: () => {},
        }}
      />

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="hot">{t("home.products.hot.title")}</TabsTrigger>
          <TabsTrigger value="new">{t("home.products.new.title")}</TabsTrigger>
        </TabsList>
        <TabsContent value="hot" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  name: t(
                    `home.products.items.${product.shopUrl
                      .split("/")
                      .pop()}.name`
                  ),
                  description: t(
                    `home.products.items.${product.shopUrl
                      .split("/")
                      .pop()}.description`
                  ),
                  price: parseFloat(
                    t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.price`
                    )
                  ),
                  profitMargin: parseInt(
                    t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.profitMargin`
                    )
                  ),
                  minOrder: parseInt(
                    t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.minOrder`
                    )
                  ),
                  shippingTime: t(
                    `home.products.items.${product.shopUrl
                      .split("/")
                      .pop()}.shippingTime`
                  ),
                  supplier: {
                    ...product.supplier,
                    name: t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.supplier`
                    ),
                    rating: parseFloat(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.rating`
                      )
                    ),
                  },
                  suggestedPrice: parseFloat(
                    t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.suggestedPrice`
                    )
                  ),
                }}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  name: t(
                    `home.products.items.${product.shopUrl
                      .split("/")
                      .pop()}.name`
                  ),
                  description: t(
                    `home.products.items.${product.shopUrl
                      .split("/")
                      .pop()}.description`
                  ),
                  price: parseFloat(
                    t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.price`
                    )
                  ),
                  profitMargin: parseInt(
                    t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.profitMargin`
                    )
                  ),
                  minOrder: parseInt(
                    t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.minOrder`
                    )
                  ),
                  shippingTime: t(
                    `home.products.items.${product.shopUrl
                      .split("/")
                      .pop()}.shippingTime`
                  ),
                  supplier: {
                    ...product.supplier,
                    name: t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.supplier`
                    ),
                    rating: parseFloat(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.rating`
                      )
                    ),
                  },
                  suggestedPrice: parseFloat(
                    t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.suggestedPrice`
                    )
                  ),
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
