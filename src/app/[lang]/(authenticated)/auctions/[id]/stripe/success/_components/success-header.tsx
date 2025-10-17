import { Trans } from "@lingui/react/macro";
import { CoinsIcon, TrophyIcon } from "lucide-react";
import type { FC } from "react";
import Stripe from "stripe";
import { FormatCurrency } from "@/app/_components/format-currency";
import type { AuctionDetails } from "@/core/domains/auction";
import { HeaderCard } from "../../_components/header-card";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";

type Props = {
  auction: AuctionDetails;
  stripeSessionId: string;
};

export const SuccessHeaderCard: FC<Props> = async (props) => {
  const { auction, stripeSessionId } = props;

  const stripe = new Stripe(STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
  const isPaid =
    session.payment_status === "paid" || session.status === "complete";

  const mobileHeader = isPaid ? (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <TrophyIcon className="size-4 text-amber-500" />
        <Trans>You successfully paid this auction.</Trans>
      </div>
      <div className="flex items-center gap-2">
        <CoinsIcon className="size-4 text-amber-500" />
        <Trans>Amout paid</Trans>:
        <FormatCurrency value={auction.highestBid ?? null} />
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Trans>
        You did not pay this auction yet. Contact us for more information.
      </Trans>
    </div>
  );

  const tabletHeader = (
    <div className="flex flex-col gap-4 text-lg">
      {isPaid ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TrophyIcon className="size-6 text-amber-500" />
            <Trans>You successfully paid this auction.</Trans>
          </div>
          <div className="flex items-center gap-2">
            <CoinsIcon className="size-6 text-amber-500" />
            <Trans>Amout paid</Trans>:
            <FormatCurrency value={auction.highestBid ?? null} />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Trans>
            You did not pay this auction yet. Contact us for more information.
          </Trans>
        </div>
      )}
    </div>
  );

  return (
    <HeaderCard
      auction={auction}
      mobileHeader={mobileHeader}
      tabletHeader={tabletHeader}
    />
  );
};
