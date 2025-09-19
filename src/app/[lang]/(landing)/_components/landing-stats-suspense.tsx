import { msg } from "@lingui/core/macro";
import { CoinsIcon, PickaxeIcon, UsersIcon } from "lucide-react";
import { type FC, type PropsWithChildren, Suspense } from "react";
import { SkeletonStats } from "@/app/_components/skeleton-stats";

export const LandingStatsSuspense: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Suspense
      fallback={
        <SkeletonStats
          items={[
            {
              title: msg`auction`,
              icon: PickaxeIcon,
            },
            {
              title: msg`bid`,
              icon: CoinsIcon,
            },
            {
              title: msg`user`,
              icon: UsersIcon,
            },
          ]}
        />
      }
    >
      {children}
    </Suspense>
  );
};
