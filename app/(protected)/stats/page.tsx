import { auth } from "@/auth";
import UserStats from "@/components/stats/user-stats";

const StatsPage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="w-full text-center">
        Impossible de récupérer les informations de votre profil ...
      </div>
    );
  }
  return (
    <>
      <UserStats userId={session.user.id} />
    </>
  );
};

export default StatsPage;
