import { Plural } from "@lingui/react/macro";
import { CoinsIcon, PickaxeIcon, UsersIcon } from "lucide-react";
import type { FC } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { auctions } from "@/core/instances/auctions";
import { bids } from "@/core/instances/bids";
import { users } from "@/core/instances/users";

export const AuctionsStatsData: FC = async () => {
  const [totalAuctions, totalBids, totalUsers] = await Promise.all([
    auctions().count(),
    bids().count(),
    users().count(),
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl">{totalUsers}</CardTitle>
            <Plural _0="user" one="user" other="users" value={totalUsers} />
          </div>
          <UsersIcon size={42} />
        </CardContent>
      </Card>
    </div>
  );
};
