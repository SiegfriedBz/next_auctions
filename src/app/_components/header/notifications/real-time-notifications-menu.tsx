import { Trans } from "@lingui/react/macro";
import { BellIcon } from "lucide-react";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { Notification } from "@/core/domains/notifications";
import { cn } from "@/lib/utils";
import { NotificationItem } from "../../real-time/notification-item";
import { navMenuItemClasses } from "../navigation-menu-classes";

type Props = {
  notifications?: Notification[];
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
        <BellIcon
          size={12}
          className="size-8 sm:size-10 bg-transparent opacity-80 hover:opacity-100 transition-all duration-200"
        />
        <Badge className="absolute text-xs -top-2.5 -right-3 px-1 py-0.25">
          {count}
        </Badge>
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid w-54 gap-2">
          {count === 0 ? (
            <li className="text-sm whitespace-nowrap text-center py-2 text-shadow-muted-foreground">
              <Trans>No notification</Trans>
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
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
