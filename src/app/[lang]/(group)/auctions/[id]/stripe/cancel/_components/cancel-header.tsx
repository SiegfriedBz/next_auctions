import { Trans, useLingui } from "@lingui/react/macro";
import { CircleMinusIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import type { AuctionDetails } from "@/core/domains/auction";
import { HeaderCard } from "../../_components/header-card";

type Props = {
  auction: AuctionDetails;
};

export const CancelHeaderCard: FC<Props> = async (props) => {
  const { auction } = props;

  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const mobileHeader = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <CircleMinusIcon className="size-4 text-red-500" />
        <Trans>Payment Cancelled.</Trans>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Trans>Your transaction was not completed.</Trans>
        <Button asChild size={"lg"}>
          <Link
            href={`/${lang}/auctions/${auction.id}`}
            className="text-lg font-semibold w-full"
          >
            <Trans>Retry the payment here</Trans>
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <HeaderCard
      auction={auction}
      mobileHeader={mobileHeader}
      tabletHeader={mobileHeader}
    />
  );
};
