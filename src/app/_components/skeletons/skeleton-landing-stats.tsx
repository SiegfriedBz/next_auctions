import { msg } from "@lingui/core/macro";
import { CoinsIcon, GavelIcon, PickaxeIcon, UsersIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { SkeletonStats } from "@/app/_components/skeletons/skeleton-stats";

export const SkeletonLandingStats: FC<PropsWithChildren> = () => {
  return (
    <SkeletonStats
      items={[
        {
          title: msg`auction`,
          icon: GavelIcon,
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
  );
};
