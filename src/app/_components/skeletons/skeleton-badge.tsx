import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export const SkeletonBadge: FC<Props> = (props) => {
  const { className } = props;
  return (
    <Skeleton
      className={cn(
        "w-16 h-6 rounded-lg px-2 py-0.5 sm:px-3 sm:py-1",
        className,
      )}
    />
  );
};
