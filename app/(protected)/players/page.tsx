import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPlayersUsers } from "@/queries/user";
import { formatUsersForPlayersTable } from "@/services/user";
import Link from "next/link";
import { RiShieldUserLine, RiUserAddLine } from "react-icons/ri";
import { columns } from "./columns";

const Players = async () => {
  const playersUsers = await getPlayersUsers();
  const isOneGuestUser = playersUsers.some((playerUser) => playerUser.isGuest);
  const playersUsersData = formatUsersForPlayersTable(playersUsers);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href="/players/invite"
                className="w-full flex items-center gap-2"
              >
                <RiUserAddLine className="mr-2 h-5 w-5" /> Ajouter un·e invité·e
              </Link>
            </DropdownMenuItem>
            {isOneGuestUser && (
              <DropdownMenuItem>
                <Link
                  href="/players/link"
                  className="w-full flex items-center gap-2"
                >
                  <RiShieldUserLine className="mr-2 h-5 w-5" /> Lier un compte à
                  un·e invité·e
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DataTable columns={columns} data={playersUsersData} />
    </div>
  );
};

export default Players;
