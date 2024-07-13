"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatNumberToPercent } from "@/lib/utils";
import { PlayerUserData } from "@/services/user";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { LuArrowUpDown } from "react-icons/lu";
import { RiUser3Line } from "react-icons/ri";
import UserLink from "@/components/user/user-link";

export const columns: ColumnDef<PlayerUserData>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joueur·euse
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const image = row.original.image;
      const username = row.original.username;
      const isGuest = row.original.isGuest;
      return (
        <UserLink
          userId={row.original.id}
          image={image}
          username={username}
          isGuest={isGuest}
        />
      );
    },
  },
  {
    accessorKey: "nbFixtures",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tot.
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="w-full text-center">{row.original.nbFixtures}</div>
      );
    },
  },
  {
    accessorKey: "nbFixturesWon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          G
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="w-full text-center">{row.original.nbFixturesWon}</div>
      );
    },
  },
  {
    accessorKey: "nbFixturesLost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          P
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="w-full text-center">{row.original.nbFixturesLost}</div>
      );
    },
  },
  {
    accessorKey: "percentFixturesWon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          %G
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-full text-center">
          {formatNumberToPercent(row.original.percentFixturesWon) + "%"}
        </div>
      );
    },
    size: 65,
  },
  {
    accessorKey: "percentFixturesLost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          %P
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-full text-center">
          {formatNumberToPercent(row.original.percentFixturesLost) + "%"}
        </div>
      );
    },
    size: 65,
  },
];
