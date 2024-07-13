"use client";

import { useAppStore } from "@/store/store-bis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const NavLink = ({
  hrefSuffix,
  label,
  Icon,
}: {
  hrefSuffix: string;
  label: string;
  Icon: React.ReactElement;
}) => {
  const pathname = usePathname();
  const isLinkActive = pathname.split("/")[3] === hrefSuffix;
  const user = useAppStore((state) => state.user);
  const squadId = user?.targetedSquad?.id;

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  if (!user) {
    return null;
  }

  const disabled = !squadId;
  return (
    <Link
      href={squadId ? `/squads/${squadId}/${hrefSuffix}` : "#"}
      aria-disabled={!!disabled}
      tabIndex={disabled ? -1 : undefined}
      className={`${isLinkActive ? "text-primary dark:text-gray-50" : ""} ${
        disabled ? "pointer-events-none" : ""
      } inline-flex max-md:flex-col items-center gap-2 max-md:gap-1 transition-colors hover:text-primary focus:outline-none focus:ring-0 dark:hover:text-gray-50`}
    >
      <Icon.type {...Icon.props} className="h-7 w-7" />
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
