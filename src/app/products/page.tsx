import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4">
        {/* 搜索和筛选区 */}
        <div className="flex items-center gap-4">
          <Input placeholder="搜索商品名称、SKU..." className="max-w-sm" />
          <Select>
            <option value="">所有分类</option>
            {/* 待补充分类选项 */}
          </Select>
          <Select>
            <option value="">所有供应商</option>
            {/* 待补充供应商选项 */}
          </Select>
          <Button>搜索</Button>
        </div>

        {/* 商品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 示例商品卡片 */}
          <Card className="p-4">
            <div className="aspect-square relative mb-2">
              <img
                src="/placeholder.png"
                alt="商品图片"
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold truncate">商品名称</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-red-500 font-bold">¥ 199.00</span>
              <Button size="sm">同步商品</Button>
            </div>
          </Card>
        </div>

        {/* 分页 */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
