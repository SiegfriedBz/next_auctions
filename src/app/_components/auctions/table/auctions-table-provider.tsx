"use client";

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { FC, PropsWithChildren } from "react";
import type { Auction } from "@/core/domains/auction";
import { cn } from "@/lib/utils";
import { AuctionsTableContext } from "./hooks/use-auctions-table";
import { useColumns } from "./hooks/use-columns";
import { usePagination } from "./hooks/use-pagination";

type Props = {
  data: Auction[];
  count: number;
  className?: string;
  meId?: string;
};

export const AuctionsTableProvider: FC<PropsWithChildren<Props>> = (props) => {
  const { data, count, meId, className, children } = props;

  const columns = useColumns({ meId });
  const { pagination, onPaginationChange } = usePagination();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: count,
    manualFiltering: true,
    manualPagination: true,
    autoResetPageIndex: false,
    onPaginationChange,
    state: {
      pagination,
    },
  });

  return (
    <AuctionsTableContext.Provider value={table}>
      <div className={cn("overflow-hidden", className)}>{children}</div>
    </AuctionsTableContext.Provider>
  );
};
