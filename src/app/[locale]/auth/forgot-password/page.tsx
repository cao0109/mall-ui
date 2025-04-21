'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword');
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email(t('validation.email')),
  });

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setLoading(true);
    try {
      await ApiService.forgotPassword(values.email);

      toast({
        title: t('success.title'),
        description: t('success.description'),
      });

      // 将邮箱传递给重置密码页面
      router.push(`/auth/reset-password?email=${encodeURIComponent(values.email)}`);
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
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      {t('form.emailDescription')}
                    </FormDescription>
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
                    {t('form.sending')}
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
          {t('rememberPassword')}{' '}
          <Link href="/auth/login" className="text-primary hover:text-primary/80">
            {t('loginNow')}
          </Link>
        </p>
      </div>
    </div>
  );
}
