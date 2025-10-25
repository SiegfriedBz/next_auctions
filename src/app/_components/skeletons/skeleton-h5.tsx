import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const SkeletonH5: FC<Props> = (props) => {
  const { className } = props;

  return <Skeleton className={cn("w-18 h-4 rounded-lg", className)} />;
};
