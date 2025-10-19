import { Trans } from "@lingui/react/macro";
import type { FC } from "react";
import { AuctionCategoryBadge } from "@/app/_components/auctions/auction-category-badge";
import { AuctionStatusBadge } from "@/app/_components/auctions/auction-status-badge";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuctionDetails } from "@/core/domains/auction";

type HeaderCardProps = {
  auction: Pick<AuctionDetails, "title" | "category" | "owner" | "status">;
  mobileHeader: React.ReactNode;
  tabletHeader: React.ReactNode;
};

export const HeaderCard: FC<HeaderCardProps> = async (props) => {
  const {
    auction: { title, category, owner, status },
    mobileHeader,
    tabletHeader,
  } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start h-full">
          <div className="flex flex-col gap-2 max-sm:gap-4">
            <h2 className="text-2xl font-semibold">{title}</h2>

            <div className="flex gap-x-4 items-center">
              <AuctionCategoryBadge category={category} />
              <div className="sm:hidden">
                <AuctionStatusBadge status={status} />
              </div>
            </div>

            <div className="mt-2 flex flex-col">
              <span className="text-lg">
                <Trans>Contact owner</Trans>:
              </span>
              <div className="-ml-4">
                {owner && <UserAvatar user={owner} />}
              </div>
            </div>

            <div className="sm:hidden flex flex-col gap-4 text-lg font-medium">
              {mobileHeader}
            </div>
          </div>

          <div className="max-sm:hidden flex flex-col justify-between items-end h-full">
            {tabletHeader}
            <AuctionStatusBadge status={status} />
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
