import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import { create } from "domain";

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

  const fixtures = [];
  for (let i = 0; i < NB_FIXTURES; i++) {
    let _users = [...users];
    let homeUsers = [];
    let awayUsers = [];

    for (let j = 0; j < 5; j++) {
      const randomIndex = Math.floor(Math.random() * _users.length);
      homeUsers.push(_users[randomIndex]);
      _users.splice(randomIndex, 1);
    }
    for (let j = 0; j < 5; j++) {
      const randomIndex = Math.floor(Math.random() * _users.length);
      awayUsers.push(_users[randomIndex]);
      _users.splice(randomIndex, 1);
    }

    const dbFixture = await prisma.fixture.create({
      data: {
        datetime: faker.date.recent(),
        homeScore:
          i === 0
            ? 7
            : faker.number.int({
                min: 5,
                max: 18,
              }),
        awayScore:
          i === 0
            ? 7
            : faker.number.int({
                min: 5,
                max: 18,
              }),
        homeTeam: {
          create: {
            users: {
              connect: homeUsers.map((user) => ({ id: user.id })),
            },
          },
        },
        awayTeam: {
          create: {
            users: {
              connect: awayUsers.map((user) => ({ id: user.id })),
            },
          },
        },
      },
    });
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
