"use client";

import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type { ComponentProps, FC } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Auction } from "@/core/domains/auction";
import { useAuctionsTable } from "./hooks/use-auctions-table";

type Props = ComponentProps<typeof TableHeader>;

export const AuctionsTableHeader: FC<Props> = (props) => {
  const table: TanstackTable<Auction> = useAuctionsTable();

  return (
    <TableHeader {...props}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};
