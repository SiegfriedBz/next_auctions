import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"h5">;

export const TypographyH5: FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <h5
      {...rest}
      className={cn(
        "text-sm sm:text-base md:text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h5>
  );
};
