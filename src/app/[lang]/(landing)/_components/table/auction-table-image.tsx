import { useLingui } from "@lingui/react/macro";
import { CircleOffIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";

type Props = {
  url: string | null;
};

export const AuctionTableImage: FC<Props> = (props) => {
  const { url } = props;

  const { t } = useLingui();

  if (url == null) {
    return (
      <div className="size-16 rounded-lg bg-secondary flex items-center justify-center">
        <CircleOffIcon size={24} className="text-shadow-secondary-foreground" />
      </div>
    );
  }

  return (
    <div className="relative size-16">
      <Image
        src={url}
        alt={t`Product image`}
        fill
        className="object-contain rounded-lg"
      />
    </div>
  );
};
