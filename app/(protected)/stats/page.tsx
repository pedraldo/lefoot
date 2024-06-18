import { auth } from "@/auth";
import UserStats from "@/components/stats/user-stats";

const StatsPage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  return (
    <>
      <UserStats userId={session.user.id} />
    </>
  );
};

export default StatsPage;
