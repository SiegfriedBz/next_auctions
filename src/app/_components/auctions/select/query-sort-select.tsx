"use client";

import { msg } from "@lingui/core/macro";
import { ArrowDownIcon, ArrowUpIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { type FC, useCallback } from "react";
import { sortParsers } from "@/app/[lang]/search.params";
import { Button } from "@/components/ui/button";
import {
  type AuctionsSortKey,
  AuctionsSortKeySchema,
  type AuctionsSortOrder,
  AuctionsSortOrderSchema,
} from "@/core/domains/auction";
import { SelectFor, type SelectOption } from "../../select-for";
import { AuctionSortKeyToMessage } from "../message/auction-sort-key-to-message";

export const SORT_KEY_OPTIONS = Object.keys(AuctionsSortKeySchema.enum).map(
  (key) => {
    return {
      value: key as AuctionsSortKey,
      label: AuctionSortKeyToMessage[key as AuctionsSortKey],
    };
  },
);

const SORT_ORDER_OPTIONS: SelectOption<AuctionsSortOrder>[] = [
  {
    value: AuctionsSortOrderSchema.enum.asc,
    label: msg`Ascending`,
    icon: ArrowUpIcon,
  },
  {
    value: AuctionsSortOrderSchema.enum.desc,
    label: msg`Descending`,
    icon: ArrowDownIcon,
  },
];

export const QuerySortSelect: FC = () => {
  // URL state for sort key and order
  const [sortKey, setSortKey] = useQueryState("key", sortParsers.key);
  const [sortOrder, setSortOrder] = useQueryState("order", sortParsers.order);

  const onKeyChange = useCallback(
    (key: string) => setSortKey(key as typeof sortKey),
    [setSortKey],
  );

  const onOrderChange = useCallback(
    (order: string) => setSortOrder(order as typeof sortOrder),
    [setSortOrder],
  );

  const onReset = useCallback(() => {
    setSortKey(null); // removes from URL
    setSortOrder(null);
  }, [setSortKey, setSortOrder]);

  return (
    <div className="flex gap-x-2 max-w-[28rem] justify-between items-center">
      {/* Sort Field */}
      <SelectFor<AuctionsSortKey>
        options={SORT_KEY_OPTIONS}
        value={sortKey ?? undefined}
        onChange={onKeyChange}
        placeholder={msg`Sort by`}
        className="w-full min-w-44"
      />

      {/* Sort Order */}
      <SelectFor<AuctionsSortOrder>
        options={SORT_ORDER_OPTIONS}
        value={sortOrder ?? undefined}
        onChange={onOrderChange}
        placeholder={msg`Sort order`}
        className="w-full min-w-44"
      />

      <Button
        onClick={onReset}
        size={"sm"}
        variant={"ghost"}
        className="flex justify-center items-center cursor-pointer"
      >
        <XIcon />
      </Button>
    </div>
  );
};
