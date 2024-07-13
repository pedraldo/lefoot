"use client";

import { useAppStore } from "@/store/store-bis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const UserPlayerDropdownAction = ({
  hrefSuffix,
  label,
  Icon,
}: {
  hrefSuffix: string;
  label: string;
  Icon: React.ReactElement;
}) => {
  const user = useAppStore((state) => state.user);

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  if (!user?.targetedSquad?.id) {
    return null;
  }

  return (
    <Link
      href={`/squads/${user.targetedSquad.id}/players/${hrefSuffix}`}
      className="w-full flex items-center gap-2"
    >
      <Icon.type {...Icon.props} className="mr-2 h-5 w-5" /> {label}
    </Link>
  );
};

export default UserPlayerDropdownAction;
