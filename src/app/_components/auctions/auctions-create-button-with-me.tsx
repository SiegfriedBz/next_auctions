import type { ComponentProps, FC } from "react";
import type { Button } from "@/components/ui/button";
import { users } from "@/core/instances/users";
import { AuctionsCreateButton } from "./auctions-create-button";

type Props = ComponentProps<typeof Button>;

export const AuctionsCreateButtonWithMe: FC<Props> = async (props) => {
  const me = await users().me();

  return <AuctionsCreateButton disabled={!me} {...props} />;
};
