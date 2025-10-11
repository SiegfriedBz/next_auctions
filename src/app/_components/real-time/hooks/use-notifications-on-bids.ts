"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

type Params = {
  userId: string;
  onNewNotification: (notificationId: string) => Promise<void>;
};

export const useNotificationsOnBids = (params: Params) => {
  const { userId, onNewNotification } = params;

  useEffect(() => {
    if (!userId) return;

    const client = createClient();

    const channel = client.channel(`user:${userId}:notifications`, {
      config: { private: true },
    });

    channel
      .on("broadcast", { event: "INSERT" }, (payload) => {
        const notificationId: string = payload?.payload?.record?.id;
        const recipientId: string = payload?.payload?.record?.recipient_id;

        if (notificationId != null && recipientId === userId) {
          onNewNotification(notificationId);
        }
      })
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [userId, onNewNotification]);
};
