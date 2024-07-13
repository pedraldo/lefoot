import { auth } from "@/auth";
import UserStats from "@/components/stats/user-stats";
import { getUserSquadFixtures } from "@/queries/user";
import { formatUserFixturesForStats } from "@/services/user";

export const dynamic = "force-dynamic";

const StatsPage = async ({ params }: { params: { squadId: string } }) => {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="w-full text-center">
        {`Impossible de récupérer les informations de l'utilisateur ...`}
      </div>
    );
  }

  const userId = session.user.id;
  const squadId = params.squadId;
  const userSquadFixtures = await getUserSquadFixtures(userId, squadId);

  if (!userSquadFixtures?.id) {
    return (
      <div className="flex flex-col gap-2 w-full text-center">
        <p>{`Erreur lors de la récupération des données du·de la joueur·euse ou de l'équipe.`}</p>
      </div>
    );
  }

  const userStats = formatUserFixturesForStats(userSquadFixtures);

  return (
    <>
      <UserStats stats={userStats} />
    </>
  );
};

export default StatsPage;
