"use server";

import { prisma } from "@/lib/db";
import { FixtureFormValues } from "@/components/fixture/fixture-form";

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
        },
      },
      awayTeam: {
        create: {
          users: {
            connect: values.awayUserIds.map((id) => ({ id })),
          },
        },
      },
    },
  });
  return fixture.id;
};
