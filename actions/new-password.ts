"use server";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getPasswordResetTokenByToken } from "@/queries/password-reset-token";
import { getUserByEmail } from "@/queries/user";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  logger.info(`new password - start`);
  if (!token) {
    logger.error(`new password - missing token`);
    return { error: "Token manquant !" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    logger.error(`new password - invalid fields`);
    return { error: "Champ(s) invalide(s) !" };
  }

  const { password, confirm } = validatedFields.data;
  if (password !== confirm) {
    logger.error(`new password - password and confirmation are different`);
    return { error: "Les mots de passe ne sont pas identiques !" };
  }

  logger.info(`new password - valid fields and password = confirmation`);
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    logger.error(`new password - token not recognized in database`);
    return { error: "Token inconnu !" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    logger.error(`new password - token expired`);
    return { error: "Token expiré !" };
  }

  logger.info(`new password - token recognized and not expired`);
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    logger.error(
      `new password - token email not corresponding to a user email`
    );
    return { error: "Email inconnu !" };
  }

  logger.info(
    `new password - Token email recognized ; user id ( ${existingToken.id} )`
  );
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  logger.info(`new password - user password successfully updated`);
  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  logger.info(`new password - password reset token correctly deleted`);
  return { success: "Mot de passe mis à jour" };
};
