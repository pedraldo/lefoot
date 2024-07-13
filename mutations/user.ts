import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const updateUserTargetedSquadId = async (
  userId: string,
  squadId: string
) => {
  try {
    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        targetedSquadId: squadId,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};
