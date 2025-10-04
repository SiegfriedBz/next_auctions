import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTable: FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  );
};
