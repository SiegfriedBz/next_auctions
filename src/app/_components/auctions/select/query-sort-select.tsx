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
    (key: string) => {
      setSortKey(key as typeof sortKey);
      if (key != null && !sortOrder) {
        setSortOrder(AuctionsSortOrderSchema.enum.asc);
      }
    },
    [setSortKey, sortOrder, setSortOrder],
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
    <div className="flex items-center gap-2">
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {/* Sort Field */}
        <SelectFor<AuctionsSortKey>
          options={SORT_KEY_OPTIONS}
          value={sortKey ?? undefined}
          onChange={onKeyChange}
          placeholder={msg`Sort by`}
          className="w-fit min-w-44"
          key={`sortKey-${sortKey?.toString()}`}
        />

        {/* Sort Order */}
        <SelectFor<AuctionsSortOrder>
          options={SORT_ORDER_OPTIONS}
          value={sortOrder ?? undefined}
          onChange={onOrderChange}
          placeholder={msg`Sort order`}
          className="w-fit min-w-44"
          key={`sortOrder-${sortOrder?.toString()}`}
        />
      </div>

      <Button
        onClick={onReset}
        disabled={!sortKey && !sortOrder}
        size={"sm"}
        variant={"ghost"}
        className="flex justify-center items-center cursor-pointer"
      >
        <XIcon />
      </Button>
    </div>
  );
};
