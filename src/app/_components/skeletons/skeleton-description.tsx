import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const SkeletonDescription: FC<Props> = (props) => {
  const { className } = props;
  return <Skeleton className={cn("w-44 h-6 rounded-lg", className)} />;
};
