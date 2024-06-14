import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById, getUserFixtures } from "@/queries/user";
import { formatUserFixturesForStats } from "@/services/user";
import { RiUser3Line } from "react-icons/ri";

const UserStats = async ({ userId }: { userId: string | undefined }) => {
  if (!userId) {
    return null;
  }

  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  const userFixtures = await getUserFixtures(userId);
  const userStats = formatUserFixturesForStats(userFixtures);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4 max-sm:flex-col">
        <div>
          <Avatar size="xl">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.username ?? ""} />
            ) : null}
            <AvatarFallback>
              {user.isGuest ? (
                <RiUser3Line className="h-16 w-16" />
              ) : (
                <span className="text-5xl">
                  {user.username.slice(0, 2).toUpperCase()}
                </span>
              )}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex w-full gap-4 justify-between items-center max-sm:flex-col max-sm max-sm:justify-center">
          <div className="flex flex-col max-sm:items-center">
            <span className="text-3xl font-bold">{user.username}</span>
            {user.isGuest && (
              <span className="text-muted-foreground text-lg italic">
                Invité
              </span>
            )}
          </div>
          <div>
            {userStats.series.map((series, index) => {
              if (index < 5) {
                if (series === "V") {
                  return (
                    <span
                      key={index}
                      className="text-green-600 text-2xl font-bold inline-block mr-2"
                    >
                      {series}
                    </span>
                  );
                } else if (series === "D") {
                  return (
                    <span
                      key={index}
                      className="text-destructive text-2xl font-bold inline-block mr-2"
                    >
                      {series}
                    </span>
                  );
                }
                return (
                  <span
                    key={index}
                    className="text-2xl font-bold inline-block mr-2"
                  >
                    {series}
                  </span>
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-8 grid-cols-3 max-sm:grid-cols-2">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Victoires</CardTitle>
            {/* <LuDollarSign className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {userStats.winFixtures.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* +20.1% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              % de victoires
            </CardTitle>
            {/* <LuUsers className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {userStats.percentWins + " %"}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* +180.1% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Série victoire
            </CardTitle>
            {/* <LuCreditCard className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {userStats.bestWinSeries.count}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* +19% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Série défaite</CardTitle>
            {/* <LuCreditCard className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {userStats.bestDefeatSeries.count}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* +19% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Défaites</CardTitle>
            {/* <LuCreditCard className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {userStats.loseFixtures.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* +19% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% de défaites</CardTitle>
            {/* <LuActivity className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {userStats.percentDefeats + " %"}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* +201 since last hour */}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuls</CardTitle>
            {/* <LuActivity className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats.drawFixtures.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* +201 since last hour */}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-7">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% de nuls</CardTitle>
            {/* <LuActivity className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats.percentDraws + " %"}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* +201 since last hour */}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserStats;
