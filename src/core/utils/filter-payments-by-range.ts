import {
  type Payment,
  type PaymentRange,
  PaymentRangeSchema,
} from "../domains/payment";

export function filterPaymentsByRange(
  payments: Payment[],
  range: PaymentRange,
  signupDate: Date,
): Payment[] {
  const now = new Date();
  let start: Date;

  switch (range) {
    case PaymentRangeSchema.enum.SINCE_SIGNUP:
      start = signupDate;
      break;
    case PaymentRangeSchema.enum.LAST_WEEK:
      start = new Date(now);
      start.setDate(now.getDate() - 7);
      break;
    case PaymentRangeSchema.enum.LAST_MONTH:
      start = new Date(now);
      start.setMonth(now.getMonth() - 1);
      break;
    case PaymentRangeSchema.enum.LAST_YEAR:
      start = new Date(now);
      start.setFullYear(now.getFullYear() - 1);
      break;
    default:
      start = signupDate;
  }

  return payments.filter((p) => p.paidAt >= start);
}
