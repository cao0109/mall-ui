'use client';

import { BasicInfoForm } from '@/components/auth/register/basic-info-form';
import { BrandIntro } from '@/components/auth/register/brand-intro';
import { PasswordForm } from '@/components/auth/register/password-form';
import { RoleSelect } from '@/components/auth/register/role-select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ApiError, ApiService } from '@/lib/api';
import { calculatePasswordStrength } from '@/lib/utils/password';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type RegisterFormValues = {
  role: 'vendor' | 'seller';
  firstName: string;
  lastName: string;
  email: string;
  verificationCode: string;
  storeName: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const t = useTranslations('auth.register');

  const baseSchema = {
    firstName: z.string().min(1, t('validation.firstName')),
    lastName: z.string().min(1, t('validation.lastName')),
    email: z.string().email(t('validation.email')),
    verificationCode: z.string().min(1, t('validation.verificationCode')),
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
  };

  const vendorSchema = z.object({
    role: z.literal('vendor'),
    storeName: z.string().min(1, t('validation.storeName.vendor')),
    ...baseSchema,
  });

  const sellerSchema = z.object({
    role: z.literal('seller'),
    storeName: z
      .string()
      .min(1, t('validation.storeName.seller'))
      .regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9-]+$/, t('validation.storeNameFormat')),
    ...baseSchema,
  });

  const formSchema = z
    .discriminatedUnion('role', [vendorSchema, sellerSchema])
    .refine(data => data.password === data.confirmPassword, {
      message: t('validation.passwordMismatch'),
      path: ['confirmPassword'],
    });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'seller' as const,
      firstName: '',
      lastName: '',
      email: '',
      verificationCode: '',
      storeName: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const [step, setStep] = useState<'role' | 'info' | 'password'>('role');
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 倒计时逻辑
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendVerificationCode = async () => {
    const isEmailValid = await form.trigger('email');
    if (!isEmailValid) {
      return;
    }

    const email = form.getValues('email');
    setSendingCode(true);
    try {
      await ApiService.sendVerificationCode(email);
      toast({
        title: t('success.codeSent'),
        description: t('success.codeSentDescription'),
      });
      setCountdown(60);
    } catch (error) {
      toast({
        title: t('error.sendFailed'),
        description: error instanceof ApiError ? error.message : t('error.sendFailedDescription'),
        variant: 'destructive',
      });
    } finally {
      setSendingCode(false);
    }
  };

  const onSubmit = async (values: RegisterFormValues) => {
    if (step === 'password') {
      setLoading(true);
      try {
        if (!codeVerified) {
          toast({
            title: t('validation.verificationFailed'),
            variant: 'destructive',
          });
          setStep('info');
          setLoading(false);
          return;
        }

        const registerParams = {
          email: values.email,
          password: values.password,
          store_name: values.storeName,
          first_name: values.firstName,
          last_name: values.lastName,
        };

        const data = await (values.role === 'vendor'
          ? ApiService.registerVendor(registerParams)
          : ApiService.registerSeller(registerParams));

        login(
          {
            id: data.user.id,
            name: `${data.user.first_name} ${data.user.last_name}`,
            email: data.user.email,
            role: values.role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.firstName}`,
          },
          data.token
        );

        toast({
          title: t('success.registration.' + values.role),
        });

        router.push('/');
      } catch (error) {
        toast({
          title: t('error.registration'),
          description:
            error instanceof ApiError ? error.message : t('error.registrationDescription'),
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    } else {
      nextStep();
    }
  };

  const nextStep = async () => {
    if (step === 'role') {
      setStep('info');
      return;
    }

    if (step === 'info') {
      setAttemptedSubmit(true);

      const isValid = await form.trigger([
        'firstName',
        'lastName',
        'email',
        'verificationCode',
        'storeName',
      ]);

      if (!isValid) {
        toast({
          title: t('validation.formValidation'),
          variant: 'destructive',
        });
        return;
      }

      try {
        setCodeVerified(true);
        setStep('password');
      } catch (error) {
        toast({
          title: t('validation.codeError'),
          variant: 'destructive',
        });
      }
    }
  };

  const prevStep = () => {
    if (step === 'password') setStep('info');
    else if (step === 'info') setStep('role');
  };

  return (
    <div className="container relative flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        {/* 左侧品牌介绍 */}
        <div className="hidden lg:block">
          <BrandIntro role={form.getValues('role')} />
        </div>

        {/* 右侧注册表单 */}
        <div className="mx-auto w-full max-w-md space-y-6 lg:max-w-none">
          <div className="flex flex-col items-center space-y-2 lg:items-start">
            <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              {t(`title.${form.getValues('role')}`)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t(`subtitle.${form.getValues('role')}`)}
            </p>
          </div>

          <Card className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader className="space-y-2 pb-4">
                  <CardTitle className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-center text-lg font-bold text-transparent dark:from-gray-100 dark:to-gray-400 sm:text-xl">
                    {t(`steps.${step}.title`)}
                  </CardTitle>
                  <CardDescription className="text-center text-xs sm:text-sm">
                    {t(`steps.${step}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  {step === 'role' && <RoleSelect form={form} />}
                  {step === 'info' && (
                    <BasicInfoForm
                      form={form}
                      attemptedSubmit={attemptedSubmit}
                      sendingCode={sendingCode}
                      countdown={countdown}
                      onSendVerificationCode={handleSendVerificationCode}
                      role={form.getValues('role')}
                    />
                  )}
                  {step === 'password' && (
                    <PasswordForm
                      form={form}
                      attemptedSubmit={attemptedSubmit}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      showConfirmPassword={showConfirmPassword}
                      setShowConfirmPassword={setShowConfirmPassword}
                    />
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-4 pt-2">
                  <div className="flex w-full gap-3">
                    {step !== 'role' && (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 flex-1 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100 active:scale-[0.98] dark:hover:bg-gray-800"
                        onClick={prevStep}
                      >
                        <ArrowLeft className="mr-1.5 h-4 w-4" />
                        {t('form.prevStep')}
                      </Button>
                    )}
                    <Button
                      type={step === 'role' ? 'button' : 'submit'}
                      className="h-10 flex-1 rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                      disabled={loading}
                      onClick={step === 'role' || step === 'info' ? () => nextStep() : undefined}
                    >
                      {step === 'password' ? (
                        loading ? (
                          <div className="flex items-center justify-center">
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            {t('form.submitting')}
                          </div>
                        ) : (
                          t('form.submit')
                        )
                      ) : (
                        <>
                          {t('form.nextStep')}
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center justify-center text-center text-xs text-muted-foreground sm:text-sm">
                    {t('form.hasAccount')}{' '}
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center font-medium text-primary hover:text-primary/80"
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
      </div>
    </div>
  );
}
