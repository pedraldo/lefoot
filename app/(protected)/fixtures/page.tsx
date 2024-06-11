import FixtureCard from "@/components/fixture/fixture-card";
import { buttonVariants } from "@/components/ui/button";
import { getAllFixtures } from "@/data/fixture";
import { getUserFixtures } from "@/data/user";
import Link from "next/link";
import { RiAddFill } from "react-icons/ri";

export default async function SettingsPage() {
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
      <div className="flex flex-col gap-8 mt-2">
        {fixtures?.map((fixture) => (
          <FixtureCard key={fixture.id} fixture={fixture} />
        ))}
      </div>
    </>
  );
}
