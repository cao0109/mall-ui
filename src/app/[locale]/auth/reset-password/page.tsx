'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordStrengthIndicator } from '@/components/auth/register/password-strength-indicator';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ApiError, ApiService } from '@/lib/api';
import { calculatePasswordStrength } from '@/lib/utils/password';
import { useAuthStore } from '@/store/auth';

interface ResetPasswordFormValues {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailFromParams, setEmailFromParams] = useState('');

  const formSchema = z
    .object({
      email: z.string().email(t('validation.email')),
      code: z.string().min(1, t('validation.code')),
      password: z
        .string()
        .min(8, t('validation.password'))
        .refine(
          password => {
            const strength = calculatePasswordStrength(password);
            return strength >= 4;
          },
          {
            message: t('validation.passwordStrength'),
          }
        ),
      confirmPassword: z.string().min(1, t('validation.confirmPassword')),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('validation.passwordMismatch'),
      path: ['confirmPassword'],
    });

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    // 从URL参数中获取邮箱
    const email = searchParams.get('email');
    if (email) {
      setEmailFromParams(email);
      form.setValue('email', email);
    }
  }, [searchParams, form]);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      // 首先验证验证码
      const isValid = await ApiService.validateResetCode(values.email, values.code);

      if (!isValid) {
        toast({
          title: t('error.invalidCode'),
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // 重置密码
      const data = await ApiService.resetPassword({
        email: values.email,
        code: values.code,
        password: values.password,
      });

      // 自动登录
      login(
        {
          id: data.user.id,
          name: `${data.user.first_name} ${data.user.last_name}`,
          email: data.user.email,
          role: 'seller', // 默认值，实际应该从API返回
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.first_name}`,
        },
        data.token
      );

      toast({
        title: t('success.title'),
        description: t('success.description'),
      });

      // 重定向到首页
      router.push('/');
    } catch (error) {
      toast({
        title: t('error.title'),
        description: error instanceof ApiError ? error.message : t('error.description'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 lg:max-w-none">
      <div className="flex flex-col items-center space-y-2 lg:items-start">
        <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400 sm:text-3xl">
          {t('title')}
        </h2>
        <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      <Card className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-center text-lg font-bold text-transparent dark:from-gray-100 dark:to-gray-400 sm:text-xl">
                {t('formTitle')}
              </CardTitle>
              <CardDescription className="text-center text-xs sm:text-sm">
                {t('formDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('form.email')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          className="h-10 rounded-lg pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          disabled={!!emailFromParams}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('form.code')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={t('form.codePlaceholder')}
                          className="h-10 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      {t('form.codeDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('form.password')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t('form.passwordPlaceholder')}
                          className="h-10 rounded-lg pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      {t('form.passwordDescription')}
                    </FormDescription>
                    <PasswordStrengthIndicator password={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t('form.confirmPassword')}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder={t('form.confirmPasswordPlaceholder')}
                          className="h-10 rounded-lg pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-4 pt-2">
              <Button
                type="submit"
                className="h-10 w-full rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {t('form.processing')}
                  </div>
                ) : (
                  t('form.submit')
                )}
              </Button>
              <div className="text-center text-xs text-muted-foreground sm:text-sm">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center font-medium text-primary transition-colors duration-200 hover:text-primary/80"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  {t('form.backToLogin')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="text-center lg:text-left">
        <p className="text-xs text-muted-foreground sm:text-sm">
          {t('noCode')}{' '}
          <Link href="/auth/forgot-password" className="text-primary hover:text-primary/80">
            {t('requestAgain')}
          </Link>
        </p>
      </div>
    </div>
  );
}
