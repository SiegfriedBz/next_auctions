"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { type FC, startTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { signUp } from "./actions/sign-up";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: `First name must be at least 2 characters` })
    .max(50),
  lastName: z
    .string()
    .min(2, { message: `Last name must be at least 2 characters` })
    .max(50),
  email: z.string().email({ message: `Please enter a valid email address` }),
  password: z
    .string()
    .min(6, { message: `Password must be at least 6 characters` })
    .max(50),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onCloseSideSheet: () => void;
};

export const SignUpForm: FC<Props> = (props) => {
  const { onCloseSideSheet } = props;

  const { t } = useLingui();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = useCallback(
    async (values: FormSchema) => {
      try {
        await new Promise((res) => setTimeout(res, 5_000));
        await signUp(values);

        startTransition(() => {
          onCloseSideSheet();
        });

        toast.success(t`You successfully signed up!`);
      } catch (err) {
        console.error(err);
        toast.error(t`Something went wrong, please try again later.`);
      }
    },
    [t, onCloseSideSheet],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>First name</Trans>
              </FormLabel>
              <FormControl>
                <Input placeholder="jane doe" {...field} />
              </FormControl>
              <FormDescription>
                <Trans>This is your public display first name.</Trans>
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
              <FormLabel>
                <Trans>Last name</Trans>
              </FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>
                <Trans>This is your public display last name.</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Email</Trans>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jane.doe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                <Trans>This is your public display email.</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Password</Trans>
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormDescription>
                <Trans>This is your private password.</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Trans>Creating account...</Trans>
          ) : (
            <Trans>Create account</Trans>
          )}
        </Button>
      </form>
    </Form>
  );
};
