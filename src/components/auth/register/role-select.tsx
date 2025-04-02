import { Store, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

import { RegisterFormValues } from '@/app/[locale]/auth/register/page';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RoleSelectProps {
  form: UseFormReturn<RegisterFormValues>;
}

export function RoleSelect({ form }: RoleSelectProps) {
  const t = useTranslations('auth.register.role');

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">{t('title')}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <div className="h-full">
                    <RadioGroupItem value="vendor" id="vendor" className="peer hidden" />
                    <Label
                      htmlFor="vendor"
                      className="flex h-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-muted bg-white/50 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-white hover:shadow-md peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 dark:bg-gray-900/50 dark:hover:bg-gray-900 dark:peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 dark:[&:has([data-state=checked])]:bg-primary/10"
                    >
                      <Truck className="h-8 w-8 text-primary" />
                      <div className="text-center">
                        <p className="text-base font-semibold">{t('vendor.title')}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{t('vendor.subtitle')}</p>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {t('vendor.feature1')}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {t('vendor.feature2')}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {t('vendor.feature3')}
                          </li>
                        </ul>
                      </div>
                    </Label>
                  </div>
                  <div className="h-full">
                    <RadioGroupItem value="seller" id="seller" className="peer hidden" />
                    <Label
                      htmlFor="seller"
                      className="flex h-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-muted bg-white/50 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-white hover:shadow-md peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 dark:bg-gray-900/50 dark:hover:bg-gray-900 dark:peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 dark:[&:has([data-state=checked])]:bg-primary/10"
                    >
                      <Store className="h-8 w-8 text-primary" />
                      <div className="text-center">
                        <p className="text-base font-semibold">{t('seller.title')}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{t('seller.subtitle')}</p>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {t('seller.feature1')}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {t('seller.feature2')}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {t('seller.feature3')}
                          </li>
                        </ul>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
