import { useLingui } from "@lingui/react/macro";
import { CircleOffIcon } from "lucide-react";
import { type FC, useMemo } from "react";
import { formatCurrency } from "@/app/_utils/format-currency";
import { cn } from "@/lib/utils";

type Props = {
  value: number | null;
  className?: string;
};

export const FormatCurrency: FC<Props> = (props) => {
  const { value, className } = props;

  const { i18n } = useLingui();
  const { locale } = i18n;

  const formatted = useMemo(() => {
    return formatCurrency({
      value,
      locale,
    });
  }, [value, locale]);

  return formatted ? (
    <span className={cn("font-medium", className)}>{formatted}</span>
  ) : (
    <CircleOffIcon size={16} className="text-muted-foreground" />
  );
};
