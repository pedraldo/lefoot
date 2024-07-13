import { buttonVariants } from "@/components/ui/button";
import { getSquadById } from "@/queries/squad";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SquadPage = async ({ params }: { params: { squadId: string } }) => {
  const squadId = params.squadId;

  if (!squadId) {
    return (
      <p>{`Impossible de récupérer les informations de l'équipe, son identifiant n'est pas reconnu.`}</p>
    );
  }

  const squad = await getSquadById(squadId);

  return (
    <div>
      <h1 className="mb-4">{squad?.name}</h1>
      <Link
        className={buttonVariants({ variant: "link" })}
        href={`/squads/${squadId}/players`}
      >
        {squad?._count.users} joueur·euse·s
      </Link>
      <Link
        className={buttonVariants({ variant: "link" })}
        href={`/squads/${squadId}/fixtures`}
      >
        {squad?._count.fixtures} matchs joués
      </Link>
    </div>
  );
};

export default SquadPage;
