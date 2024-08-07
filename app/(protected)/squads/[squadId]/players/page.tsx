import SquadTitle from "@/components/squad/squad-title";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserPlayerDropdownAction from "@/components/user/user-player-dropdown-action";
import { getSquadPlayersUsers } from "@/queries/squad";
import { formatUsersForPlayersTable } from "@/services/user";
import { RiShieldUserLine, RiUserAddLine } from "react-icons/ri";
import { columns } from "./columns";

export const dynamic = "force-dynamic";

const PlayersPage = async ({ params }: { params: { squadId: string } }) => {
  const squadId = params.squadId;
  const playersUsers = await getSquadPlayersUsers(squadId);

  if (!playersUsers) {
    return (
      <div className="flex flex-col gap-2 w-full text-center">
        <p>Impossible de récupérer la liste des joueur·euse·s.</p>
        <p>{`L'équipe est probablement inconnue.`}</p>
      </div>
    );
  }
  const isOneGuestUser = playersUsers.some(
    (playerUser) => !!playerUser.guestSquads[0]?.id
  );
  const playersUsersData = formatUsersForPlayersTable(playersUsers);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-end gap-4 pb-4">
        <SquadTitle subtitle={`${playersUsers.length} joueur·euse·s`} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <UserPlayerDropdownAction
                hrefSuffix="add"
                label="Ajouter un·e joueur·euse"
                Icon={<RiUserAddLine />}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlayerDropdownAction
                hrefSuffix="invite"
                label="Créer un·e invité·e"
                Icon={<RiUserAddLine />}
              />
            </DropdownMenuItem>
            {isOneGuestUser && (
              <DropdownMenuItem>
                <UserPlayerDropdownAction
                  hrefSuffix="link"
                  label="Lier un compte à
                  un·e invité·e"
                  Icon={<RiShieldUserLine />}
                />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {playersUsers.length === 0 && (
        <div className="w-full text-center">
          Aucun joueur·euse. Il semble y avoir un problème ...
        </div>
      )}
      {playersUsers.length > 0 && (
        <DataTable columns={columns} data={playersUsersData} />
      )}
    </div>
  );
};

export default PlayersPage;
