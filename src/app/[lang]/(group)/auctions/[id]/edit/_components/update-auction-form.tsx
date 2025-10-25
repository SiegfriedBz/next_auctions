"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { msg } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  CalendarClockIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  GemIcon,
  NotebookTextIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import type { z } from "zod";
import { updateAuction } from "@/actions/auctions/update-auction";
import { DayPicker } from "@/app/_components/date-picker";
import { UppyMultiUploader } from "@/app/_components/uppy/uppy-multi-uploader";
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
import { Textarea } from "@/components/ui/textarea";
import {
  type Auction,
  type AuctionCategory,
  AuctionCategorySchema,
  type AuctionStatus,
  AuctionStatusSchema,
  type UpdateAuctionParams,
  UpdateAuctionParamsSchema,
} from "@/core/domains/auction";
import { SliderInput } from "../../../../../../_components/auctions/slider-input";
import { SelectFor } from "../../../../../../_components/select-for";
import {
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  TOMORROW,
} from "../../../../../../constants";

const formSchema = UpdateAuctionParamsSchema;
type FormSchema = z.infer<typeof formSchema>;

const DEFAULT_VALUES: UpdateAuctionParams = {
  id: "",
  title: "",
  description: "",
  startingPrice: 10,
  category: AuctionCategorySchema.enum.MUSIC,
  endAt: undefined,
  status: AuctionStatusSchema.enum.OPEN,
  storageId: undefined,
  images: [],
};

type Props = {
  defaultValues: Partial<FormSchema> & { id: Auction["id"] };
  excludedStatuses: AuctionStatus[];
};

export const UpdateAuctionForm: FC<Props> = (props) => {
  const { defaultValues, excludedStatuses = [] } = props;

  const newStorageId = uuidv4();

  const { t, i18n } = useLingui();
  const { locale: lang } = i18n;

  const router = useRouter();

  // create uuid if no images uploaded yet for this auction
  const storageId = defaultValues?.storageId ?? newStorageId;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
      storageId,
    },
  });

  const { isSubmitting } = form.formState;

  const statusOptions = useMemo(() => {
    return STATUS_OPTIONS.filter((o) => !excludedStatuses.includes(o.value));
  }, [excludedStatuses]);

  const onSubmit = useCallback(
    async (values: FormSchema) => {
      try {
        const result = await updateAuction(values);

        if (result.success) {
          toast.success(t`You successfully updated your auction!`);
          router.push(`/${lang}/auctions/${result.data.id}`);
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-x-2">
                <FileTextIcon className="size-5" />
                <Trans>Title *</Trans>
              </FormLabel>
              <FormControl>
                <Input placeholder="Vintage Guitar" {...field} />
              </FormControl>
              <FormDescription>
                <Trans>Give a title to your auction</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-x-2">
                <NotebookTextIcon className="size-5" />
                <Trans>Description *</Trans>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder={t`Built to exacting standards using only the best quality hardware, pickups and tone woods...`}
                />
              </FormControl>
              <FormDescription>
                <Trans>Give a description to your auction</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <FormField
            control={form.control}
            name="startingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-x-2">
                  <GemIcon className="size-5" />
                  <Trans>Starting Price *</Trans>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col">
                    <Input
                      placeholder="100"
                      className="@sm:max-w-2/3 @max-sm:w-full"
                      {...field}
                      min={1}
                      value={field.value ?? 1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    <SliderInput
                      {...field}
                      min={1}
                      className="@sm:max-w-2/3 @max-sm:w-full"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  <Trans>Give a Starting Price to your auction</Trans>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-x-2">
                  <ClipboardCheckIcon className="size-5" />
                  <Trans>Category *</Trans>
                </FormLabel>
                <SelectFor<AuctionCategory>
                  {...field}
                  className="@sm:max-w-1/3 @max-sm:w-full"
                  options={CATEGORY_OPTIONS}
                  placeholder={msg`Select a category`}
                />
                <FormDescription>
                  <Trans>Select a category for your auction</Trans>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-x-2">
                  <ClipboardCheckIcon className="size-5 text-muted-foreground" />
                  <Trans>Status</Trans>
                </FormLabel>
                <SelectFor<AuctionStatus>
                  {...field}
                  className="@sm:max-w-1/2 @max-sm:w-full"
                  options={statusOptions}
                  placeholder={msg`Select a status`}
                />
                <FormDescription>
                  <Trans>Select a status for your auction</Trans>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-x-2">
                  <CalendarClockIcon className="size-5 text-muted-foreground" />
                  <Trans>End at</Trans>
                </FormLabel>
                <FormControl>
                  <DayPicker
                    {...field}
                    disabledBefore={TOMORROW}
                    className="@sm:max-w-1/2 @max-sm:w-full"
                  />
                </FormControl>
                <FormDescription>
                  <Trans>Set a date to end your auction</Trans>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <UppyMultiUploader
          storageId={storageId}
          fieldName={"images"}
          bucketName={"auctions"}
          maxNumberOfFiles={3}
          infoMessage={t`Click on Update Auction`}
        />

        <div className="flex w-full sm:justify-end">
          <Button
            className="cursor-pointer w-full sm:w-fit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Trans>Updating auction...</Trans>
            ) : (
              <Trans>Update auction</Trans>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
