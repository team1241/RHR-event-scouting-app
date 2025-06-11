"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_SUB_NAVIGATION_ROUTES } from "~/components/navbar/routes";
import { cn } from "~/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="shrink-0 w-36 flex flex-col gap-1">
      <p className="dark:text-zinc-400 text-sm font-semibold">Manage</p>
      {ADMIN_SUB_NAVIGATION_ROUTES.map((subRoute) => (
        <Link
          key={`admin-sub-nav-${subRoute.label}`}
          href={subRoute.href}
          className={cn(
            "relative pl-2 py-1.5 -inset-x-2 rounded-sm inline-flex gap-2 items-center hover:bg-gray-900",
            subRoute.href.includes(pathname) && "bg-gray-900 font-semibold"
          )}
        >
          {subRoute.icon}
          {subRoute.label}
        </Link>
      ))}
    </div>
  );
}
