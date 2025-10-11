import {
  AuctionsTableBody,
  AuctionsTableHeader,
  AuctionsTableProvider,
  AuctionsTableToolbar,
} from "@/app/_components/auctions/table";
import { Table } from "@/components/ui/table";
import { auctions } from "@/core/instances/auctions";
import { searchParamsCache } from "../../search.params";

export const LandingAuctionsTableServer = async () => {
  const { pageIndex, ...rest } = searchParamsCache.all();

  const filterBy = {
    title: rest.title ?? undefined,
    category: rest.category ?? undefined,
    status: rest.status ?? undefined,
  };

  const orderBy =
    rest.key && rest.order ? { key: rest.key, order: rest.order } : undefined;

  const pagination = {
    page: pageIndex,
    size: 4,
  };

  const { list, total } = await auctions().listing({
    filterBy,
    orderBy,
    pagination,
  });

  return (
    <>
      <AuctionsTableToolbar filteredCount={total} />
      <AuctionsTableProvider data={list} count={total}>
        <Table className="rounded-md border">
          <AuctionsTableHeader />
          <AuctionsTableBody />
        </Table>
      </AuctionsTableProvider>
    </>
  );
};
