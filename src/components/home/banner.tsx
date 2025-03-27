// home banner
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function HomeBanner() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {[1, 2, 3].map((_, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[200px] sm:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                alt="Banner"
                className="w-full h-full object-cover"
                layout="fill"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="container">
                  <div className="max-w-lg text-white p-4 sm:p-0">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
                      新品特惠
                    </h1>
                    <p className="text-base sm:text-lg mb-4 sm:mb-6">
                      精选优质商品，限时折扣中
                    </p>
                    <Button size="sm" className="sm:hidden">
                      立即查看
                    </Button>
                    <Button size="lg" className="hidden sm:inline-flex">
                      立即查看
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
