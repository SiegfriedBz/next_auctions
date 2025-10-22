import { createSearchParamsCache, parseAsStringEnum } from "nuqs/server";
import { PaymentRangeSchema } from "@/core/domains/payment";

export const filterParsers = {
  range: parseAsStringEnum(
    Object.values(PaymentRangeSchema.options),
  ).withDefault(PaymentRangeSchema.enum.SINCE_SIGNUP),
};

export const searchParamsParsers = {
  ...filterParsers,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
