import { Trans } from "@lingui/react/macro";
import { redirect } from "next/navigation";
import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { users } from "@/core/instances/users";
import { type LangParam, withI18n } from "@/i18n";
import { CreateAuctionForm } from "./_components/create-auction-form";

type Props = {
  params: Promise<LangParam>;
};

const Page: FC<Props> = async (props) => {
  const { lang } = await props.params;

  const me = await users().me();
  if (!me) {
    redirect(`/${lang}/`);
  }

  return (
    <div className="max-w-5xl flex flex-col gap-4 mx-auto pb-4">
      <Card>
        <CardHeader>
          <CardTitle className="h2">
            <Trans>Create your auction</Trans>
          </CardTitle>
          <CardDescription>
            <Trans>Fill the form below to create a new auction</Trans>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAuctionForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default withI18n(Page);
