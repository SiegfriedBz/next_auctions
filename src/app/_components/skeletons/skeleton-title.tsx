import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTitle: FC = () => {
  return <Skeleton className="w-32 h-9 rounded-lg" />;
};
