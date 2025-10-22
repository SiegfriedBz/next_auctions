import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { type PaymentRange, PaymentRangeSchema } from "@/core/domains/payment";

export const PaymentRangeToMessage: Record<PaymentRange, MessageDescriptor> = {
  [PaymentRangeSchema.enum.LAST_WEEK]: msg`Last week`,
  [PaymentRangeSchema.enum.LAST_MONTH]: msg`Last month`,
  [PaymentRangeSchema.enum.LAST_YEAR]: msg`Last year`,
  [PaymentRangeSchema.enum.SINCE_SIGNUP]: msg`Since signup`,
};
