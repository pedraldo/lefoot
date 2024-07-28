"use server";

import { FixtureCreateValues } from "@/components/fixture/fixture-form";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

export const createFixture = async (values: FixtureCreateValues) => {
  logger.info(`create fixture - squadId ( ${values.squadId} )`)
  const fixture = await prisma.fixture.create({
    data: {
      squad: {
        connect: { id: values.squadId },
      },
      datetime: values.matchDate,
      homeScore: values.homeScore,
      awayScore: values.awayScore,
      homeTeam: {
        create: {
          users: {
            connect: values.homeUserIds.map((id) => ({ id })),
          },
          squad: {
            connect: { id: values.squadId },
          },
          creationDate: values.matchDate,
        },
      },
      awayTeam: {
        create: {
          users: {
            connect: values.awayUserIds.map((id) => ({ id })),
          },
          squad: {
            connect: { id: values.squadId },
          },
          creationDate: values.matchDate,
        },
      },
    },
  });
  
  logger.info(`create fixture - fixture id ( ${fixture.id} )`)
  return fixture.id;
};
