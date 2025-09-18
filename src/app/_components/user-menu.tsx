import { Trans, useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/domain/user";
import { LogOutButton } from "./auth/log-out-button";
import { UserAvatar } from "./user-avatar";

type Props = {
  user: User;
};

export const UserMenu: FC<Props> = (props) => {
  const { user } = props;

  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Trans>My Account</Trans>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`${lang}/profile`}>
            <Trans>Profile</Trans>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`${lang}/auctions/mine`}>
            <Trans>My Auctions</Trans>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
