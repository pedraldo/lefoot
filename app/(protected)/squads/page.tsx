import { auth } from "@/auth";
import RefreshRouteButton from "@/components/refresh-route-button";
import SquadLink from "@/components/squad/squad-link";
import { updateUserTargetedSquadId } from "@/mutations/user";
import { getUserSquads } from "../../../queries/user";

export const dynamic = "force-dynamic";

const SquadsPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <p>{`Impossible de récupérer les informations de l'utilisateur`}</p>;
  }

  const squads = await getUserSquads(userId);

  if (!squads) {
    return <p>{`Impossible de récupérer les équipes de l'utilisateur`}</p>;
  }

  const handleSquadClick = async (squadId: string) => {
    "use server";
    await updateUserTargetedSquadId(userId, squadId);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Mes équipes</h1>
      {squads.length > 0 && (
        <div className="inline-flex flex-col gap-2 items-start mt-4">
          {squads.map((squad) => (
            <SquadLink
              key={squad.id}
              squad={squad}
              beforeRedirection={handleSquadClick}
            />
          ))}
        </div>
      )}
      {squads.length === 0 && (
        <>
          <div>
            <p>{`Tu ne fais partie d'aucune équipe pour l'instant.`}</p>
            <p>{`Demande à un·e coéquipier·e de t'inviter dans son équipe.`}</p>
            <p>{`Une fois qu'il·elle l'aura fait, tu pourras actualiser cette page.`}</p>
            <p className="mt-2">{`Dans une prochaine version de l'application, tu pourras créer ta propre équipe !`}</p>
          </div>
          <div className="mt-4">
            <RefreshRouteButton />
          </div>
        </>
      )}
    </div>
  );
};

export default SquadsPage;
