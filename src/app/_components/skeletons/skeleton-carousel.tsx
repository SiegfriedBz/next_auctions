import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCarousel: FC = () => {
  return (
    <>
      <Skeleton className="max-[375px]:hidden size-8 rounded-full mr-2 sm:-mr-2 flex justify-center items-center">
        <MoveLeftIcon className="size-3 opacity-70" />
      </Skeleton>
      <Skeleton className="min-h-46 min-w-46 sm:size-[16rem] mx-4 rounded-lg" />
      <Skeleton className="max-[375px]:hidden size-8 rounded-full ml-2 sm:-ml-2 flex justify-center items-center">
        <MoveRightIcon className="size-3 opacity-70" />
      </Skeleton>
    </>
  );
};
