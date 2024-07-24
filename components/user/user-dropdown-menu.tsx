import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { RiLogoutBoxRLine, RiSettings5Line, RiUser3Line } from "react-icons/ri";
import LogoutButton from "../auth/logout-button";
import { Button } from "../ui/button";

const UserDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiUser3Line className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <RiSettings5Line className="mr-2 h-4 w-4" />
          <Link href="/settings">Mes infos</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RiLogoutBoxRLine className="mr-2 h-4 w-4" />
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/auth/login" });
            }}
          >
            <LogoutButton />
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
