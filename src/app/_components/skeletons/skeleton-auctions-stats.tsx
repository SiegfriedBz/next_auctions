import { msg } from "@lingui/core/macro";
import { CoinsIcon, GavelIcon, UsersIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { SkeletonStats } from "@/app/_components/skeletons/skeleton-stats";

type Props = {
  isMyAuctionsPage?: boolean;
  className?: string;
};

export const SkeletonAuctionsStats: FC<PropsWithChildren<Props>> = (props) => {
  const { isMyAuctionsPage = false, className } = props;

  const items = [
    {
      title: msg`auction`,
      icon: GavelIcon,
    },
    {
      title: msg`bid`,
      icon: CoinsIcon,
    },
  ];

  if (!isMyAuctionsPage) {
    items.push({
      title: msg`user`,
      icon: UsersIcon,
    });
  }

  return (
    <SkeletonStats
      items={items}
      isMyAuctionsPage={isMyAuctionsPage}
      className={className}
    />
  );
};
