import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getSquadById = (id: string) => {
  try {
    const data = prisma.squad.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            fixtures: true,
            users: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export const getSquadUsersAndGuestUsers = async (squadId: string) => {
  try {
    const squad = await prisma.squad.findUnique({
      where: {
        id: squadId,
      },
      select: {
        id: true,
        guestUsers: {
          select: {
            id: true,
            username: true,
          },
        },
        users: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    return squad || null;
  } catch (error) {
    return null;
  }
};

export type SquadUsersAndGuests = NonNullable<
  Prisma.PromiseReturnType<typeof getSquadUsersAndGuestUsers>
>;

export const getSquadPlayersUsers = async (squadId: string) => {
  try {
    const squad = await prisma.squad.findUnique({
      where: {
        id: squadId,
      },
      select: {
        users: {
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
        },
      },
    });
    return squad?.users;
  } catch (error) {
    return null;
  }
};

export type PlayerUser = NonNullable<
  Prisma.PromiseReturnType<typeof getSquadPlayersUsers>
>[number];

export const getSquadFixtures = async (squadId: string) => {
  try {
    const squad = await prisma.squad.findUnique({
      where: {
        id: squadId,
      },
      select: {
        fixtures: {
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
        },
      },
    });
    return squad?.fixtures;
  } catch (error) {
    return null;
  }
};

export type FixtureWithTeams = NonNullable<
  Prisma.PromiseReturnType<typeof getSquadFixtures>
>[number];

export const getSquadUsers = async (squadId: string) => {
  try {
    const squad = await prisma.squad.findUnique({
      where: {
        id: squadId,
      },
      select: {
        users: {
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
        },
      },
    });
    return squad?.users;
  } catch (error) {
    return null;
  }
};

export type UserWithSquadsIds = NonNullable<
  Prisma.PromiseReturnType<typeof getSquadUsers>
>[number];
