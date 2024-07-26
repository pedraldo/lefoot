import CreateFixtureButton from "@/components/fixture/create-fixture-button";
import FixtureCard from "@/components/fixture/fixture-card";
import SquadTitle from "@/components/squad/squad-title";
import { getSquadFixtures } from "@/queries/squad";

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
      <div className="w-full flex justify-between items-end pb-4">
        <SquadTitle subtitle={`${fixtures?.length} matchs joués`} />
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
