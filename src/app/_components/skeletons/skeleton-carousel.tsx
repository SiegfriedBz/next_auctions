import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCarousel: FC = () => {
  return (
    <>
      <Skeleton className="size-8 rounded-full mr-2 sm:-mr-2 flex justify-center items-center">
        <MoveLeftIcon className="opacity-70" size={12} />
      </Skeleton>
      <Skeleton className="size-[21rem] sm:size-[16rem] mx-auto sm:mx-4 rounded-lg" />
      <Skeleton className="size-8 rounded-full ml-2 sm:-ml-2 flex justify-center items-center">
        <MoveRightIcon className="opacity-70" size={12} />
      </Skeleton>
    </>
  );
};
