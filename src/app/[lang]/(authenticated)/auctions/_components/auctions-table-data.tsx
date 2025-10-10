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
import type { User } from "@/core/domains/user";
import { auctions } from "@/core/instances/auctions";
import { users } from "@/core/instances/users";

type Props = {
  isMe?: boolean;
};

export const AuctionsTableData: FC<Props> = async (props) => {
  const { isMe = false } = props;

  const { pageIndex, pageSize, ...rest } = searchParamsCache.all();

  let me: User | null = null;
  if (isMe) {
    me = await users().me();
  }

  const filterBy = {
    ownerId: me?.id ?? undefined,
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
      <AuctionsTableProvider
        data={list}
        count={total}
        withRowActions={!isMe}
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
