import { CircleOffIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  urls?: string[];
};

export const AuctionCarousel: FC<Props> = (props) => {
  const { urls } = props;

  if (!urls || urls.length === 0) {
    return (
      <div className="rounded-md self-center flex justify-center items-center bg-secondary/50 size-32 sm:size-44 md:size-72 mx-auto">
        <CircleOffIcon size={32} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Carousel
        className="w-54 md:w-72 flex h-full justify-center items-center"
        // orientation="vertical"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="w-50 md:w-68 flex h-full justify-center items-center">
          {urls.map((url, idx) => {
            return (
              <CarouselItem
                className="pt-1"
                key={`${url}-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <transient fix>
                  idx
                }`}
              >
                <Card className="border-0 w-full">
                  <CardContent className="relative flex-1 aspect-square rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={`${url}?t=${Date.now()}`}
                      alt="auction-image"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <span className="absolute text-xl sm:text-2xl font-semibold text-white/90 left-4 bottom-4">
                      {idx + 1}
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="max-[375px]:hidden" />
        <CarouselNext className="max-[375px]:hidden" />
      </Carousel>
    </div>
  );
};
