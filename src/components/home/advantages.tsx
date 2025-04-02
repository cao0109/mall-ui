interface AdvantagesProps {
  title: string;
  items: {
    title: string;
    description: string;
  }[];
}

export default function Advantages({ title, items }: AdvantagesProps) {
  return (
    <div className="text-center">
      <h2 className="mb-8 text-2xl font-semibold">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 font-medium">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
