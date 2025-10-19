"use client";

import { useLingui } from "@lingui/react/macro";
import Image from "next/image";
import Link from "next/link";
import {
  type ComponentProps,
  type FC,
  startTransition,
  useCallback,
} from "react";
import { toast } from "sonner";
import { updateNotification } from "@/actions/notifications/update-notification";
import type { Notification } from "@/core/domains/notifications";
import { cn } from "@/lib/utils";

type Props = {
  notification: Notification;
  onMarkNotificationAsSeen: (notificationId: string) => void;
} & Omit<ComponentProps<typeof Link>, "href">;

export const NotificationItem: FC<Props> = (props) => {
  const { notification, onMarkNotificationAsSeen, className, ...rest } = props;
  const {
    id: notificationId,
    auction: { id: auctionId, title, images },
  } = notification;

  const img = images?.at(0);

  const { i18n, t } = useLingui();
  const { locale: lang } = i18n;

  const markAsSeen = useCallback(async () => {
    const updated = await updateNotification({
      id: notificationId,
      read: true,
    });

    if (updated.success) {
      startTransition(() => {
        toast.info(t`Notification marked as seen`);
        onMarkNotificationAsSeen(notificationId);
      });
    }
  }, [notificationId, t, onMarkNotificationAsSeen]);

  return (
    <Link
      {...rest}
      onClick={markAsSeen}
      className={cn(
        className,
        "cursor-pointer group text-sm min-w-full leading-none font-medium flex flex-row items-center gap-x-2 overflow-hidden",
      )}
      href={`/${lang}/auctions/${auctionId}`}
    >
      <span className="sr-only">{t`Notification card with link`}</span>
      <div className="flex items-center gap-x-4 w-full">
        <div className="relative size-10 aspect-square rounded-lg overflow-hidden flex items-center justify-center">
          {img ? (
            <Image
              src={img}
              alt="auction-image"
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="object-cover size-10 rounded-lg bg-primary/25 dark:bg-secondary dark:group-hover:bg-primary/40" />
          )}
        </div>
        <span className="text-sm opacity-80 group-hover:opacity-100">
          {title}
        </span>
      </div>
    </Link>
  );
};
