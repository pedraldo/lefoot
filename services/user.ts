import { formatNumberToPercent } from "@/lib/utils";
import { PlayerUser } from "@/queries/squad";
import { UserSquadFixtures } from "@/queries/user";

export type PlayerUserData = {
  id: string;
  image: string | null;
  username: string;
  isGuest: boolean;
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
      isGuest: !!playerUser.guestSquads[0]?.id,
      nbFixtures: fixturesData.nbFixtures,
      nbFixturesWon: fixturesData.nbFixturesWon,
      nbFixturesLost: fixturesData.nbFixturesLost,
      percentFixturesWon: !!fixturesData.nbFixtures
        ? fixturesData.nbFixturesWon / fixturesData.nbFixtures
        : 0,
      percentFixturesLost: fixturesData.nbFixtures
        ? fixturesData.nbFixturesLost / fixturesData.nbFixtures
        : 0,
    };
  });
};

type FixtureForStats = (UserSquadFixtures & {
  id: string;
})["teams"][0]["homeFixtures"][0];

type BestSeriesData = { datetime: Date | null; count: number };

type ResultsSeries = "V" | "D" | "N";

export type UserFixturesForStats = {
  user: {
    id: string;
    username: string;
    image: string;
    isGuest: boolean;
  } | null;
  winFixtures: FixtureForStats[];
  loseFixtures: FixtureForStats[];
  drawFixtures: FixtureForStats[];
  totalFixturesCount: number;
  percentWins: number;
  percentDefeats: number;
  percentDraws: number;
  series: ResultsSeries[];
  bestWinSeries: BestSeriesData;
  bestDefeatSeries: BestSeriesData;
};
export const formatUserFixturesForStats = (
  user: UserSquadFixtures
): UserFixturesForStats => {
  if (!user) {
    return {
      user: null,
      winFixtures: [] as FixtureForStats[],
      loseFixtures: [] as FixtureForStats[],
      drawFixtures: [] as FixtureForStats[],
      totalFixturesCount: 0,
      percentWins: 0,
      percentDefeats: 0,
      percentDraws: 0,
      series: [] as ResultsSeries[],
      bestWinSeries: { datetime: null, count: 0 },
      bestDefeatSeries: { datetime: null, count: 0 },
    };
  }

  let currentWinSeries: BestSeriesData = {
    datetime: null,
    count: 0,
  };
  let currentDefeatSeries: BestSeriesData = {
    datetime: null,
    count: 0,
  };

  return user.teams.reduce<UserFixturesForStats>(
    (acc, team, index) => {
      const fixture = team.homeFixtures[0] || team.awayFixtures[0];
      const isHomeFixture = !!team.homeFixtures[0];

      const { winFixtures, loseFixtures, drawFixtures, series } =
        sortFixturesByResult(fixture, isHomeFixture, acc);

      const isWin = winFixtures.length > acc.winFixtures.length;
      const isDefeat = loseFixtures.length > acc.loseFixtures.length;

      const { currentSeries: currentSeriesW, bestSeries: bestWinSeries } =
        buildBestSeries(
          currentWinSeries,
          acc.bestWinSeries,
          isWin,
          fixture.datetime
        );
      currentWinSeries = currentSeriesW;

      const { currentSeries: currentSeriesD, bestSeries: bestDefeatSeries } =
        buildBestSeries(
          currentDefeatSeries,
          acc.bestDefeatSeries,
          isDefeat,
          fixture.datetime
        );
      currentDefeatSeries = currentSeriesD;

      // Do this only at the last occurence to calculate results percentages
      if (index === user?.teams.length - 1) {
        const { percentWins, percentDefeats, percentDraws } =
          getFixturesResultsPercents(
            winFixtures.length,
            loseFixtures.length,
            drawFixtures.length
          );

        acc.percentWins = percentWins;
        acc.percentDefeats = percentDefeats;
        acc.percentDraws = percentDraws;
        acc.totalFixturesCount = index + 1;
      }

      return {
        ...acc,
        winFixtures,
        loseFixtures,
        drawFixtures,
        series,
        bestWinSeries,
        bestDefeatSeries,
      };
    },
    {
      user: {
        id: user.id,
        image: user.image || "",
        username: user.username,
        isGuest: !!user.guestSquads[0]?.id,
      },
      winFixtures: [] as FixtureForStats[],
      loseFixtures: [] as FixtureForStats[],
      drawFixtures: [] as FixtureForStats[],
      totalFixturesCount: 0,
      percentWins: 0,
      percentDefeats: 0,
      percentDraws: 0,
      series: [],
      bestWinSeries: { datetime: null, count: 0 },
      bestDefeatSeries: { datetime: null, count: 0 },
    }
  );
};

const sortFixturesByResult = (
  fixture: FixtureForStats,
  isHomeFixture: boolean,
  statsObj: UserFixturesForStats
): UserFixturesForStats => {
  const { winFixtures, loseFixtures, drawFixtures, series } = JSON.parse(
    JSON.stringify(statsObj)
  );
  if (fixture.homeScore === fixture.awayScore) {
    drawFixtures.push(fixture);
    series.unshift("N");
  } else if (isHomeFixture) {
    if (fixture.homeScore > fixture.awayScore) {
      winFixtures.push(fixture);
      series.unshift("V");
    } else {
      loseFixtures.push(fixture);
      series.unshift("D");
    }
  } else {
    if (fixture.homeScore < fixture.awayScore) {
      winFixtures.push(fixture);
      series.unshift("V");
    } else {
      loseFixtures.push(fixture);
      series.unshift("D");
    }
  }

  return {
    ...statsObj,
    winFixtures,
    loseFixtures,
    drawFixtures,
    series,
  };
};

const getFixturesResultsPercents = (
  nbWins: number,
  nbDefeats: number,
  nbDraws: number
) => {
  return {
    percentWins: formatNumberToPercent(nbWins / (nbWins + nbDefeats + nbDraws)),
    percentDefeats: formatNumberToPercent(
      nbDefeats / (nbWins + nbDefeats + nbDraws)
    ),
    percentDraws: formatNumberToPercent(
      nbDraws / (nbWins + nbDefeats + nbDraws)
    ),
  };
};

const buildBestSeries = (
  currentSeries: BestSeriesData,
  bestSeries: BestSeriesData,
  isResultTargeted: boolean,
  fixtureDatetime: Date
): {
  currentSeries: BestSeriesData;
  bestSeries: BestSeriesData;
} => {
  if (isResultTargeted) {
    currentSeries = {
      datetime: currentSeries.datetime || fixtureDatetime,
      count: currentSeries.count + 1,
    };

    if (currentSeries.count >= bestSeries.count) {
      bestSeries = { ...currentSeries };
    }
  } else {
    currentSeries = {
      datetime: null,
      count: 0,
    };
  }
  return {
    currentSeries,
    bestSeries,
  };
};
