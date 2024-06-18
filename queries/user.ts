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
      orderBy: {
        username: "asc",
      },
    });
    return users;
  } catch (error) {
    return null;
  }
};

export const getPlayersUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        image: true,
        isGuest: true,
        teams: {
          select: {
            id: true,
            homeFixtures: {
              select: {
                id: true,
                homeScore: true,
                awayScore: true,
              },
            },
            awayFixtures: {
              select: {
                id: true,
                homeScore: true,
                awayScore: true,
              },
            },
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

export type PlayerUser = NonNullable<
  Prisma.PromiseReturnType<typeof getPlayersUsers>
>[number];

export const getGuestUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isGuest: true,
      },
      select: {
        id: true,
        username: true,
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

export type GuestUser = NonNullable<
  Prisma.PromiseReturnType<typeof getGuestUsers>
>[number];

export const getUserFixtures = async (userId: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        teams: {
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

export type UserFixtures = Prisma.PromiseReturnType<typeof getUserFixtures>;
