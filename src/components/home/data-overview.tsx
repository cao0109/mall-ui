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
      <h2 className="text-2xl font-semibold mb-8">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="p-6 rounded-lg bg-card border shadow-sm">
            <div className="text-3xl font-bold text-primary mb-2">
              {item.value}
            </div>
            <div className="text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
