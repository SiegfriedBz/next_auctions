import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, FC } from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

type ListItemProps = ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon?: LucideIcon;
};

export const NavListItem: FC<ListItemProps> = (props) => {
  const { title, icon, href, ...rest } = props;

  const Icon = icon;

  return (
    <li {...rest}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="group text-sm h-12 leading-none font-medium flex flex-row items-center gap-x-2"
        >
          {Icon && (
            <Icon
              size={16}
              className="opacity-50 group-hover:opacity-100 group-hover:font-extrabold transition-all duration-200"
            />
          )}
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
