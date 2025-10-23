"use client";

import { type FC, useCallback, useState } from "react";
import { findNotificationById } from "@/actions/notifications/find-notification-by-id";
import type { Notification } from "@/core/domains/notifications";
import { RealTimeNotificationsMenu } from "../header/notifications-menu/real-time-notifications-menu";
import { useNotificationsChannel } from "./hooks/use-notifications-channel";

type Props = {
  userId: string;
  initNotifications: Notification[];
};

export const NotificationsWithChannel: FC<Props> = (props) => {
  const { userId, initNotifications = [] } = props;

  const [notifications, setNotifications] =
    useState<Notification[]>(initNotifications);

  const onNewNotification = useCallback(async (notificationId: string) => {
    const data = await findNotificationById({ id: notificationId });

    if (data?.success) {
      const notification: Notification = data.data;
      setNotifications((prev) => {
        if (prev.some((n) => n.id === notification.id)) return prev;
        return [...prev, notification];
      });
    }
  }, []);

  const onMarkNotificationAsSeen = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  }, []);

  useNotificationsChannel({ userId, onNewNotification });

  return (
    <RealTimeNotificationsMenu
      notifications={notifications}
      onMarkNotificationAsSeen={onMarkNotificationAsSeen}
    />
  );
};
