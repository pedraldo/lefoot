import FixtureCard from "@/components/fixture/fixture-card";
import { getSquadFixtures } from "@/queries/squad";
import CreateFixtureButton from "@/components/fixture/create-fixture-button";

export const dynamic = "force-dynamic";

export default async function FixturesPage({
  params,
}: {
  params: { squadId: string };
}) {
  const squadId = params.squadId;
  const fixtures = await getSquadFixtures(squadId);

  return (
    <>
      <div className="w-full text-right">
        <CreateFixtureButton />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {fixtures &&
          !!fixtures.length &&
          fixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        {fixtures && fixtures.length === 0 && (
          <div className="w-full text-center">{`Aucun match pour l'instant`}</div>
        )}
        {!fixtures && (
          <div className="flex flex-col gap-2 w-full text-center">
            <p>Erreur lors de la récupération des matchs</p>
            <p>{`L'équipe est probablement inconnue.`}</p>
          </div>
        )}
      </div>
    </>
  );
}
