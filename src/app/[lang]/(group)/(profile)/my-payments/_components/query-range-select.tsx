"use client";

import { msg } from "@lingui/core/macro";
import { XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { type FC, useCallback } from "react";
import { SelectFor } from "@/app/_components/select-for";
import { Button } from "@/components/ui/button";
import { type PaymentRange, PaymentRangeSchema } from "@/core/domains/payment";
import { cn } from "@/lib/utils";
import { filterParsers } from "../search.params";
import { PaymentRangeToMessage } from "./payment-range-to-message";

export const PAYMENT_RANGE_OPTIONS = Object.keys(PaymentRangeSchema.enum).map(
  (key) => {
    return {
      value: key as PaymentRange,
      label: PaymentRangeToMessage[key as PaymentRange],
    };
  },
);

type Props = {
  className?: string;
};

export const QueryRangeSelect: FC<Props> = (props) => {
  const { className } = props;
  const [range, setRange] = useQueryState("range", filterParsers.range);

  const onReset = useCallback(() => {
    setRange(null); // removes from URL
  }, [setRange]);

  return (
    <div
      className={cn(
        "flex gap-x-2 max-w-44 sm:max-w-64 justify-between items-center",
        className,
      )}
    >
      <SelectFor<PaymentRange>
        className="sm:min-w-44 w-fit"
        options={PAYMENT_RANGE_OPTIONS}
        value={range ?? undefined}
        onChange={setRange}
        placeholder={msg`Select a range`}
        key={range}
      />
      <Button
        onClick={onReset}
        disabled={!range}
        size={"sm"}
        variant={"ghost"}
        className="flex justify-center items-center cursor-pointer"
      >
        <XIcon />
      </Button>
    </div>
  );
};
