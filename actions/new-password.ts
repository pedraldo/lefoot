"use server";

import { prisma } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/queries/password-reset-token";
import { getUserByEmail } from "@/queries/user";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token !" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s) !" };
  }

  const { password, confirm } = validatedFields.data;
  if (password !== confirm) {
    return { error: "Passwords don't match!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist !" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired !" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist !" };
  }

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

  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated!" };
};
