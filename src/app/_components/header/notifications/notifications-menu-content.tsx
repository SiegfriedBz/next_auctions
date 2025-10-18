"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { BellIcon, BellRingIcon } from "lucide-react";
import { type FC, memo, useMemo } from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Notification,
  NotificationTypeSchema,
  type NotificationTypeSchemaT,
} from "@/core/domains/notifications";
import { cn } from "@/lib/utils";
import { NotificationItem } from "../../real-time/notification-item";

type Props = {
  notifications: Notification[];
  onMarkNotificationAsSeen: (notificationId: string) => void;
};

export const NotificationMenuContent: FC<Props> = (props) => {
  const { notifications = [], onMarkNotificationAsSeen } = props;
  const count = notifications.length;

  const { t } = useLingui();

  const notificationsByType = useMemo(() => {
    return notifications.reduce<
      Record<NotificationTypeSchemaT, Notification[]>
    >(
      (acc, n) => {
        acc[n.type] = acc[n.type] || [];
        acc[n.type].push(n);
        return acc;
      },
      {} as Record<NotificationTypeSchemaT, Notification[]>,
    );
  }, [notifications]);

  const tabsList = useMemo(() => {
    return [
      {
        value: "payments",
        label: t`Payments`,
        defaultLabel: t`No payment`,
        notifications:
          notificationsByType[NotificationTypeSchema.enum.NEW_PAYMENT] || [],
      },
      {
        value: "bids",
        label: t`Bids`,
        defaultLabel: t`No bid`,
        notifications:
          notificationsByType[NotificationTypeSchema.enum.NEW_BID] || [],
      },
      {
        value: "auctions-won",
        label: t`Auctions won`,
        defaultLabel: t`No auction won`,
        notifications:
          notificationsByType[NotificationTypeSchema.enum.NEW_AUCTION_WON] ||
          [],
      },
    ];
  }, [notificationsByType, t]);

  return (
    <Tabs defaultValue="payments" className="w-full px-1">
      <div className="flex justify-center items-center gap-x-2 mt-2 mb-1">
        {count > 0 ? (
          <BellRingIcon className="size-4 opacity-90" />
        ) : (
          <BellIcon className="size-4 opacity-80" />
        )}
        <Trans>Notifications</Trans>
      </div>

      <TabsList className="w-full">
        {tabsList.map((tab) => {
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn("cursor-pointer opacity-80", {
                "opacity-100": tab.notifications.length > 0,
              })}
              aria-selected={tab.notifications.length > 0}
            >
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabsList.map((tab) => {
        return (
          <TabsContent key={`content-${tab.value}`} value={tab.value}>
            <MemoTabContentInner
              notifications={tab.notifications}
              label={tab.defaultLabel}
              onMarkNotificationAsSeen={onMarkNotificationAsSeen}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

type TabContentInnerProps = {
  notifications: Notification[];
  label: string;
  onMarkNotificationAsSeen: (notificationId: string) => void;
};

const TabContentInner: FC<TabContentInnerProps> = (props) => {
  const { notifications = [], onMarkNotificationAsSeen, label } = props;
  const count = notifications.length;

  return (
    <ul className="grid w-54 gap-2">
      {count === 0 ? (
        <li className="text-sm whitespace-nowrap text-center py-2 text-shadow-muted-foreground">
          {label}
        </li>
      ) : (
        notifications.map((notification) => {
          return (
            <li key={notification.id}>
              <NavigationMenuLink asChild>
                <NotificationItem
                  notification={notification}
                  onMarkNotificationAsSeen={onMarkNotificationAsSeen}
                />
              </NavigationMenuLink>
            </li>
          );
        })
      )}
    </ul>
  );
};

const MemoTabContentInner = memo(TabContentInner);
