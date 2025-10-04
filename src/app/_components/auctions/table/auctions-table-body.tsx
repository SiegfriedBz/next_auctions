"use client";

import { Trans } from "@lingui/react/macro";
import type { Table as TanstackTable } from "@tanstack/react-table";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Auction } from "@/core/domains/auction";
import { AuctionsClickableTableRow } from "./auctions-clickable-table-row";
import { useAuctionsTable } from "./hooks/use-auctions-table";

type Props = ComponentProps<typeof TableBody>;

export const AuctionsTableBody: FC<PropsWithChildren<Props>> = (props) => {
  const table: TanstackTable<Auction> = useAuctionsTable();

  return (
    <TableBody {...props}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => {
          return <AuctionsClickableTableRow key={row.id} row={row} />;
        })
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            <Trans>No results.</Trans>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
