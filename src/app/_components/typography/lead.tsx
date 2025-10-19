import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"p">;

export const TypographyLead: FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <p
      {...rest}
      className={cn(
        "text-muted-foreground text-base sm:text-lg md:text-xl",
        className,
      )}
    >
      {children}
    </p>
  );
};
