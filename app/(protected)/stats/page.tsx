import { getUserFixtures } from "@/queries/user";

const Stats = async () => {
  const jaylanFixtures = await getUserFixtures("clx4m8cvn0000x30g85srqv88");
  const jaylanSortedFixtures = jaylanFixtures?.teams.reduce(
    (acc, team) => {
      const fixture = team.homeFixtures[0] || team.awayFixtures[0];
      const isHomeFixture = !!team.homeFixtures[0];
      console.log(
        `${isHomeFixture ? "home" : "away"} fixture ; Score : ${
          fixture.homeScore
        }-${fixture.awayScore}`
      );
      if (fixture.homeScore === fixture.awayScore) {
        acc.drawFixtures.push(fixture);
      } else if (isHomeFixture) {
        if (fixture.homeScore > fixture.awayScore) {
          acc.winFixtures.push(fixture);
        } else {
          acc.loseFixtures.push(fixture);
        }
      } else {
        if (fixture.homeScore < fixture.awayScore) {
          acc.winFixtures.push(fixture);
        } else {
          acc.loseFixtures.push(fixture);
        }
      }
      return acc;
    },
    {
      winFixtures: [] as Object[],
      loseFixtures: [] as Object[],
      drawFixtures: [] as Object[],
    }
  );

  const jaylanRates = {
    winRate:
      jaylanSortedFixtures?.winFixtures?.length && jaylanFixtures?.teams?.length
        ? (jaylanSortedFixtures.winFixtures?.length /
            jaylanFixtures?.teams?.length) *
          100
        : 0,
    loseRate:
      jaylanSortedFixtures?.loseFixtures?.length &&
      jaylanFixtures?.teams?.length
        ? (jaylanSortedFixtures.loseFixtures?.length /
            jaylanFixtures?.teams?.length) *
          100
        : 0,
    drawRate:
      jaylanSortedFixtures?.drawFixtures?.length &&
      jaylanFixtures?.teams?.length
        ? (jaylanSortedFixtures.drawFixtures?.length /
            jaylanFixtures?.teams?.length) *
          100
        : 0,
  };

  return (
    <div>
      <p>Jaylan results :</p>
      <p>
        winRate : {jaylanRates.winRate}% (
        {jaylanSortedFixtures?.winFixtures.length || 0}/
        {jaylanFixtures?.teams.length})
      </p>
      <p>
        loseRate : {jaylanRates.loseRate}% (
        {jaylanSortedFixtures?.loseFixtures.length || 0}/
        {jaylanFixtures?.teams.length})
      </p>
      <p>
        drawRate : {jaylanRates.drawRate}% (
        {jaylanSortedFixtures?.drawFixtures.length || 0}/
        {jaylanFixtures?.teams.length})
      </p>
      <p>total : {jaylanFixtures?.teams?.length}</p>
    </div>
  );
};

export default Stats;
