import { prisma } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verficiationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verficiationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verficiationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verficiationToken;
  } catch (error) {
    return null;
  }
};
