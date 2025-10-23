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
      className={cn(
        "flex justify-center items-center w-32 h-8 rounded-lg whitespace-nowrap",
        className,
      )}
    >
      {children}
    </Skeleton>
  );
};

export const SkeletonButtonGhost: FC<PropsWithChildren<Props>> = (props) => {
  const { children, className } = props;
  return (
    <SkeletonButton className={cn("border", className)}>
      {children}
    </SkeletonButton>
  );
};
