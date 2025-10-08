import { Trans } from "@lingui/react/macro";
import { redirect } from "next/navigation";
import { type FC, Suspense } from "react";
import { SkeletonProfileForm } from "@/app/[lang]/(authenticated)/profile/edit/_components/skeleton-profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { users } from "@/core/instances/users";
import { type LangParam, withI18n } from "@/i18n";
import { UpdateUserFormWithData } from "./_components/update-profile-form-with-data";

type Props = {
  params: Promise<LangParam>;
};

const Page: FC<Props> = async (props) => {
  const { lang } = await props.params;

  const me = await users().me();
  if (!me) {
    redirect(`/${lang}`);
  }

  return (
    <div className="max-w-2xl flex flex-col gap-4 mx-auto pb-4">
      <Card>
        <CardHeader>
          <CardTitle className="h2">
            <Trans>Update your profile</Trans>
          </CardTitle>
          <CardDescription>
            <Trans>Fill the form below to update your profile</Trans>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<SkeletonProfileForm />}>
            <UpdateUserFormWithData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default withI18n(Page);
