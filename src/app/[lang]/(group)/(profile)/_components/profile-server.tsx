import { Trans } from "@lingui/react/macro";
import { redirect } from "next/navigation";
import type { FC, PropsWithChildren } from "react";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/core/instances/users";
import type { LangParam } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
};

export const ProfileServer: FC<PropsWithChildren<Props>> = async (props) => {
  const { children } = props;
  const { lang } = await props.params;

  const me = await users().me();
  if (!me) {
    redirect(`/${lang}`);
  }

  return (
    <Card>
      <CardHeader className="sr-only">
        <CardTitle>
          <TypographyH2>
            <Trans>User profile card</Trans>
          </TypographyH2>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid lg:grid-cols-2 gap-4 items-center">
        <UserAvatar
          user={me}
          className="gap-x-4"
          avatarClassName="-ms-3 size-24 sm:size-26 md:size-32 rounded-md"
        />
        {children}
      </CardContent>
    </Card>
  );
};
