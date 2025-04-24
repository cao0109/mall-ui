export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl py-8">
        <div className="animate-pulse space-y-8">
          {/* 面包屑导航骨架屏 */}
          <div className="flex items-center space-x-2">
            <div className="h-4 w-16 rounded bg-muted"></div>
            <div className="h-4 w-4 rounded bg-muted"></div>
            <div className="h-4 w-16 rounded bg-muted"></div>
            <div className="h-4 w-4 rounded bg-muted"></div>
            <div className="h-4 w-24 rounded bg-muted"></div>
          </div>

          {/* 商品内容骨架屏 */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="sticky top-4 h-fit space-y-6">
              <div className="aspect-square rounded-xl bg-muted"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square rounded-lg bg-muted"></div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded bg-muted"></div>
                <div className="h-4 w-full rounded bg-muted"></div>
              </div>
              <div className="space-y-4">
                <div className="h-10 w-1/3 rounded bg-muted"></div>
                <div className="flex gap-4">
                  <div className="h-6 w-16 rounded bg-muted"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
