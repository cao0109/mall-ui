"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ApiError, ApiService } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Lock,
  Mail,
  Store,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserRole = "vendor" | "seller";
type Step = "role" | "info" | "password";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<UserRole>("seller");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const validateStoreName = (name: string) => {
    // 店铺名必须包含英文字母，只能包含英文字母、数字和连字符
    const storeNameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9-]+$/;
    return storeNameRegex.test(name);
  };

  const handleSendVerificationCode = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "邮箱格式错误",
        description: "请输入正确的邮箱地址",
        variant: "destructive",
      });
      return;
    }

    setSendingCode(true);
    try {
      await ApiService.sendVerificationCode(email);
      toast({
        title: "验证码已发送",
        description: "验证码已发送至您的邮箱",
      });
    } catch (error) {
      toast({
        title: "发送失败",
        description:
          error instanceof ApiError
            ? error.message
            : "验证码发送失败，请稍后重试",
        variant: "destructive",
      });
    } finally {
      setSendingCode(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registerParams = {
        email,
        password,
        store_name: companyName,
        first_name: firstName,
        last_name: lastName,
      };

      const data = await (role === "vendor"
        ? ApiService.registerVendor(registerParams)
        : ApiService.registerSeller(registerParams));

      // 注册成功后自动登录
      login(
        {
          id: data.user.id,
          name: `${data.user.first_name} ${data.user.last_name}`,
          email: data.user.email,
          role: role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`,
        },
        data.token
      );

      toast({
        title: "注册成功",
        description:
          role === "vendor" ? "欢迎加入供应商平台！" : "欢迎加入跨境电商平台！",
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "注册失败",
        description:
          error instanceof ApiError
            ? error.message
            : "该邮箱已被注册或服务器错误",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "password") {
      handleRegister(e);
    } else {
      nextStep();
    }
  };

  const nextStep = () => {
    if (step === "role" && !role) {
      toast({
        title: "请选择商家身份",
        variant: "destructive",
      });
      return;
    }

    if (step === "info") {
      if (!firstName || !lastName) {
        toast({
          title: "请填写姓名",
          description: "姓氏和名字为必填项",
          variant: "destructive",
        });
        return;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast({
          title: "邮箱格式错误",
          description: "请输入正确的邮箱地址",
          variant: "destructive",
        });
        return;
      }

      if (!verificationCode) {
        toast({
          title: "请输入验证码",
          description: "请输入邮箱验证码",
          variant: "destructive",
        });
        return;
      }

      if (!companyName) {
        toast({
          title: role === "vendor" ? "请填写公司名称" : "请填写店铺名称",
          variant: "destructive",
        });
        return;
      }

      if (role === "seller" && !validateStoreName(companyName)) {
        toast({
          title: "店铺名称格式错误",
          description:
            "店铺名称必须包含英文字母，只能使用英文字母、数字和连字符",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === "role") setStep("info");
    else if (step === "info") setStep("password");
  };

  const prevStep = () => {
    if (step === "password") setStep("info");
    else if (step === "info") setStep("role");
  };

  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex items-start justify-center py-8 px-4 md:px-6 lg:px-8">
      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {/* 左侧品牌介绍 */}
        <div className="hidden lg:block">
          <div className="sticky top-8 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {role === "vendor" ? "供应商入驻" : "采购商注册"}
              </div>
              <h1 className="text-3xl xl:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                加入 HiDoo，
                <br />
                {role === "vendor" ? "让您的产品触达全球" : "开启跨境电商之旅"}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                {role === "vendor"
                  ? "HiDoo 为优质供应商提供一站式跨境电商解决方案，助力您的产品快速触达全球市场。"
                  : "HiDoo 为跨境电商卖家提供海量优质货源和一键建站服务，助您轻松开启跨境电商创业。"}
              </p>
            </div>

            <div className="grid gap-4">
              <div className="group flex items-center gap-5 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm transition-all hover:shadow-md hover:bg-white/90">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  {role === "vendor" ? (
                    <Truck className="w-6 h-6 text-primary" />
                  ) : (
                    <Store className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-0.5 truncate">
                    {role === "vendor" ? "全球市场触达" : "海量优质货源"}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {role === "vendor"
                      ? "产品直接面向全球买家，快速打开国际市场"
                      : "精选优质供应商，一站式采购更便捷"}
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-5 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm transition-all hover:shadow-md hover:bg-white/90">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-0.5 truncate">
                    {role === "vendor" ? "专业运营支持" : "一键生成独立站"}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {role === "vendor"
                      ? "专业的运营团队，助您优化产品展示和营销策略"
                      : "快速生成专业独立站，打造专属品牌形象"}
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-5 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm transition-all hover:shadow-md hover:bg-white/90">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-0.5 truncate">
                    {role === "vendor" ? "高效订单管理" : "专业培训指导"}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {role === "vendor"
                      ? "完善的订单管理系统，轻松处理全球订单"
                      : "系统的跨境电商培训，助您快速掌握运营技巧"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧注册表单 */}
        <div className="w-full max-w-md mx-auto lg:max-w-none space-y-6">
          <div className="flex flex-col items-center lg:items-start space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {role === "vendor" ? "成为供应商" : "成为采购商"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {role === "vendor"
                ? "让您的优质产品触达全球买家"
                : "开启您的跨境电商创业之旅"}
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-md">
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-4 pb-4">
                <div className="flex items-center justify-center gap-2">
                  {["role", "info", "password"].map((s, index) => (
                    <div
                      key={s}
                      className={`flex items-center ${
                        index !== 0 ? "ml-2" : ""
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          s === step
                            ? "bg-primary"
                            : index < ["role", "info", "password"].indexOf(step)
                            ? "bg-primary/60"
                            : "bg-gray-200"
                        }`}
                      />
                      {index < 2 && (
                        <div
                          className={`w-12 sm:w-16 h-0.5 ml-2 ${
                            index < ["role", "info", "password"].indexOf(step)
                              ? "bg-primary/60"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {step === "role"
                    ? "选择商家类型"
                    : step === "info"
                    ? "填写基本信息"
                    : "设置账户密码"}
                </CardTitle>
                <CardDescription className="text-center text-xs sm:text-sm">
                  {step === "role"
                    ? "请选择您想要注册的商家类型"
                    : step === "info"
                    ? "请填写您的基本信息，用于账号注册"
                    : "请设置您的登录密码，建议使用强密码"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                {step === "role" && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">选择身份</Label>
                      <RadioGroup
                        defaultValue={role}
                        onValueChange={(value) => setRole(value as UserRole)}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="vendor"
                            id="vendor"
                            className="peer hidden"
                          />
                          <Label
                            htmlFor="vendor"
                            className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-muted bg-white/50 p-4 hover:bg-white hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer transition-all"
                          >
                            <Truck className="h-8 w-8 text-primary" />
                            <div className="text-center">
                              <p className="font-semibold text-base">供应商</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                我是优质货源供应商
                              </p>
                            </div>
                            <div className="mt-3 text-xs text-muted-foreground">
                              <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  产品直接面向全球买家
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  专业的运营支持服务
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  高效的订单管理系统
                                </li>
                              </ul>
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="seller"
                            id="seller"
                            className="peer hidden"
                          />
                          <Label
                            htmlFor="seller"
                            className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-muted bg-white/50 p-4 hover:bg-white hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer transition-all"
                          >
                            <Store className="h-8 w-8 text-primary" />
                            <div className="text-center">
                              <p className="font-semibold text-base">采购商</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                我要开启跨境电商
                              </p>
                            </div>
                            <div className="mt-3 text-xs text-muted-foreground">
                              <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  海量优质货源直供
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  一键生成独立站
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  专业的培训指导
                                </li>
                              </ul>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === "info" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-medium"
                        >
                          姓氏
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="lastName"
                            placeholder="请输入姓氏"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="pl-10 rounded-lg h-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-medium"
                        >
                          名字
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            placeholder="请输入名字"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="pl-10 rounded-lg h-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        电子邮箱
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="请输入常用邮箱"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 rounded-lg h-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        此邮箱将用于登录账号和接收重要通知，请确保真实有效
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">邮箱验证</Label>
                      <div className="flex gap-3">
                        <Input
                          placeholder="请输入验证码"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="flex-1 rounded-lg h-10"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={sendingCode}
                          onClick={handleSendVerificationCode}
                          className="min-w-[100px] rounded-lg h-10 font-medium"
                        >
                          {sendingCode ? "发送中..." : "获取验证码"}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium">
                        {role === "vendor" ? "公司名称" : "店铺名称"}
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company"
                          placeholder={
                            role === "vendor"
                              ? "请输入营业执照上的公司名称"
                              : "请输入店铺英文名称（仅限英文字母、数字和连字符）"
                          }
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="pl-10 rounded-lg h-10"
                          required
                        />
                      </div>
                      {role === "seller" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          店铺名称将用于生成您的独立站网址，必须包含英文字母，支持英文字母、数字和连字符组合
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === "password" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        登录密码
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="请设置登录密码"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 rounded-lg h-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        为了账号安全，密码必须包含至少8个字符，并包含字母和数字的组合
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-2 pb-4">
                <div className="flex gap-3 w-full">
                  {step !== "role" && (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 rounded-lg h-10 font-medium hover:bg-gray-100"
                      onClick={prevStep}
                    >
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      返回上一步
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="flex-1 rounded-lg h-10 font-medium shadow-md hover:shadow-lg transition-all"
                    disabled={loading}
                  >
                    {step === "password" ? (
                      loading ? (
                        <div className="flex items-center justify-center">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          注册中...
                        </div>
                      ) : (
                        "完成注册"
                      )
                    ) : (
                      <>
                        下一步
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <div className="text-center text-xs sm:text-sm text-muted-foreground">
                  已有账号？{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    返回登录
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          <div className="text-center lg:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
              注册即表示您同意我们的
              <Link
                href="/terms"
                className="text-primary hover:text-primary/80 ml-1"
              >
                服务条款
              </Link>
              和
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 ml-1"
              >
                隐私政策
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
