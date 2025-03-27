"use client";

import { Product } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelectionStore } from "@/store/selection";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  FileText,
  ShoppingCart,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";

export default function SelectedProductsPage() {
  const { products, removeProduct, clearProducts } = useSelectionStore();

  const totalProfit = products.reduce(
    (sum: number, product: Product) =>
      sum + product.price * (product.profitMargin / 100),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">选品列表</h1>
          <p className="text-muted-foreground mt-2">
            管理您已选择的商品，快速导出或同步到店铺
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            导入选品
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出列表
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            生成报告
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm text-muted-foreground">已选商品</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowRight className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ${totalProfit.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">预计利润</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {products.length > 0 ? (
          <motion.div
            key="product-table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>商品列表</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>商品信息</TableHead>
                      <TableHead>供应商</TableHead>
                      <TableHead>采购价</TableHead>
                      <TableHead>建议售价</TableHead>
                      <TableHead>利润率</TableHead>
                      <TableHead>同步状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-lg overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/products/${product.id}`}
                                className="font-medium hover:text-primary"
                              >
                                {product.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img
                                src={product.supplier.logo}
                                alt={product.supplier.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span>{product.supplier.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          $
                          {typeof product.price === "number"
                            ? product.price.toFixed(2)
                            : "0.00"}
                        </TableCell>
                        <TableCell>
                          ¥
                          {typeof product.suggestedPrice === "number"
                            ? product.suggestedPrice.toFixed(2)
                            : "0.00"}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-primary text-white">
                            {product.profitMargin}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">
                            <Check className="h-3 w-3 mr-1" />
                            已同步
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                window.open(product.shopUrl, "_blank")
                              }
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              查看店铺
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeProduct(product.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={clearProducts}>
                  清空列表
                </Button>
                <Button size="sm">同步到店铺</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="py-16">
              <CardContent className="flex flex-col items-center text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">暂无选品</h3>
                <p className="text-muted-foreground mb-4">
                  您还没有添加任何商品到选品列表
                </p>
                <Button asChild>
                  <Link href="/">开始选品</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
