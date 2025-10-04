"use client";

import { Trans } from "@lingui/react/macro";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { AuctionCategoryBadge } from "@/app/_components/auctions/auction-category-badge";
import { AuctionStatusBadge } from "@/app/_components/auctions/auction-status-badge";
import type { Auction } from "@/core/domains/auction";
import { FormatCurrency } from "../../../format-currency";
import { FormatDate } from "../../../format-date";
import { RowAction } from "../row-actions";
import { AuctionTableImage } from "../table-image";

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
          return <AuctionCategoryBadge category={row.original.category} />;
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
          return <FormatCurrency value={row.original?.startingPrice ?? null} />;
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
          return <FormatCurrency value={row.original?.currentBid ?? null} />;
        },
      },
      {
        accessorKey: "status",
        header: () => (
          <div className="font-semibold">
            <Trans>Status</Trans>
          </div>
        ),
        cell: ({ row }) => {
          return <AuctionStatusBadge status={row.original.status} />;
        },
      },
      {
        accessorKey: "endAt",
        header: () => (
          <div className="font-semibold">
            <Trans>Ends</Trans>
          </div>
        ),
        cell: ({ row }) => {
          return <FormatDate value={row.original.endAt ?? null} />;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => <RowAction auction={row.original} />,
      },
    ];
  }, []);
};
