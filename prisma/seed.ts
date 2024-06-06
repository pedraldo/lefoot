import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const NB_FIXTURES = 4;

  const users = [];
  for (let i = 0; i < 12; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const user = {
      firstname,
      lastname,
      username: `${firstname} ${lastname}`,
      image: faker.image.avatar(),
      email: faker.internet.email(),
      emailVerified: faker.date.anytime(),
    } satisfies Prisma.UserCreateInput;

    const dbUser = await prisma.user.create({
      data: user,
    });

    users.push(dbUser);
  }

  let _users = [...users];
  let evenTeamUsers = [];
  let oddTeamUsers = [];
  const teams = [];
  for (let i = 0; i < NB_FIXTURES * 2; i++) {
    const team = {} satisfies Prisma.TeamCreateInput;
    const dbTeam = await prisma.team.create({
      data: team,
    });
    teams.push(dbTeam);

    if (i % 2 === 0) {
      for (let j = 0; j < 5; j++) {
        const randomIndex = Math.floor(Math.random() * _users.length);
        const randomUser = _users[randomIndex];
        evenTeamUsers.push(randomUser);
        _users.splice(randomIndex, 1);
      }
      await prisma.usersOnTeams.createMany({
        data: evenTeamUsers.map((user) => ({
          userId: user.id,
          teamId: dbTeam.id,
        })),
      });
      evenTeamUsers = [];
    } else {
      for (let j = 0; j < 5; j++) {
        const randomIndex = Math.floor(Math.random() * _users.length);
        const randomUser = _users[randomIndex];
        oddTeamUsers.push(randomUser);
        _users.splice(randomIndex, 1);
      }
      await prisma.usersOnTeams.createMany({
        data: oddTeamUsers.map((user) => ({
          userId: user.id,
          teamId: dbTeam.id,
        })),
      });
      oddTeamUsers = [];

      _users = [...users];
    }
  }

  const fixtures = [];
  for (let i = 0; i < NB_FIXTURES; i++) {
    const fixture = {
      date_time: faker.date.recent(),
      team_A_score:
        i === 0
          ? 7
          : faker.number.int({
              min: 5,
              max: 18,
            }),
      team_B_score:
        i === 0
          ? 7
          : faker.number.int({
              min: 5,
              max: 18,
            }),
      team_A_id: teams[i * 2].id,
      team_B_id: teams[i * 2 + 1].id,
    } satisfies Prisma.FixtureUncheckedCreateInput;
    const dbFixture = await prisma.fixture.create({ data: fixture });
    fixtures.push(dbFixture);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
