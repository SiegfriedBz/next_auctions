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
      <div className="rounded-md self-center flex justify-center items-center bg-secondary/50 size-32 sm:size-44 md:size-72 mx-auto sm:mx-8">
        <CircleOffIcon size={32} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <Carousel
      className="w-full max-w-[21rem] sm:max-w-[16rem] mx-auto max-sm:px-6"
      // orientation="vertical"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="-mt-1">
        {urls.map((url, idx) => {
          return (
            <CarouselItem
              className="pt-1"
              key={`${url}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <transient fix>
                idx
              }`}
            >
              <Card className="border-0">
                <CardContent className="relative aspect-square rounded-lg overflow-hidden flex items-center justify-center">
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
