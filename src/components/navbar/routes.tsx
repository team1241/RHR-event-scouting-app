import { CalendarRange, LeafIcon, UsersIcon } from "lucide-react";

const PUBLIC_NAVIGATION_ROUTES = [
  {
    href: "/dashboard",
    label: "Dashboard",
    activePathNames: ["/dashboard", "/"],
  },
];

const ADMIN_NAVIGATION_ROUTES = [
  {
    href: "/admin",
    label: "Admin",
  },
];

const ADMIN_SUB_NAVIGATION_ROUTES = [
  {
    href: "/admin/seasons",
    label: "Seasons",
    icon: <LeafIcon className="size-4" />,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: <UsersIcon className="size-4" />,
  },
  {
    href: "/admin/events",
    label: "Events",
    icon: <CalendarRange className="size-4" />,
  },
];

export {
  PUBLIC_NAVIGATION_ROUTES,
  ADMIN_NAVIGATION_ROUTES,
  ADMIN_SUB_NAVIGATION_ROUTES,
};
