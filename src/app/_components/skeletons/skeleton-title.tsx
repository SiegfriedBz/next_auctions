import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
export const SkeletonTitle: FC<Props> = (props) => {
  const { className } = props;
  return (
    <Skeleton
      className={cn("border-b pb-2 h-5 sm:h-6 md:h-8 rounded-lg", className)}
    />
  );
};
