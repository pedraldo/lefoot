import { createFixture } from "@/actions/create-fixture";
import { FixtureForm } from "@/components/fixture/fixture-form";
import { getAllUsers } from "@/queries/user";

const FixtureCreatePage = async () => {
  const users = await getAllUsers();
  return <FixtureForm users={users} onSubmit={createFixture} />;
};

export default FixtureCreatePage;
