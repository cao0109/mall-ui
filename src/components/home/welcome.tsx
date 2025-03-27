import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function WelcomeSection() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  return (
    <section className="py-8 md:py-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          一站式跨境电商选品平台
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          海量优质货源，专业供应链支持，助您打造爆款店铺
        </p>
        {!isAuthenticated && (
          <div className="flex justify-center gap-4 mt-6">
            <Button size="lg" onClick={() => router.push("/auth/register")}>
              开店赚钱
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/auth/login")}
            >
              商家登录
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
