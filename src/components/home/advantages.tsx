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
      <h2 className="text-2xl font-semibold mb-8">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="p-6 rounded-lg bg-card border shadow-sm">
            <h3 className="font-medium mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
