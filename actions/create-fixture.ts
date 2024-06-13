"use server";

import { FixtureFormValues } from "@/components/fixture/fixture-form";
import { prisma } from "@/lib/db";

export const createFixture = async (values: FixtureFormValues) => {
  const fixture = await prisma.fixture.create({
    data: {
      datetime: values.matchDate,
      homeScore: values.homeScore,
      awayScore: values.awayScore,
      homeTeam: {
        create: {
          users: {
            connect: values.homeUserIds.map((id) => ({ id })),
          },
          creationDate: values.matchDate,
        },
      },
      awayTeam: {
        create: {
          users: {
            connect: values.awayUserIds.map((id) => ({ id })),
          },
          creationDate: values.matchDate,
        },
      },
    },
  });
  return fixture.id;
};
