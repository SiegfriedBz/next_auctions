import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonAvatar: FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-[184px]" />
        <Skeleton className="h-3 w-[232px]" />
      </div>
    </div>
  );
};
