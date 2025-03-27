export default function DataOverview() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          100万+
        </div>
        <div className="text-sm text-muted-foreground">精选商品</div>
      </div>
      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">5000+</div>
        <div className="text-sm text-muted-foreground">优质供应商</div>
      </div>
      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">48H</div>
        <div className="text-sm text-muted-foreground">极速发货</div>
      </div>
      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">30%↑</div>
        <div className="text-sm text-muted-foreground">利润空间</div>
      </div>
    </section>
  );
}
