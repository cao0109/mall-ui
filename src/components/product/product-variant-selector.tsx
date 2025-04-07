'use client';

import { useEffect, useMemo, useState } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { PricedProduct, PricedVariant } from '@/types/product';

interface ProductVariantSelectorProps {
  product: PricedProduct;
  selectedVariant?: PricedVariant;
  onVariantChange: (variant: PricedVariant) => void;
}

export function ProductVariantSelector({
  product,
  selectedVariant,
  onVariantChange,
}: ProductVariantSelectorProps) {
  // 存储每个选项的选中值
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // 根据当前选中的规格找到对应的变体
  const findVariantByOptions = (options: Record<string, string>) => {
    return product.variants.find(variant => {
      return product.options?.every(option => {
        const optionValue = variant.options?.find(opt => opt.option_id === option.id)?.value;
        return optionValue === options[option.id];
      });
    });
  };

  // 获取每个选项的可选值
  const optionValues = useMemo(() => {
    const values: Record<string, string[]> = {};
    product.options?.forEach(option => {
      values[option.id] = Array.from(
        new Set(
          product.variants
            .map(variant => variant.options?.find(opt => opt.option_id === option.id)?.value)
            .filter(Boolean) as string[]
        )
      );
    });
    return values;
  }, [product]);

  // 判断某个选项值是否可选
  const isOptionValueAvailable = (optionId: string, value: string) => {
    const currentOptions = { ...selectedOptions };
    currentOptions[optionId] = value;

    return product.variants.some(variant =>
      product.options?.every(option => {
        const optionValue = variant.options?.find(opt => opt.option_id === option.id)?.value;
        if (currentOptions[option.id]) {
          return optionValue === currentOptions[option.id];
        }
        return true;
      })
    );
  };

  // 处理选项变化
  const handleOptionChange = (optionId: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionId]: value };
    setSelectedOptions(newOptions);

    const variant = findVariantByOptions(newOptions);
    if (variant) {
      onVariantChange(variant);
    }
  };

  // 初始化选中的变体
  useEffect(() => {
    if (selectedVariant) {
      const options: Record<string, string> = {};
      selectedVariant.options?.forEach((option: any) => {
        options[option.option_id] = option.value;
      });
      setSelectedOptions(options);
    } else if (product.variants.length > 0) {
      // 默认选择第一个变体
      const firstVariant = product.variants[0];
      const options: Record<string, string> = {};
      firstVariant.options?.forEach((option: any) => {
        options[option.option_id] = option.value;
      });
      setSelectedOptions(options);
      onVariantChange(firstVariant);
    }
  }, [product.variants, selectedVariant]);

  if (!product.options?.length) return null;

  return (
    <div className="space-y-4">
      {product.options.map(option => (
        <div key={option.id} className="space-y-2">
          <h3 className="text-sm font-medium">{option.title}</h3>
          <RadioGroup
            value={selectedOptions[option.id]}
            onValueChange={value => handleOptionChange(option.id, value)}
            className="flex flex-wrap gap-2"
          >
            {optionValues[option.id]?.map(value => {
              const isAvailable = isOptionValueAvailable(option.id, value);
              return (
                <div key={value}>
                  <RadioGroupItem
                    id={`${option.id}-${value}`}
                    value={value}
                    disabled={!isAvailable}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor={`${option.id}-${value}`}
                    className={cn(
                      'flex min-w-[64px] cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10',
                      selectedOptions[option.id] === value
                        ? 'border-primary bg-primary/10'
                        : 'border-border'
                    )}
                  >
                    {value}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}
