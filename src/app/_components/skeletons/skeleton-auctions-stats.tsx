import { msg } from "@lingui/core/macro";
import { CoinsIcon, PickaxeIcon, UsersIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { SkeletonStats } from "@/app/_components/skeletons/skeleton-stats";

type Props = {
  isMe?: boolean;
  className?: string;
};

export const SkeletonAuctionsStats: FC<PropsWithChildren<Props>> = (props) => {
  const { isMe = false, className } = props;

  const items = [
    {
      title: msg`auction`,
      icon: PickaxeIcon,
    },
    {
      title: msg`bid`,
      icon: CoinsIcon,
    },
  ];

  if (!isMe) {
    items.push({
      title: msg`user`,
      icon: UsersIcon,
    });
  }

  return <SkeletonStats items={items} isMe={isMe} className={className} />;
};
