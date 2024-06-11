import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { RiLogoutBoxRLine, RiSettings5Line, RiUser3Line } from "react-icons/ri";
import { Button, buttonVariants } from "./ui/button";

export const UserDropdownMenu = () => {
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
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RiLogoutBoxRLine className="mr-2 h-4 w-4" />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Déconnexion</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
