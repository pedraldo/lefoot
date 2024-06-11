"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatNumberToPercent } from "@/lib/utils";
import { PlayerUserData } from "@/services/user";
import { ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";

export const columns: ColumnDef<PlayerUserData>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joueur
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const image = row.original.image;
      const username = row.original.username;
      return (
        <div className="flex items-center gap-2 [@media(width<=480px)]:flex-col">
          <Avatar size="default">
            {image ? <AvatarImage src={image} alt={username ?? ""} /> : null}
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-center">{username}</span>
        </div>
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
          {formatNumberToPercent(row.original.percentFixturesWon)}
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
          {formatNumberToPercent(row.original.percentFixturesLost)}
        </div>
      );
    },
    size: 65,
  },
];
