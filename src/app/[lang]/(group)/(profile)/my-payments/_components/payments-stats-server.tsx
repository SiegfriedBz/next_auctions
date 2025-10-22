import { Trans } from "@lingui/react/macro";
import { CoinsIcon, HandCoinsIcon } from "lucide-react";
import type { FC } from "react";
import { FormatCurrency } from "@/app/_components/format-currency";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PaymentRangeSchema } from "@/core/domains/payment";
import { users } from "@/core/instances/users";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const PaymentsStatsServer: FC<Props> = async (props) => {
  const { className } = props;

  const filterBy = { range: PaymentRangeSchema.enum.SINCE_SIGNUP };

  const [totalReceived, totalPaid] = await Promise.all([
    users().paymentsReceived({ filterBy }),
    users().paymentsMade({ filterBy }),
  ]);

  const totalReceivedAmount = totalReceived.reduce(
    (sum, d) => sum + d.amount,
    0,
  );
  const totalPaidAmount = totalPaid.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>
      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">
              <FormatCurrency value={totalReceivedAmount} />
            </CardTitle>
            <Trans>Total received</Trans>
          </div>
          <HandCoinsIcon size={32} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1 flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">
              <FormatCurrency value={totalPaidAmount} />
            </CardTitle>
            <Trans>Total paid</Trans>
          </div>
          <CoinsIcon size={32} />
        </CardContent>
      </Card>
    </div>
  );
};
