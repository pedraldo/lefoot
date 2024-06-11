import { DataTable } from "@/components/ui/data-table";
import { getPlayersUsers } from "@/queries/user";
import { formatUsersForPlayersTable } from "@/services/user";
import { columns } from "./columns";

const Players = async () => {
  const playersUsers = await getPlayersUsers();
  const playersUsersData = formatUsersForPlayersTable(playersUsers);

  return <DataTable columns={columns} data={playersUsersData} />;
};

export default Players;
