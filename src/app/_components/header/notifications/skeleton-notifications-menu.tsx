import { BellIcon } from "lucide-react";
import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonNotificationsMenu: FC = () => {
  return (
    <div className={"h-8 sm:h-10 relative opacity-50"}>
      <BellIcon size={12} className="size-8 sm:size-10 opacity-80" />
      <Skeleton className="absolute -top-2.5 -right-3 size-4 rounded-full dark:bg-secondary" />
    </div>
  );
};
