import { auth } from "@/auth";
import UserStats from "@/components/stats/user-stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById, getUserFixtures } from "@/queries/user";
import { formatUserFixturesForStats } from "@/services/user";

const Stats = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return <UserStats userId={session.user.id} />;
};

export default Stats;
