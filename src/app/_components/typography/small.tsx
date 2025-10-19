import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"small">;

export const TypographySmall: FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <small
      {...rest}
      className={cn(
        "text-sm leading-none font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </small>
  );
};
