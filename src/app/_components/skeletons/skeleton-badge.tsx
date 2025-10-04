import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export const SkeletonBadge: FC<Props> = (props) => {
  const { className } = props;
  return <Skeleton className={cn("w-16 h-6 rounded-lg", className)} />;
};
