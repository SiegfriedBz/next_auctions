"use client";

import { BellIcon } from "lucide-react";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { Notification } from "@/core/domains/notifications";
import { cn } from "@/lib/utils";
import { navMenuItemClasses } from "../navigation-menu-classes";
import { NotificationMenuContent } from "./notifications-menu-content";

type Props = {
  notifications: Notification[];
  onMarkNotificationAsSeen: (notificationId: string) => void;
};

export const RealTimeNotificationsMenu: FC<Props> = (props) => {
  const { notifications = [], onMarkNotificationAsSeen } = props;
  const count = notifications.length;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "h-8 sm:h-10 cursor-pointer relative",
          navMenuItemClasses,
          count === 0 ? "opacity-50" : "opacity-100 cursor-pointer",
        )}
      >
        <BellIcon className="size-8 sm:size-10 bg-transparent opacity-80 hover:opacity-100 transition-all duration-200" />
        <Badge className="absolute text-xs -top-2.5 -right-3 px-1 py-0.25">
          {count}
        </Badge>
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <NotificationMenuContent
          notifications={notifications}
          onMarkNotificationAsSeen={onMarkNotificationAsSeen}
        />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
