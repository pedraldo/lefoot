import { createFixture } from "@/actions/create-fixture";
import { FixtureForm } from "@/components/fixture/fixture-form";
import { getAllUsers } from "@/queries/user";

export const dynamic = "force-dynamic";

const FixtureCreatePage = async () => {
  const users = await getAllUsers();
  if (!users) {
    return (
      <p>{`Erreur lors de la récupération des données des joueurs rendant impossible la création d'un match ...`}</p>
    );
  }
  return <FixtureForm users={users} onSubmit={createFixture} />;
};

export default FixtureCreatePage;
