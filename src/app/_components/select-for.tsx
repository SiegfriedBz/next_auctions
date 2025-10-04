"use client";

import type { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectOption<T> = {
  value: T;
  label: MessageDescriptor;
  icon?: LucideIcon;
};

type Props<T extends string> = Omit<
  ComponentProps<typeof Select>,
  "defaultValue" | "onValueChange"
> & {
  options: SelectOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder: MessageDescriptor;
  className?: string;
};

export const SelectFor = <T extends string>(props: Props<T>) => {
  const { options, onChange, className, placeholder, ...rest } = props;

  const { i18n } = useLingui();

  return (
    <Select {...rest} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={i18n._(placeholder)} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => {
          const Icon = o.icon;
          return (
            <SelectItem key={o.value} value={o.value}>
              {Icon ? <Icon size={16} /> : i18n._(o.label as MessageDescriptor)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
