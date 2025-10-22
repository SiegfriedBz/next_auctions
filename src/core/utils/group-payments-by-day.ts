import type { Payment } from "../domains/payment";

export type GroupPaymentsByDayReturn = { period: string; amount: number }[];

export function groupPaymentsByDay(
  payments: Payment[],
): GroupPaymentsByDayReturn {
  const grouped: Record<string, number> = {};

  for (const p of payments) {
    const key = new Date(p.paidAt).toISOString().split("T")[0]; // YYYY-MM-DD
    grouped[key] = (grouped[key] || 0) + p.amount;
  }

  return Object.entries(grouped).map(([period, amount]) => ({
    period,
    amount,
  }));
}
