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
import { users } from "@/core/instances/users";

type Props = {
  isMyAuctionsPage?: boolean;
};

export const AuctionsTableServer: FC<Props> = async (props) => {
  const { isMyAuctionsPage = false } = props;

  const { pageIndex, pageSize, ...rest } = searchParamsCache.all();

  const me = await users().me();

  // display current user' auctions if isMyAuctionsPage
  const filterBy = isMyAuctionsPage
    ? {
        ownerId: me?.id ?? undefined,
        title: rest.title ?? undefined,
        category: rest.category ?? undefined,
        status: rest.status ?? undefined,
      }
    : {};

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
      <AuctionsTableProvider
        data={list}
        count={total}
        withRowActions={!isMyAuctionsPage} // row actions not displayed if not MyAuctionsPage
        meId={me?.id}
        className="space-y-4"
      >
        <Table className="rounded-md border">
          <AuctionsTableHeader />
          <AuctionsTableBody />
        </Table>
        <AuctionsTablePagination className="mt-8" />
      </AuctionsTableProvider>
    </>
  );
};
