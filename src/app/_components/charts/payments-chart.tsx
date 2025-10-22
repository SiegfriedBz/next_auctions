"use client";

import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { FormatCurrency } from "@/app/_components/format-currency"; // 👈 use your component
import { QueryRangeSelect } from "@/app/[lang]/(group)/(profile)/my-payments/_components/query-range-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { FormatDate } from "../format-date";
import { TypographyH2 } from "../typography/h2";
import { TypographyLead } from "../typography/lead";

export type ChartDataPoint = { period: string; amount: number };

type PaymentsChartProps = {
  title: string;
  data: ChartDataPoint[];
  description?: string;
  colorVar?: string;
};

export const PaymentsChart = ({
  title,
  description,
  data,
  colorVar = "var(--chart-1)",
}: PaymentsChartProps) => {
  const chartConfig = useMemo(() => {
    return {
      amount: {
        color: colorVar,
      },
    } satisfies ChartConfig;
  }, [colorVar]);

  const { t } = useLingui();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <TypographyH2>{title}</TypographyH2>
          <QueryRangeSelect className="max-sm:hidden" />
        </CardTitle>

        <CardDescription>
          <QueryRangeSelect className="sm:hidden" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              padding={{ left: 24, right: 24 }}
            />

            <ChartTooltip
              cursor={{
                stroke: colorVar,
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const dataPoint = payload[0].payload as ChartDataPoint;

                return (
                  <div className="bg-secondary flex flex-col gap-1 min-w-fit p-2 rounded shadow border">
                    <div className="flex gap-2 items-center">
                      <div className="text-sm text-muted-foreground">
                        {t`Date`}:
                      </div>
                      <div className="font-medium">
                        <FormatDate value={new Date(dataPoint.period)} />
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <div className="text-sm text-muted-foreground">
                        {t`Payment`}:
                      </div>
                      <div className="font-medium">
                        <FormatCurrency value={dataPoint.amount} />
                      </div>
                    </div>
                  </div>
                );
              }}
            />

            <Line
              dataKey="amount"
              type="monotone"
              stroke={colorVar}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <TypographyLead>{description}</TypographyLead>
      </CardFooter>
    </Card>
  );
};
