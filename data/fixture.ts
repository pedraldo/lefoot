import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAllFixtures = () => {
  return prisma.fixture.findMany({
    select: {
      id: true,
      datetime: true,
      homeScore: true,
      awayScore: true,
      homeTeam: {
        select: {
          id: true,
          users: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      },
      awayTeam: {
        select: {
          id: true,
          users: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      datetime: "desc",
    },
  });
};

export type FixtureWithTeams = Prisma.PromiseReturnType<
  typeof getAllFixtures
>[number];
