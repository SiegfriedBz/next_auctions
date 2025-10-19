"use client";

import { Trans } from "@lingui/react/macro";
import { type FC, useCallback } from "react";
import { createCheckoutSession } from "@/actions/stripe/create-checkout-session";
import { Button } from "@/components/ui/button";
import type { LangParam } from "@/i18n";

type Props = {
  auctionId: string;
} & LangParam;

export const InitiatePaymentButton: FC<Props> = (props) => {
  const { auctionId, lang } = props;

  const onCreateCheckout = useCallback(async () => {
    await createCheckoutSession({ auctionId, lang });
  }, [auctionId, lang]);

  return (
    <Button
      onClick={onCreateCheckout}
      type="button"
      size="lg"
      className="cursor-pointer"
    >
      <Trans>You won this auction</Trans>
    </Button>
  );
};
