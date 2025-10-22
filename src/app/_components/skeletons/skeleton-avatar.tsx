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
      <Skeleton className={cn("size-12 rounded-md", className)} />
      <div className="space-y-2">
        <Skeleton className="h-3 sm:h-4 w-32 sm:w-[184px]" />
        <Skeleton className="max-sm:hidden h-4 w-[224px]" />
      </div>
    </div>
  );
};
