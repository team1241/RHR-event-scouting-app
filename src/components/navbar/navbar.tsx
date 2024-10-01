"use client";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

import logo from "~/public/logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { usePathname } from "next/navigation";

import { NAVIGATION_ROUTES } from "~/components/navbar/routes";
import Link from "next/link";

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const renderUserSpecificContent = () => {
    if (!isLoaded && !user) {
      return (
        <>
          <Skeleton className="rounded-md w-24 md:w-32 h-3" />
          <Skeleton className="rounded-full h-8 w-8" />
        </>
      );
    }

    if (!isSignedIn) {
      return (
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      );
    }

    return (
      <>
        <p className="font-bold">{user.firstName}</p>
        <UserButton />
      </>
    );
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (pathname.includes("sign-in") || pathname.includes("sign-in")) return null;

  return (
    <div className="sticky top-0 z-10 left-0 w-screen h-20 px-4 grid grid-cols-3 gap-4 shadow-md border-b bg-slate-950 border-slate-900">
      <div className="flex flex-row gap-2 items-center justify-self-start col-span-2 md:col-span-1">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className={cn("size-6")} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col gap-0 border-slate-950"
          >
            <SheetHeader className="font-semibold text-xl text-left mb-4">
              Menu
            </SheetHeader>
            {NAVIGATION_ROUTES.map((route) => (
              <Link
                key={`sideSheetMenuItem-${route.label}`}
                href={route.href}
                className={cn(
                  "px-4 py-2 rounded-md mb-2 font-semibold",
                  pathname === route.href && "text-blue-600 font-semibold"
                )}
              >
                {route.label}
              </Link>
            ))}
          </SheetContent>
        </Sheet>
        <Image src={logo} width={60} height={60} alt="Logo" />
        <p className="font-semibold">Scouting</p>
      </div>

      <NavigationMenu className="justify-self-center hidden md:inline-grid">
        <NavigationMenuList>
          {NAVIGATION_ROUTES.map((route) => (
            <NavigationMenuItem key={`navbarMenuItem-${route.label}`}>
              <NavigationMenuLink
                active={pathname === route.href}
                href={route.href}
                className={navigationMenuTriggerStyle()}
              >
                {route.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex flex-row gap-2 items-center justify-self-end">
        {renderUserSpecificContent()}
      </div>
    </div>
  );
}
