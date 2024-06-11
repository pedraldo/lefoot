import { formatNumberToPercent } from "@/lib/utils";
import { PlayerUser } from "@/queries/user";

export type PlayerUserData = {
  id: string;
  image: string | null;
  username: string;
  nbFixtures: number;
  nbFixturesWon: number;
  nbFixturesLost: number;
  percentFixturesWon: number;
  percentFixturesLost: number;
};

export const formatUsersForPlayersTable = (
  playersUsers: PlayerUser[]
): PlayerUserData[] => {
  return playersUsers.map((playerUser) => {
    const fixturesData = playerUser.teams.reduce(
      (acc, team) => ({
        nbFixtures:
          acc.nbFixtures + team.homeFixtures.length + team.awayFixtures.length,
        nbFixturesWon:
          acc.nbFixturesWon +
          team.homeFixtures.filter(
            (fixture) => fixture.homeScore > fixture.awayScore
          ).length +
          team.awayFixtures.filter(
            (fixture) => fixture.awayScore > fixture.homeScore
          ).length,
        nbFixturesLost:
          acc.nbFixturesLost +
          team.homeFixtures.filter(
            (fixture) => fixture.homeScore < fixture.awayScore
          ).length +
          team.awayFixtures.filter(
            (fixture) => fixture.awayScore < fixture.homeScore
          ).length,
      }),
      {
        nbFixtures: 0,
        nbFixturesWon: 0,
        nbFixturesLost: 0,
      }
    );

    return {
      id: playerUser.id,
      image: playerUser.image,
      username: playerUser.username,
      nbFixtures: fixturesData.nbFixtures,
      nbFixturesWon: fixturesData.nbFixturesWon,
      nbFixturesLost: fixturesData.nbFixturesLost,
      percentFixturesWon: fixturesData.nbFixturesWon / fixturesData.nbFixtures,
      percentFixturesLost:
        fixturesData.nbFixturesLost / fixturesData.nbFixtures,
    };
  });
};
