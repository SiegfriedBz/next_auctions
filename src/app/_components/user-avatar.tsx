import { cva } from "class-variance-authority";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/core/domains/user";
import { cn } from "@/lib/utils";

const userAvatarVariants = cva(
  "flex items-center gap-x-2 px-3 py-2 rounded-md overflow-hidden truncate text-ellipsis",
  {
    variants: {
      variant: {
        default: "",
        hover: "hover:bg-gray-100 dark:hover:bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type Props = {
  user: Pick<User, "email" | "firstName" | "lastName" | "avatarUrl">;
  className?: string;
  avatarClassName?: string;
  variant?: "default" | "hover";
  onlyAvatar?: boolean;
};

export const UserAvatar: FC<Props> = ({
  user,
  className,
  avatarClassName,
  variant = "default",
  onlyAvatar = false,
}) => {
  return (
    <div className={cn(userAvatarVariants({ variant }), className)}>
      <Avatar
        className={cn(
          "size-10 sm:size-12 md:size-14 rounded-md",
          avatarClassName,
        )}
      >
        {user?.avatarUrl && (
          <AvatarImage src={`${user?.avatarUrl}?t=${Date.now()}`} />
        )}
        <AvatarFallback className="rounded-md">
          {getInitials(user)}
        </AvatarFallback>
      </Avatar>
      {!onlyAvatar && (
        <div className="flex flex-col">
          <span className="font-medium capitalize">{getFullName(user)}</span>
          <span className="max-[480px]:hidden sm:text-base text-muted-foreground dark:text-muted-foreground">
            {user.email}
          </span>
        </div>
      )}
    </div>
  );
};

const getFullName = (user: Pick<User, "firstName" | "lastName">) => {
  const { firstName, lastName } = user;
  return `${firstName ?? ""} ${lastName ?? ""}`;
};

const getInitials = (params: Pick<User, "firstName" | "lastName">) => {
  const { firstName, lastName } = params;

  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};
