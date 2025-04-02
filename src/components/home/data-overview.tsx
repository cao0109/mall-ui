interface DataOverviewProps {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
}

export default function DataOverview({ title, items }: DataOverviewProps) {
  return (
    <div className="text-center">
      <h2 className="mb-8 text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-2 text-3xl font-bold text-primary">{item.value}</div>
            <div className="text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
