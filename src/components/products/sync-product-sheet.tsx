import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import {
  FaAmazon,
  FaArrowLeft,
  FaArrowRight,
  FaBox,
  FaCheck,
  FaCog,
  FaEbay,
  FaFileAlt,
  FaImages,
  FaInfoCircle,
  FaShopify,
  FaStore,
  FaSync,
  FaTag,
  FaTimes,
  FaTruck,
  FaWordpress,
} from 'react-icons/fa';

interface SyncProductSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: SyncProductData) => void;
}

export interface SyncProductData {
  storeType: string;
  storeId: string;
  syncOptions: string[];
  isDefaultSync: boolean;
}

// Mock store data
const stores = {
  'self-hosted': [
    { id: 'store1', name: '美国独立站' },
    { id: 'store2', name: '欧洲独立站' },
    { id: 'store3', name: '日本独立站' },
  ],
  shopify: [
    { id: 'shop1', name: 'Fashion Store' },
    { id: 'shop2', name: 'Tech Gadgets' },
  ],
  woocommerce: [
    { id: 'woo1', name: 'Digital Market' },
    { id: 'woo2', name: 'Home Decor' },
  ],
};

const syncOptionsList = [
  { id: 'price', label: '价格信息', description: '同步商品价格和建议售价', icon: FaTag },
  {
    id: 'inventory',
    label: '库存信息',
    description: '同步商品库存数量和预警值',
    icon: FaBox,
  },
  { id: 'shipping', label: '运输信息', description: '同步运输时间和运费设置', icon: FaTruck },
  { id: 'description', label: '商品描述', description: '同步商品详情和规格参数', icon: FaFileAlt },
  { id: 'images', label: '商品图片', description: '同步商品主图和详情图', icon: FaImages },
];

