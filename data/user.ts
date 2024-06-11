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

export const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      username: "asc",
    },
  });
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
        },
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export type UserFixtures = Prisma.PromiseReturnType<typeof getUserFixtures>;
