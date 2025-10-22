import { Plural } from "@lingui/react/macro";
import { CoinsIcon, GavelIcon, UsersIcon } from "lucide-react";
import type { FC } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { User } from "@/core/domains/user";
import { auctions } from "@/core/instances/auctions";
import { bids } from "@/core/instances/bids";
import { users } from "@/core/instances/users";
import { cn } from "@/lib/utils";

type Props = {
  isCurrentUserStats?: boolean;
  className?: string;
};

export const AuctionsStatsServer: FC<Props> = async (props) => {
  const { isCurrentUserStats = true, className } = props;

  let me: User | null = null;
  let totalUsers: number = 0;

  if (isCurrentUserStats) {
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
          "lg:grid-cols-3": !isCurrentUserStats,
        },
        className,
      )}
    >
      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl sm:text-3xl">
              {totalAuctions}
            </CardTitle>
            <Plural
              _0="auction"
              one="auction"
              other="auctions"
              value={totalAuctions}
            />
          </div>
          <GavelIcon size={32} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl sm:text-3xl">{totalBids}</CardTitle>
            <Plural _0="bid" one="bid" other="bids" value={totalBids} />
          </div>
          <CoinsIcon size={32} />
        </CardContent>
      </Card>

      {!isCurrentUserStats && (
        <Card>
          <CardContent className="flex-1 flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl sm:text-3xl">
                {totalUsers}
              </CardTitle>
              <Plural _0="user" one="user" other="users" value={totalUsers} />
            </div>
            <UsersIcon size={32} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
