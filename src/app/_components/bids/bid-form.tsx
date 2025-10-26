"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { type FC, startTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createBid } from "@/actions/bids/create-bid";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
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
import type { Auction } from "@/core/domains/auction";
import { CreateBidParamsSchema } from "@/core/domains/bid";
import { SliderInput } from "../auctions/slider-input";

const formSchema = CreateBidParamsSchema;
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  auction: Pick<Auction, "id" | "startingPrice" | "highestBid">;
  handleCloseCaller?: () => void;
};

export const BidForm: FC<Props> = (props) => {
  const { auction, handleCloseCaller = undefined } = props;

  const { t, i18n } = useLingui();
  const { locale: lang } = i18n;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: (auction.highestBid ?? auction.startingPrice ?? 0) + 1,
      auctionId: auction.id,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = useCallback(
    async (values: FormSchema) => {
      try {
        toast.info(t`Sending bid...`);

        const result = await createBid({ ...values, lang });

        if (result.success) {
          toast.success(t`Bid placed successfully!`);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error(err);
        toast.error(t`Something went wrong, please try again later.`);
      } finally {
        startTransition(() => {
          handleCloseCaller?.();
        });
      }
    },
    [t, lang, handleCloseCaller],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Amount</Trans>
              </FormLabel>
              <FormControl>
                <div className="flex flex-col">
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    min={(auction.highestBid ?? 0) + 1}
                    step={1}
                  />
                  <SliderInput {...field} min={(auction.highestBid ?? 0) + 1} />
                </div>
              </FormControl>
              <FormDescription>
                <Trans>This is your bid's amount.</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => form.reset()}>
            <Trans>Cancel</Trans>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="w-full sm:w-fit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Trans>Creating bid...</Trans>
              ) : (
                <Trans>Create bid</Trans>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};
