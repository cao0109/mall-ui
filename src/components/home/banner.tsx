// home banner
import Image from 'next/image';

import { Button } from '../ui/button';

interface HomeBannerProps {
  title: string;
  subtitle: string;
  cta: string;
}

export default function HomeBanner({ title, subtitle, cta }: HomeBannerProps) {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-xl">
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
        alt="Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold text-white">{title}</h1>
            <p className="mb-8 text-xl text-white/90">{subtitle}</p>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              {cta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
