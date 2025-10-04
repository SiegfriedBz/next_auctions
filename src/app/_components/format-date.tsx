import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { CircleOffIcon } from "lucide-react";
import { type FC, useMemo } from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "../_utils/format-date";

type Props = {
  value: Date | null;
  className?: string;
  label?: MessageDescriptor;
};

export const FormatDate: FC<Props> = (props) => {
  const { value, className, label = msg`` } = props;

  const { i18n } = useLingui();
  const { locale } = i18n;

  const formatted = useMemo(() => {
    return formatDate({
      value,
      locale,
    });
  }, [value, locale]);

  if (!value) {
    return <CircleOffIcon size={16} className="text-muted-foreground" />;
  }

  return formatted ? (
    <div className={cn("font-medium", className)}>{formatted}</div>
  ) : (
    <span className="text-muted-foreground">{i18n._(label)}</span>
  );
};
