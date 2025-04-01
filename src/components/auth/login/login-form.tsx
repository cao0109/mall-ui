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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAdminLogin } from 'medusa-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(1, '请输入密码'),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const t = useTranslations('auth.login');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const adminLogin = useAdminLogin();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { user } = await adminLogin.mutateAsync({
        email: values.email,
        password: values.password,
      });

      login(
        {
          id: user.id,
          name: user.first_name + ' ' + user.last_name,
          email: user.email,
          role: 'vendor',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name}`,
        },
        'medusa-token'
      );

      toast({
        title: t('success.title'),
        description: t('success.description'),
      });

      router.push('/');
    } catch (error) {
      toast({
        title: t('error.title'),
        description: t('error.description', {
          error: error instanceof Error ? error.message : '',
        }),
        variant: 'destructive',
      });
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
                {t('welcome')}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0 text-xs text-muted-foreground sm:text-sm">
                        {t('form.rememberMe')}
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-primary hover:text-primary/80 sm:text-sm"
                >
                  {t('form.forgotPassword')}
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-4 pt-2">
              <Button
                type="submit"
                className="h-10 w-full rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                disabled={adminLogin.isLoading}
              >
                {adminLogin.isLoading ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {t('form.loggingIn')}
                  </div>
                ) : (
                  t('form.login')
                )}
              </Button>
              <div className="text-center text-xs text-muted-foreground sm:text-sm">
                {t('form.noAccount')}{' '}
                <Link
                  href="/auth/register"
                  className="inline-flex items-center font-medium text-primary transition-colors duration-200 hover:text-primary/80"
                >
                  {t('form.registerNow')}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="text-center lg:text-left">
        <p className="text-xs text-muted-foreground sm:text-sm">
          {t('form.agreement')}{' '}
          <Link href="/terms" className="ml-1 text-primary hover:text-primary/80">
            {t('form.terms')}
          </Link>{' '}
          {t('form.and')}{' '}
          <Link href="/privacy" className="ml-1 text-primary hover:text-primary/80">
            {t('form.privacy')}
          </Link>
        </p>
      </div>
    </div>
  );
}
