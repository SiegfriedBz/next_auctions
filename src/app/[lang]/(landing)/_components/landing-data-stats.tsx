import { Plural } from "@lingui/react/macro";
import { CoinsIcon, PickaxeIcon, UsersIcon } from "lucide-react";
import type { FC } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const getData = async () => {
  return {
    totalAuctions: 12,
    totalBids: 24,
    totalUsers: 32,
  };
};

export const LandingDataStats: FC = async () => {
  const { totalAuctions, totalBids, totalUsers } = await getData();
  await new Promise((res) => setTimeout(res, 2_000));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle>{totalAuctions}</CardTitle>
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
            <CardTitle>{totalBids}</CardTitle>
            <Plural _0="bid" one="bid" other="bids" value={totalBids} />
          </div>
          <CoinsIcon size={42} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle>{totalUsers}</CardTitle>
            <Plural _0="user" one="user" other="users" value={totalUsers} />
          </div>
          <UsersIcon size={42} />
        </CardContent>
      </Card>
    </div>
  );
};
