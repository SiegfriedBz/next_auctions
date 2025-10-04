"use client";

import { useLingui } from "@lingui/react/macro";
import { flexRender, type Row } from "@tanstack/react-table";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Auction } from "@/core/domains/auction";

type Props = ComponentProps<typeof TableRow> & {
  row: Row<Auction>;
};

export const AuctionsClickableTableRow: FC<Props> = (props) => {
  const { row, ...rest } = props;

  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <TableRow
      {...rest}
      data-state={row.getIsSelected() && "selected"}
      className="relative hover:bg-muted cursor-pointer"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
          <Link
            href={`/${lang}/auctions/${row.original.id}`}
            className="absolute inset-0"
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
