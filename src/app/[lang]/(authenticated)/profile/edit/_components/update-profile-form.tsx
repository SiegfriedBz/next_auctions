"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { BookUserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateUser } from "@/actions/user/update-user";
import { UppyAvatarUploader } from "@/app/_components/uppy/uppy-uploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type UpdateUserParams,
  UpdateUserParamsSchema,
} from "@/core/domains/user";

const formSchema = UpdateUserParamsSchema;
type FormSchema = z.infer<typeof formSchema>;

const DEFAULT_VALUES: UpdateUserParams = {
  firstName: "",
  lastName: "",
  avatarUrl: "",
};

type Props = {
  defaultValues: Partial<FormSchema>;
  userId: string;
};

export const UpdateProfileForm: FC<Props> = (props) => {
  const { defaultValues, userId } = props;

  const { t, i18n } = useLingui();
  const { locale: lang } = i18n;

  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = useCallback(
    async (values: FormSchema) => {
      try {
        const result = await updateUser(values);

        if (result.success) {
          toast.success(t`You successfully updated your profile!`);
          router.push(`/${lang}/profile`);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error(err);
        toast.error(t`Something went wrong, please try again later.`);
      }
    },
    [t, lang, router],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-x-2">
                <BookUserIcon className="size-5" />
                <Trans>First name *</Trans>
              </FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription>
                <Trans>This is your public first name.</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-x-2">
                <BookUserIcon className="size-5" />
                <Trans>Last Name *</Trans>
              </FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>
                <Trans>This is your public last name.</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <UppyAvatarUploader
          userId={userId}
          fieldName={"avatarUrl"}
          bucketName={"avatars"}
        />

        <Button
          className="max-sm:w-full sm:flex sm:justify-self-end cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Trans>Updating your profile...</Trans>
          ) : (
            <Trans>Update your profile</Trans>
          )}
        </Button>
      </form>
    </Form>
  );
};
