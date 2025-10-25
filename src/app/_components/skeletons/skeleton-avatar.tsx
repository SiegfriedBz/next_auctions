import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SkeletonH4 } from "./skeleton-h4";
import { SkeletonH5 } from "./skeleton-h5";

type Props = {
  className?: string;
};

export const SkeletonAvatar: FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className="flex items-center space-x-2">
      <Skeleton className={cn("size-12 rounded-md", className)} />
      <div className="sm:space-y-1">
        <SkeletonH4 className="w-32 sm:w-[184px]" />
        <SkeletonH5 className="max-sm:hidden sm:w-[216px]" />
      </div>
    </div>
  );
};
