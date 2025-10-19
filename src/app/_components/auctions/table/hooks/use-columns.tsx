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

type Params = {
  meId?: string;
  withRowActions?: boolean;
};

export const useColumns = (params: Params): ColumnDef<Auction>[] => {
  const { withRowActions = true, meId } = params;

  return useMemo(() => {
    const columns: ColumnDef<Auction>[] = [
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
          return <AuctionTableImage url={row.original.images?.at(0) ?? null} />;
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
        accessorKey: "highestBid",
        header: () => (
          <div className="font-semibold">
            <Trans>Highest Bid</Trans>
          </div>
        ),
        cell: ({ row }) => {
          return <FormatCurrency value={row.original?.highestBid ?? null} />;
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
    ];

    if (withRowActions) {
      columns.push({
        id: "actions",
        cell: ({ row }) => <RowAction meId={meId} auction={row.original} />,
      });
    }

    return columns;
  }, [withRowActions, meId]);
};
