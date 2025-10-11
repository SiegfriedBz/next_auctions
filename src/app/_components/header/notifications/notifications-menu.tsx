import { type FC, Suspense } from "react";
import type { User } from "@/core/domains/user";
import { NotificationsMenuServer } from "../../real-time/notifications-menu-server";
import { SkeletonNotificationsMenu } from "./skeleton-notifications-menu";

type Props = {
  me: User;
};

export const NotificationsMenu: FC<Props> = (props) => {
  const { me } = props;
  if (!me) return null;

  return (
    <Suspense fallback={<SkeletonNotificationsMenu />}>
      <NotificationsMenuServer me={me} />
    </Suspense>
  );
};
