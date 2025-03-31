'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useProductCategories } from 'medusa-react';
import { useEffect, useState } from 'react';
import { CategorySkeleton } from './category-skeleton';

interface MedusaCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export function MedusaCategories({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchQueryChange,
}: MedusaCategoriesProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const { count: allProductCategoriesCount } = useProductCategories({});

  const { product_categories, isLoading, error } = useProductCategories({
    include_descendants_tree: true, // 包含子分类树
    limit: 1000, // 限制返回数量
    parent_category_id: 'null',
  });

  // 根据搜索关键词过滤分类
  const filteredCategories =
    product_categories?.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // 自动展开选中分类的父级
  useEffect(() => {
    if (selectedCategory !== 'all' && product_categories) {
      // 查找选中分类的父级
      const findParentCategory = () => {
        for (const category of product_categories) {
          if (category.category_children) {
            for (const child of category.category_children) {
              if (child.id === selectedCategory) {
                // 如果找到子分类被选中，则展开父分类
                return category.id;
              }
            }
          }
        }
        return null;
      };

      const parentId = findParentCategory();
      if (parentId && !expandedCategories.includes(parentId)) {
        setExpandedCategories(prev => [...prev, parentId]);
      }
    }
  }, [selectedCategory, product_categories, expandedCategories]);

  const toggleCategory = (id: string) => {
    if (expandedCategories.includes(id)) {
      setExpandedCategories(expandedCategories.filter(i => i !== id));
    } else {
      setExpandedCategories([...expandedCategories, id]);
    }
  };

  // 显示骨架屏
  if (isLoading) {
    return <CategorySkeleton />;
  }

  if (error) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        加载分类失败: {error.message}
      </div>
    );
  }

  const handleCategorySelect = (categoryId: string) => {
    // 更新选中的分类
    onSelectCategory(categoryId);

    // 如果选择的是顶级分类，自动展开该分类
    if (categoryId !== 'all' && !expandedCategories.includes(categoryId)) {
      const isTopLevel = product_categories?.some(cat => cat.id === categoryId);
      if (isTopLevel) {
        setExpandedCategories(prev => [...prev, categoryId]);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-sm font-semibold">商品分类</h3>
        <div className="flex items-center gap-2">
          <Input
            placeholder="搜索分类..."
            value={searchQuery}
            onChange={e => onSearchQueryChange(e.target.value)}
            className="h-7 w-32 text-xs"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSelectCategory('all');
              onSearchQueryChange('');
            }}
            className="h-6 text-xs text-muted-foreground hover:text-primary"
          >
            重置
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent max-h-[300px] space-y-0.5 overflow-y-auto pr-2">
          <label className="sticky top-0 z-10 flex h-8 cursor-pointer items-center gap-2 rounded-md border-b bg-card px-2 transition-colors hover:bg-muted/50">
            <Checkbox
              checked={selectedCategory === 'all'}
              onCheckedChange={() => handleCategorySelect('all')}
              className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <span className="flex-1 text-sm font-medium">全部分类</span>
            <Badge variant="secondary" className="font-normal">
              {allProductCategoriesCount || 0}
            </Badge>
          </label>

          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <div key={category.id} className="space-y-0.5">
                <label className="flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 transition-colors hover:bg-muted/50">
                  <div className="flex flex-1 items-center gap-2">
                    {category.category_children && category.category_children.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={e => {
                          e.preventDefault();
                          toggleCategory(category.id);
                        }}
                      >
                        <ChevronRight
                          className={cn(
                            'h-3 w-3 text-muted-foreground transition-transform',
                            expandedCategories.includes(category.id) && 'rotate-90'
                          )}
                        />
                      </Button>
                    )}
                    <Checkbox
                      checked={selectedCategory === category.id}
                      onCheckedChange={() => handleCategorySelect(category.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <span className="flex-1 text-sm font-medium">{category.name}</span>
                  </div>
                </label>

                {category.category_children &&
                  category.category_children.length > 0 &&
                  expandedCategories.includes(category.id) && (
                    <div className="ml-6 space-y-0.5 border-l border-dashed pl-4">
                      {category.category_children.map(childCategory => (
                        <label
                          key={childCategory.id}
                          className="group flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 transition-colors hover:bg-muted/50"
                        >
                          <Checkbox
                            checked={selectedCategory === childCategory.id}
                            onCheckedChange={() => handleCategorySelect(childCategory.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                          />
                          <span className="flex-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                            {childCategory.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">未找到匹配的分类</div>
          )}
        </div>
      </div>
    </div>
  );
}
