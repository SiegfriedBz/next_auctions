"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { FC } from "react";
import type { Auction } from "@/core/domains/auction";
import { DataTable } from "../../../../../components/ui/data-table";
import { useColumns } from "./use-columns";

type Props = {
  data: Auction[];
  count: number;
};

export const AuctionsTable: FC<Props> = (props) => {
  const { data } = props;

  const columns = useColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} />;
};
