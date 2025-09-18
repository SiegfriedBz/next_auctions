import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/domain/user";
import { cn } from "@/lib/utils";

type Props = {
  user: User;
  className?: string;
};

export const UserAvatar: FC<Props> = ({ user, className }) => {
  return (
    <div
      className={cn(
        `flex items-center gap-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`,
        className,
      )}
    >
      <Avatar className="w-10 h-10 rounded-md">
        <AvatarImage src={user?.avatarUrl} />
        <AvatarFallback>{getInitials(user)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium capitalize">{getFullName(user)}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </span>
      </div>
    </div>
  );
};

const getFullName = (user: User) => {
  const { firstName, lastName } = user;
  return `${firstName ?? ""} ${lastName ?? ""}`;
};

const getInitials = (params: User) => {
  const { firstName, lastName } = params;

  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};