export function SyncProductSheet({ open, onOpenChange, onConfirm }: SyncProductSheetProps) {
  const [storeType, setStoreType] = useState<string>('');
  const [storeId, setStoreId] = useState<string>('');
  const [syncOptions, setSyncOptions] = useState<string[]>([]);
  const [isDefaultSync, setIsDefaultSync] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);

  // Initialize sync options
  useEffect(() => {
    setSyncOptions(syncOptionsList.map(option => option.id));
  }, []);

  const handleConfirm = () => {
    onConfirm({
      storeType,
      storeId,
      syncOptions,
      isDefaultSync,
    });
    onOpenChange(false);
  };

  const isStepOneComplete = storeType && storeId;
  const isStepTwoComplete = isDefaultSync || (!isDefaultSync && syncOptions.length > 0);
  const canConfirm = isStepOneComplete && isStepTwoComplete;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-[480px]">
        {/* Header Section */}
        <SheetHeader className="space-y-3 border-b pb-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <FaSync className="h-5 w-5 text-primary" />
              <SheetTitle className="text-xl font-semibold">同步商品</SheetTitle>
            </div>
            <SheetDescription className="text-sm text-muted-foreground">
              选择要同步的店铺，同步后将在您的店铺中更新相应内容
            </SheetDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={step === 1 ? 'default' : 'secondary'}
              className="flex items-center gap-1.5 px-3 py-1 text-xs"
            >
              <FaStore />
              店铺选择
            </Badge>
            <div className="h-px w-6 bg-border" />
            <Badge
              variant={step === 2 ? 'default' : 'secondary'}
              className="flex items-center gap-1.5 px-3 py-1 text-xs"
            >
              <FaCog />
              同步设置
            </Badge>
          </div>
        </SheetHeader>

        {/* Content Section */}
        <ScrollArea className="-mx-6 flex-1">
          <div className="space-y-5 px-6 py-5">
            {step === 1 ? (
              <section className="space-y-5">
                <div className="mb-4 flex items-center gap-2">
                  <FaStore className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">选择目标店铺</h3>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-type" className="text-sm font-medium">
                      店铺类型
                    </Label>
                    <Select
                      value={storeType}
                      onValueChange={value => {
                        setStoreType(value);
                        setStoreId('');
                      }}
                    >
                      <SelectTrigger id="store-type" className="h-10">
                        <SelectValue placeholder="选择店铺类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>自研独立站</SelectLabel>
                          <SelectItem value="self-hosted">
                            <div className="flex flex-row items-center gap-2">
                              <FaStore />
                              自研独立站
                            </div>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>第三方平台</SelectLabel>
                          <SelectItem value="shopify">
                            <div className="flex flex-row items-center gap-2">
                              <FaShopify />
                              Shopify
                            </div>
                          </SelectItem>
                          <SelectItem value="woocommerce">
                            <div className="flex flex-row items-center gap-2">
                              <FaWordpress />
                              WooCommerce
                            </div>
                          </SelectItem>
                          <SelectItem value="amazon">
                            <div className="flex flex-row items-center gap-2">
                              <FaAmazon />
                              Amazon
                            </div>
                          </SelectItem>
                          <SelectItem value="ebay">
                            <div className="flex flex-row items-center gap-2">
                              <FaEbay />
                              eBay
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {storeType && stores[storeType as keyof typeof stores] && (
                    <div className="space-y-2">
                      <Label htmlFor="store" className="text-sm font-medium">
                        选择店铺
                      </Label>
                      <Select value={storeId} onValueChange={setStoreId}>
                        <SelectTrigger id="store" className="h-10">
                          <SelectValue placeholder="选择具体店铺" />
                        </SelectTrigger>
                        <SelectContent>
                          {stores[storeType as keyof typeof stores].map(store => (
                            <SelectItem key={store.id} value={store.id}>
                              <div className="flex flex-row items-center gap-2">
                                <FaStore className="h-4 w-4" />
                                {store.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </section>
            ) : (
              <section className="space-y-6">
                <div className="mb-4 flex items-center gap-2">
                  <FaCog className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">同步设置</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                    <div className="flex flex-row items-center gap-2">
                      <Label className="text-sm font-medium">默认同步</Label>
                      <p className="text-xs text-muted-foreground">启用后将自动同步所有信息</p>
                    </div>
                    <Switch
                      id="default-sync"
                      checked={isDefaultSync}
                      onCheckedChange={setIsDefaultSync}
                    />
                  </div>

                  {!isDefaultSync && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">自定义同步选项</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setSyncOptions(
                              syncOptions.length === syncOptionsList.length
                                ? []
                                : syncOptionsList.map(option => option.id)
                            )
                          }
                        >
                          {syncOptions.length === syncOptionsList.length ? (
                            <>
                              <FaTimes className="mr-1.5 h-3.5 w-3.5" />
                              取消全选
                            </>
                          ) : (
                            <>
                              <FaCheck className="mr-1.5 h-3.5 w-3.5" />
                              全选
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="grid gap-3">
                        {syncOptionsList.map(option => (
                          <div
                            key={option.id}
                            className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                          >
                            <Checkbox
                              id={option.id}
                              checked={syncOptions.includes(option.id)}
                              onCheckedChange={checked => {
                                if (checked) {
                                  setSyncOptions([...syncOptions, option.id]);
                                } else {
                                  setSyncOptions(syncOptions.filter(id => id !== option.id));
                                }
                              }}
                            />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <option.icon className="h-4 w-4 text-primary" />
                                <Label htmlFor={option.id} className="text-sm font-medium">
                                  {option.label}
                                </Label>
                              </div>
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Alert
                  variant="default"
                  className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="mb-2 flex flex-row items-center gap-3">
                    <FaInfoCircle size={20} className="text-blue-500" />
                    <p className="text-lg font-semibold">将同步以下内容：</p>
                  </div>
                  <AlertDescription className="pl-4 text-sm text-gray-700">
                    <ul className="list-none space-y-2">
                      {(isDefaultSync
                        ? syncOptionsList
                        : syncOptionsList.filter(option => syncOptions.includes(option.id))
                      ).map(option => (
                        <li key={option.id} className="flex items-center gap-3">
                          <option.icon className="h-4 w-4 text-primary" />
                          <span className="text-sm">{option.label}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </section>
            )}
          </div>
        </ScrollArea>

        {/* Footer Section */}
        <div className="flex justify-between border-t pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (step === 2) {
                setStep(1);
              } else {
                onOpenChange(false);
              }
            }}
          >
            {step === 2 ? (
              <>
                <FaArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                上一步
              </>
            ) : (
              <>
                <FaTimes className="mr-1.5 h-3.5 w-3.5" />
                取消
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (step === 1 && isStepOneComplete) {
                setStep(2);
              } else if (step === 2 && canConfirm) {
                handleConfirm();
              }
            }}
            disabled={step === 1 ? !isStepOneComplete : !canConfirm}
          >
            {step === 1 ? (
              <>
                下一步
                <FaArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </>
            ) : (
              <>
                确认同步
                <FaCheck className="ml-1.5 h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
