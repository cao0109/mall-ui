import { RegisterFormValues } from '@/app/[locale]/auth/register/page';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Building2, Mail, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

interface BasicInfoFormProps {
  form: UseFormReturn<RegisterFormValues>;
  attemptedSubmit: boolean;
  sendingCode: boolean;
  countdown: number;
  onSendVerificationCode: () => void;
  role: 'vendor' | 'seller';
}

export function BasicInfoForm({
  form,
  attemptedSubmit,
  sendingCode,
  countdown,
  onSendVerificationCode,
  role,
}: BasicInfoFormProps) {
  const t = useTranslations('auth.register.form');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => {
            const fieldState = form.getFieldState('lastName');
            const showError = attemptedSubmit && fieldState.isTouched && fieldState.error;
            return (
              <FormItem className={showError ? 'has-error' : ''}>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: showError ? 'var(--destructive)' : 'inherit' }}
                >
                  {t('lastName')} <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                      placeholder={t('lastNamePlaceholder')}
                      className="h-10 rounded-lg bg-white pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 dark:bg-gray-900"
                      {...field}
                    />
                  </div>
                </FormControl>
                {attemptedSubmit && fieldState.isTouched && fieldState.error && <FormMessage />}
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => {
            const fieldState = form.getFieldState('firstName');
            const showError = attemptedSubmit && fieldState.isTouched && fieldState.error;
            return (
              <FormItem className={showError ? 'has-error' : ''}>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: showError ? 'var(--destructive)' : 'inherit' }}
                >
                  {t('firstName')} <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                      placeholder={t('firstNamePlaceholder')}
                      className="h-10 rounded-lg bg-white pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 dark:bg-gray-900"
                      {...field}
                    />
                  </div>
                </FormControl>
                {attemptedSubmit && fieldState.isTouched && fieldState.error && <FormMessage />}
              </FormItem>
            );
          }}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => {
          const fieldState = form.getFieldState('email');
          const showError = attemptedSubmit && fieldState.isTouched && fieldState.error;
          return (
            <FormItem className={showError ? 'has-error' : ''}>
              <FormLabel
                className="text-sm font-medium"
                style={{ color: showError ? 'var(--destructive)' : 'inherit' }}
              >
                {t('email')} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="h-10 rounded-lg bg-white pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 dark:bg-gray-900"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-xs">{t('emailDescription')}</FormDescription>
              {attemptedSubmit && fieldState.isTouched && fieldState.error && <FormMessage />}
            </FormItem>
          );
        }}
      />

      <div className="space-y-2">
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => {
            const fieldState = form.getFieldState('verificationCode');
            const showError = attemptedSubmit && fieldState.isTouched && fieldState.error;
            return (
              <FormItem className={showError ? 'has-error' : ''}>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: showError ? 'var(--destructive)' : 'inherit' }}
                >
                  {t('verificationCode')} <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    <Input
                      placeholder={t('verificationCodePlaceholder')}
                      className="h-10 flex-1 rounded-lg bg-white transition-all duration-200 focus:ring-2 focus:ring-primary/20 dark:bg-gray-900"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={sendingCode || countdown > 0}
                      onClick={onSendVerificationCode}
                      className="h-10 min-w-[100px] rounded-lg font-medium"
                    >
                      {sendingCode
                        ? t('sendingCode')
                        : countdown > 0
                          ? t('resendCode', { seconds: countdown })
                          : t('sendCode')}
                    </Button>
                  </div>
                </FormControl>
                {attemptedSubmit && fieldState.isTouched && fieldState.error && <FormMessage />}
              </FormItem>
            );
          }}
        />
      </div>

      <FormField
        control={form.control}
        name="storeName"
        render={({ field }) => {
          const fieldState = form.getFieldState('storeName');
          const showError = attemptedSubmit && fieldState.isTouched && fieldState.error;
          return (
            <FormItem className={showError ? 'has-error' : ''}>
              <FormLabel
                className="text-sm font-medium"
                style={{ color: showError ? 'var(--destructive)' : 'inherit' }}
              >
                {role === 'vendor' ? t('companyName') : t('storeName')}{' '}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    placeholder={
                      role === 'vendor' ? t('companyNamePlaceholder') : t('storeNamePlaceholder')
                    }
                    className="h-10 rounded-lg bg-white pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 dark:bg-gray-900"
                    {...field}
                  />
                </div>
              </FormControl>
              {role === 'seller' && (
                <FormDescription className="text-xs">{t('storeNameDescription')}</FormDescription>
              )}
              {attemptedSubmit && fieldState.isTouched && fieldState.error && <FormMessage />}
            </FormItem>
          );
        }}
      />
    </div>
  );
}
