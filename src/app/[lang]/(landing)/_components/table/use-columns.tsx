"use client";

import { Trans } from "@lingui/react/macro";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { CategoryBadge } from "@/app/_components/category-badge";
import type { Auction } from "@/domain/auction";
import { AuctionTableCurrency } from "./auction-table-currency";
import { AuctionTableImage } from "./auction-table-image";

export const useColumns: () => ColumnDef<Auction>[] = () => {
  return useMemo(() => {
    return [
      {
        accessorKey: "title",
        header: () => (
          <div className="font-semibold">
            <Trans>Title</Trans>
          </div>
        ),
      },
      {
        accessorKey: "images",
        header: () => (
          <div className="font-semibold">
            <Trans>Images</Trans>
          </div>
        ),
        cell: ({ row }) => {
          return (
            <AuctionTableImage url={row.original.images?.at(0)?.url ?? null} />
          );
        },
      },
      {
        accessorKey: "category",
        header: () => (
          <div className="font-semibold">
            <Trans>Category</Trans>
          </div>
        ),
        cell: ({ row }) => {
          return <CategoryBadge category={row.original.category} />;
        },
      },
      {
        accessorKey: "startingPrice",
        header: () => (
          <div className="font-semibold">
            <Trans>Starting Price</Trans>
          </div>
        ),
        cell: ({ row }) => {
          return (
            <AuctionTableCurrency value={row.original?.startingPrice ?? null} />
          );
        },
      },
      {
        accessorKey: "currentBid",
        header: () => (
          <div className="font-semibold">
            <Trans>Current Bid</Trans>
          </div>
        ),
        cell: ({ row }) => {
          return (
            <AuctionTableCurrency value={row.original?.currentBid ?? null} />
          );
        },
      },
    ];
  }, []);
};
