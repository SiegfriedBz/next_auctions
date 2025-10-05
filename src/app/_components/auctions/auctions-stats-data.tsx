import { Plural } from "@lingui/react/macro";
import { CoinsIcon, PickaxeIcon, UsersIcon } from "lucide-react";
import type { FC } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { User } from "@/core/domains/user";
import { auctions } from "@/core/instances/auctions";
import { bids } from "@/core/instances/bids";
import { users } from "@/core/instances/users";
import { cn } from "@/lib/utils";

type Props = {
  isMe?: boolean;
  className?: string;
};

export const AuctionsStatsData: FC<Props> = async (props) => {
  const { isMe = false, className } = props;

  let me: User | null = null;
  let totalUsers: number = 0;

  if (isMe) {
    me = await users().me();
  } else {
    totalUsers = await users().count();
  }

  const [totalAuctions, totalBids] = await Promise.all([
    auctions().count({
      filterBy: {
        ownerId: me?.id ?? undefined,
      },
    }),
    bids().count({
      filterBy: {
        bidderId: me?.id ?? undefined,
      },
    }),
  ]);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4",
        {
          "lg:grid-cols-3": !isMe,
        },
        className,
      )}
    >
      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl">{totalAuctions}</CardTitle>
            <Plural
              _0="auction"
              one="auction"
              other="auctions"
              value={totalAuctions}
            />
          </div>
          <PickaxeIcon size={42} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl">{totalBids}</CardTitle>
            <Plural _0="bid" one="bid" other="bids" value={totalBids} />
          </div>
          <CoinsIcon size={42} />
        </CardContent>
      </Card>

      {!isMe && (
        <Card>
          <CardContent className="flex-1 flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-3xl">{totalUsers}</CardTitle>
              <Plural _0="user" one="user" other="users" value={totalUsers} />
            </div>
            <UsersIcon size={42} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
