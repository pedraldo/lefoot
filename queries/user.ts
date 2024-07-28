import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserForLoginByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        image: true,
        targetedSquad: {
          select: {
            id: true,
            name: true,
          },
        },
        guestSquads: {
          select: {
            id: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export type LoggedInUser = NonNullable<
  Prisma.PromiseReturnType<typeof getUserForLoginByEmail>
>;

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        squads: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        username: "asc",
      },
    });
    return users;
  } catch (error) {
    return null;
  }
};

export type UserWithSquadsIds = NonNullable<
  Prisma.PromiseReturnType<typeof getAllUsers>
>[number];

export const getUserSquadFixtures = async (userId: string, squadId: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        image: true,
        guestSquads: {
          where: {
            id: squadId,
          },
          select: {
            id: true,
          },
        },
        teams: {
          where: {
            squadId,
          },
          select: {
            id: true,
            homeFixtures: {
              select: {
                id: true,
                datetime: true,
                homeScore: true,
                awayScore: true,
              },
            },
            awayFixtures: {
              select: {
                id: true,
                datetime: true,
                homeScore: true,
                awayScore: true,
              },
            },
          },
          orderBy: {
            creationDate: "asc",
          },
        },
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export type UserSquadFixtures = Prisma.PromiseReturnType<
  typeof getUserSquadFixtures
>;

export const getUserSquads = async (userId: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        squads: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return data?.squads;
  } catch (error) {
    return null;
  }
};

export type UserSquads = Prisma.PromiseReturnType<typeof getUserSquads>;
