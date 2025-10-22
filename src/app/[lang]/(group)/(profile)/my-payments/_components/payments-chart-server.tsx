import { useLingui } from "@lingui/react/macro";
import type { FC } from "react";
import { PaymentsChart } from "@/app/_components/charts/payments-chart";
import { PaymentRangeSchema } from "@/core/domains/payment";
import { users } from "@/core/instances/users";
import { searchParamsCache } from "../search.params";

export const PaymentsChartServer: FC = async () => {
  const { range } = searchParamsCache.all();
  const { t } = useLingui();

  const filterBy = { range: range ?? PaymentRangeSchema.enum.SINCE_SIGNUP };

  const [received, done] = await Promise.all([
    users().paymentsReceived({
      filterBy,
    }),
    users().paymentsMade({
      filterBy,
    }),
  ]);

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <PaymentsChart
        title={t`Payments received`}
        description={t`Payments you have received over time`}
        data={received}
      />

      <PaymentsChart
        title={t`Payments made`}
        description={t`Payments you have made over time`}
        data={done}
      />
    </div>
  );
};
