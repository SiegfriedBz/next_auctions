import { Trans } from "@lingui/react/macro";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyLead } from "@/app/_components/typography/lead";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { users } from "@/core/instances/users";
import { type LangParam, withI18n } from "@/i18n";
import { UpdateProfileForm } from "./_components/update-profile-form";

type Props = {
  params: Promise<LangParam>;
};

const Page: FC<Props> = async (props) => {
  const { lang } = await props.params;

  const me = await users().me();
  if (!me) {
    redirect(`/${lang}`);
  }

  const defaultValues = {
    firstName: me.firstName,
    lastName: me.lastName,
    avatarUrl: me.avatarUrl,
  };

  return (
    <div className="max-w-2xl flex flex-col gap-4 mx-auto pb-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <TypographyH2>
              <Trans>Update your profile</Trans>
            </TypographyH2>
          </CardTitle>
          <CardDescription>
            <TypographyLead>
              <Trans>Fill the form below to update your profile</Trans>
            </TypographyLead>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateProfileForm defaultValues={defaultValues} userId={me.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default withI18n(Page);
