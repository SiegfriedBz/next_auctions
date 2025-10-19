import { Trans } from "@lingui/react/macro";
import type { FC } from "react";
import { AuctionCategoryBadge } from "@/app/_components/auctions/auction-category-badge";
import { AuctionStatusBadge } from "@/app/_components/auctions/auction-status-badge";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH4 } from "@/app/_components/typography/h4";
import { TypographyLead } from "@/app/_components/typography/lead";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuctionDetails } from "@/core/domains/auction";

type HeaderCardProps = {
  auction: Pick<AuctionDetails, "title" | "category" | "owner" | "status">;
  header: React.ReactNode;
};

export const HeaderCard: FC<HeaderCardProps> = async (props) => {
  const {
    auction: { title, category, owner, status },
    header,
  } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start h-full">
          <div className="flex flex-col gap-2 max-sm:gap-4">
            <TypographyH2 className="border-0 capitalize">{title}</TypographyH2>

            <div className="flex gap-x-4 items-center">
              <AuctionCategoryBadge category={category} />
              <div className="sm:hidden">
                <AuctionStatusBadge status={status} />
              </div>
            </div>

            <div className="mt-2 flex flex-col">
              <TypographyLead>
                <Trans>Contact owner</Trans>:
              </TypographyLead>
              <div className="-ml-4">
                {owner && <UserAvatar user={owner} />}
              </div>
            </div>

            <div className="sm:hidden flex flex-col gap-4">{header}</div>
          </div>

          <div className="max-sm:hidden flex flex-col justify-between items-end h-full">
            {header}
            <AuctionStatusBadge status={status} />
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
