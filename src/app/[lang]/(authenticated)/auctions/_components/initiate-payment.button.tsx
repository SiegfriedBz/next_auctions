"use client";

import { Trans } from "@lingui/react/macro";
import type { FC } from "react";
import { Button } from "@/components/ui/button";

export const InitiatePaymentButton: FC = () => {
  return (
    <Button size="lg" className="cursor-pointer">
      <Trans>You won this auction</Trans>
    </Button>
  );
};
