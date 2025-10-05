import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const SkeletonAvatar: FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className="flex items-center space-x-2">
      <Skeleton className={cn("size-10 rounded-md", className)} />
      <div className="space-y-4">
        <Skeleton className="h-5 sm:h-6 w-[184px]" />
        <Skeleton className="h-4 sm:h-5 w-[232px]" />
      </div>
    </div>
  );
};
