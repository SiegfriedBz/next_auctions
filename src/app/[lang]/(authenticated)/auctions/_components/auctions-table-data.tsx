import type { FC } from "react";
import {
  AuctionsTableBody,
  AuctionsTableHeader,
  AuctionsTablePagination,
  AuctionsTableProvider,
  AuctionsTableToolbar,
} from "@/app/_components/auctions/table";
import { searchParamsCache } from "@/app/[lang]/search.params";
import { Table } from "@/components/ui/table";
import { auctions } from "@/core/instances/auctions";

export const AuctionsTableData: FC = async () => {
  const { pageIndex, pageSize, ...rest } = searchParamsCache.all();

  const filterBy = {
    title: rest.title ?? undefined,
    category: rest.category ?? undefined,
    status: rest.status ?? undefined,
  };

  const orderBy =
    rest.key && rest.order ? { key: rest.key, order: rest.order } : undefined;

  const pagination = {
    page: pageIndex,
    size: pageSize,
  };

  const { list, total } = await auctions().listing({
    filterBy,
    orderBy,
    pagination,
  });

  return (
    <>
      <AuctionsTableToolbar filteredCount={total} canCreate />
      <AuctionsTableProvider data={list} count={total} className="space-y-4">
        <Table className="rounded-md border">
          <AuctionsTableHeader />
          <AuctionsTableBody />
        </Table>
        <AuctionsTablePagination />
      </AuctionsTableProvider>
    </>
  );
};
