"use server";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getUserByEmail } from "@/queries/user";
import { getVerificationTokenByToken } from "@/queries/verification-token";

export const newVerification = async (token: string) => {
  logger.info(`new verification - start`);
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    logger.error(`new verification - token not recognized from database`);
    return { error: "Token inconnu !" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    logger.error(`new verification - token expired`);
    return { error: "Token expiré !" };
  }

  logger.info(
    `new verification - token recognized from database and not expired`
  );
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    logger.error(
      `new verification - token email not corresponding to user email`
    );
    return { error: "Email inconnu !" };
  }

  logger.info(
    `new verification - token email corresponds to user email ; user id  ( ${existingToken.id} )`
  );
  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email, // In case user want to change his email
    },
  });

  logger.info(`new verification - user updated`);
  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  logger.info(`new verification - verification token correctly deleted`);
  return { success: "Email verified !" };
};
