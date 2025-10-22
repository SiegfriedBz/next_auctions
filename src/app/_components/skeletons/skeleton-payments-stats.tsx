import { msg } from "@lingui/core/macro";
import { CoinsIcon, GavelIcon, HandCoinsIcon, UsersIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { SkeletonStats } from "@/app/_components/skeletons/skeleton-stats";

type Props = {
  className?: string;
};

export const SkeletonPaymentsStats: FC<PropsWithChildren<Props>> = (props) => {
  const { className } = props;

  const items = [
    {
      title: msg`Total received`,
      icon: HandCoinsIcon,
    },
    {
      title: msg`Total paid`,
      icon: CoinsIcon,
    },
  ];

  return (
    <SkeletonStats
      items={items}
      isCurrentUserStats={true}
      className={className}
    />
  );
};
