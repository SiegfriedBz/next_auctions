import type { FC } from "react";
import type { User } from "@/core/domains/user";
import { notifications } from "@/core/instances/notifications";
import { NotificationsWithChannel } from "./notifications-with-channel";

type Props = {
  me: User;
};

export const NotificationsMenuServer: FC<Props> = async (props) => {
  const { me } = props;

  if (!me) {
    return null;
  }

  const { list: initNotifications } = await notifications().listing({
    filterBy: {
      read: false,
    },
  });

  return (
    <NotificationsWithChannel
      userId={me.id}
      initNotifications={initNotifications}
    />
  );
};
