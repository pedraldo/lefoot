import { createFixture } from "@/actions/create-fixture";
import { FixtureForm } from "@/components/fixture/fixture-form";
import { getSquadUsers } from "@/queries/squad";

export const dynamic = "force-dynamic";

const FixtureCreatePage = async ({
  params,
}: {
  params: { squadId: string };
}) => {
  const squadId = params.squadId;
  const users = await getSquadUsers(squadId);
  if (!users) {
    return (
      <div className="flex flex-col gap-2 w-full text-center">
        <p>{`Impossible de récupérer les données des joueur·euse·s.`}</p>
        <p>{`L'équipe est probablement inconnue.`}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Créer un match</h1>
      <FixtureForm users={users} onSubmit={createFixture} />
    </>
  );
};

export default FixtureCreatePage;
