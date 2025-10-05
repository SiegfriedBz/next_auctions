import { useLingui } from "@lingui/react/macro";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { users } from "@/core/instances/users";
import { UpdateProfileForm } from "./update-profile-form";

export const UpdateUserFormWithData: FC = async () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const me = await users().me();

  if (!me) {
    redirect(`/${lang}`);
  }

  const defaultValues = {
    firstName: me.firstName,
    lastName: me.lastName,
  };

  return <UpdateProfileForm defaultValues={defaultValues} />;
};
