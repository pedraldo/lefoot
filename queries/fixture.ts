import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAllFixtures = async () => {
  try {
    const fixtures = await prisma.fixture.findMany({
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
    return fixtures;
  } catch (error) {
    return null;
  }
};

export type FixtureWithTeams = NonNullable<
  Prisma.PromiseReturnType<typeof getAllFixtures>
>[number];
