import { Trans, useLingui } from "@lingui/react/macro";
import { CircleMinusIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { TypographyH4 } from "@/app/_components/typography/h4";
import { TypographyLead } from "@/app/_components/typography/lead";
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

  const header = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <CircleMinusIcon className="size-4 text-red-500" />
        <TypographyH4>
          <Trans>Payment Cancelled.</Trans>
        </TypographyH4>
      </div>
      <div className="flex flex-col items-start gap-2">
        <TypographyLead>
          <Trans>Your transaction was not completed.</Trans>
        </TypographyLead>

        <Button asChild size={"lg"}>
          <Link
            href={`/${lang}/auctions/${auction.id}`}
            className="text-lg font-semibold w-full"
          >
            <Trans>Retry the payment here.</Trans>
          </Link>
        </Button>
      </div>
    </div>
  );

  return <HeaderCard auction={auction} header={header} />;
};
