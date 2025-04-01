import { RegisterFormValues } from '@/app/[locale]/auth/register/page';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { PasswordStrengthIndicator } from './password-strength-indicator';

interface PasswordFormProps {
  form: UseFormReturn<RegisterFormValues>;
  attemptedSubmit: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

export function PasswordForm({
  form,
  attemptedSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: PasswordFormProps) {
  const t = useTranslations('auth.register.form');

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => {
          const fieldState = form.getFieldState('password');
          const showError = attemptedSubmit && fieldState.isTouched && fieldState.error;
          return (
            <FormItem className={showError ? 'has-error' : ''}>
              <FormLabel
                className="text-sm font-medium"
                style={{ color: showError ? 'var(--destructive)' : 'inherit' }}
              >
                {t('password')} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('passwordPlaceholder')}
                    className="h-10 rounded-lg bg-white pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 dark:bg-gray-900"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormDescription className="text-xs">{t('passwordDescription')}</FormDescription>
              <PasswordStrengthIndicator password={field.value} />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => {
          const fieldState = form.getFieldState('confirmPassword');
          const showError = attemptedSubmit && fieldState.isTouched && fieldState.error;
          return (
            <FormItem className={showError ? 'has-error' : ''}>
              <FormLabel
                className="text-sm font-medium"
                style={{ color: showError ? 'var(--destructive)' : 'inherit' }}
              >
                {t('confirmPassword')} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('confirmPasswordPlaceholder')}
                    className="h-10 rounded-lg bg-white pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 dark:bg-gray-900"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              {attemptedSubmit && fieldState.isTouched && fieldState.error && <FormMessage />}
            </FormItem>
          );
        }}
      />
    </div>
  );
}
