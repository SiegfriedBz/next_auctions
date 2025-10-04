import {
  createSearchParamsCache,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import {
  AuctionCategorySchema,
  AuctionStatusSchema,
  AuctionsSortKeySchema,
  AuctionsSortOrderSchema,
} from "@/core/domains/auction";

export const sortParsers = {
  key: parseAsStringEnum(Object.values(AuctionsSortKeySchema.options)),
  order: parseAsStringEnum(Object.values(AuctionsSortOrderSchema.options)),
};

export const filterParsers = {
  title: parseAsString.withDefault(""),
  category: parseAsStringEnum(Object.values(AuctionCategorySchema.options)),
  status: parseAsStringEnum(Object.values(AuctionStatusSchema.options)),
};

export const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
};

const paginationUrlKeys = {
  pageIndex: "page",
  pageSize: "size",
};

export const searchParamsParsers = {
  ...filterParsers,
  ...sortParsers,
  ...paginationParsers,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers, {
  urlKeys: paginationUrlKeys,
});
