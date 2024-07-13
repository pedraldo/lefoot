import UserStats from "@/components/stats/user-stats";
import { getUserSquadFixtures } from "@/queries/user";
import { formatUserFixturesForStats } from "@/services/user";

export const dynamic = "force-dynamic";

const PlayerPage = async ({
  params,
}: {
  params: { playerId: string; squadId: string };
}) => {
  const { playerId, squadId } = params;
  const userSquadFixtures = await getUserSquadFixtures(playerId, squadId);

  if (!userSquadFixtures?.id) {
    return (
      <div className="flex flex-col gap-2 w-full text-center">
        <p>{`Erreur lors de la récupération des données du·de la joueur·euse ou de l'équipe.`}</p>
      </div>
    );
  }

  const userStats = formatUserFixturesForStats(userSquadFixtures);

  return <UserStats stats={userStats} />;
};

export default PlayerPage;
