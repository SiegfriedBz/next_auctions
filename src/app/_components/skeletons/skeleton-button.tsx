import type { FC, PropsWithChildren } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const SkeletonButton: FC<PropsWithChildren<Props>> = (props) => {
  const { children, className } = props;
  return (
    <Skeleton
      className={cn("w-18 h-8 rounded-lg whitespace-nowrap", className)}
    >
      {children}
    </Skeleton>
  );
};
