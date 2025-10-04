import { msg } from "@lingui/core/macro";
import { CoinsIcon, PickaxeIcon, UsersIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { SkeletonStats } from "@/app/_components/skeletons/skeleton-stats";

export const SkeletonAuctionsStats: FC<PropsWithChildren> = () => {
  return (
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
  );
};
