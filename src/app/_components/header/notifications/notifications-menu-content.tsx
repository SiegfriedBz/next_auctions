"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { BellIcon, BellRingIcon } from "lucide-react";
import { type FC, useMemo } from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Notification,
  NotificationTypeSchema,
} from "@/core/domains/notifications";
import { NotificationItem } from "../../real-time/notification-item";

type Props = {
  notifications: Notification[];
  onMarkNotificationAsSeen: (notificationId: string) => void;
};

export const NotificationMenuContent: FC<Props> = (props) => {
  const { notifications = [], onMarkNotificationAsSeen } = props;
  const count = notifications.length;

  const { t } = useLingui();

  const newBidsNotifications = useMemo(() => {
    return notifications.filter(
      (n) => n.type === NotificationTypeSchema.enum.NEW_BID,
    );
  }, [notifications]);

  const newAuctionsWonNotifications = useMemo(() => {
    return notifications.filter(
      (n) => n.type === NotificationTypeSchema.enum.NEW_AUCTION_WON,
    );
  }, [notifications]);

  return (
    <Tabs defaultValue="bids" className="w-full px-1">
      <div className="flex justify-center items-center gap-x-2 mt-2 mb-1">
        {count > 0 ? (
          <BellRingIcon className="size-4 opacity-90" />
        ) : (
          <BellIcon className="size-4 opacity-80" />
        )}
        <Trans>Notifications</Trans>
      </div>

      <TabsList className="w-full">
        <TabsTrigger value="bids" className="cursor-pointer">
          <Trans>Bids</Trans>
        </TabsTrigger>
        <TabsTrigger value="auctions-won" className="cursor-pointer">
          <Trans>Auctions won</Trans>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="bids">
        <TabContentInner
          notifications={newBidsNotifications}
          label={t`No new bid`}
          onMarkNotificationAsSeen={onMarkNotificationAsSeen}
        />
      </TabsContent>
      <TabsContent value="auctions-won">
        <TabContentInner
          notifications={newAuctionsWonNotifications}
          label={t`No new auction won`}
          onMarkNotificationAsSeen={onMarkNotificationAsSeen}
        />
      </TabsContent>
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
