import FixtureCard from "@/components/fixture/fixture-card";
import { buttonVariants } from "@/components/ui/button";
import { getAllFixtures } from "@/queries/fixture";
import Link from "next/link";
import { RiAddFill } from "react-icons/ri";

export const dynamic = "force-dynamic";

export default async function FixturesPage() {
  const fixtures = await getAllFixtures();

  return (
    <>
      <div className="w-full text-right">
        <Link
          href="/fixtures/create"
          className={buttonVariants({ variant: "default" })}
        >
          <RiAddFill className="mr-2 h-4 w-4" /> Créer un match
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {fixtures &&
          !!fixtures.length &&
          fixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        {fixtures && fixtures.length === 0 && (
          <p>{`Aucun match pour l'instant`}</p>
        )}
        {!fixtures && <p>Erreur lors de la récupération des matchs ...</p>}
      </div>
    </>
  );
}
