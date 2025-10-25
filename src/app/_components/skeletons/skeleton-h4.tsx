import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const SkeletonH4: FC<Props> = (props) => {
  const { className } = props;

  return <Skeleton className={cn("w-14 h-7 rounded-lg", className)} />;
};
