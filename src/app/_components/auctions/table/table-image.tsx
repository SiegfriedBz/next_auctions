import { useLingui } from "@lingui/react/macro";
import { CircleOffIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import { cn } from "@/lib/utils";

type Props = {
  url: string | null;
  className?: string;
};

export const AuctionTableImage: FC<Props> = (props) => {
  const { url, className = "size-16" } = props;

  const { t } = useLingui();

  if (url == null) {
    return (
      <div
        className={cn(
          "rounded-lg bg-secondary flex items-center justify-center",
          className,
        )}
      >
        <CircleOffIcon size={24} className="text-shadow-secondary-foreground" />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={url}
        alt={t`Product image`}
        fill
        className="object-contain rounded-lg"
      />
    </div>
  );
};
