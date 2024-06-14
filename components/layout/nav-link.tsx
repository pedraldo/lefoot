"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";

const NavLink = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ReactElement;
}) => {
  const pathname = usePathname();
  const hrefStartsWithCurrentPathname = href.startsWith(pathname);
  return (
    <Link
      href={href}
      className={`${
        hrefStartsWithCurrentPathname ? "text-primary dark:text-gray-50" : ""
      } inline-flex max-md:flex-col items-center gap-2 max-md:gap-1 transition-colors hover:text-primary focus:outline-none focus:ring-0 dark:hover:text-gray-50`}
    >
      <Icon.type {...Icon.props} className="h-7 w-7" />
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
