"use server";

import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/queries/user";
import { LinkGuestSchema } from "@/schemas";
import { z } from "zod";

export const linkGuest = async (values: z.infer<typeof LinkGuestSchema>) => {
  const validatedFields = LinkGuestSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s) !" };
  }

  const { guestId, email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "L'email est déjà utilisé par un autre compte." };
  }

  await prisma.user.update({
    where: {
      id: guestId,
    },
    data: {
      email,
      isGuest: false,
    },
  });

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success:
      "Un email de création de mot de passe a été envoyé à l'adresse indiquée !",
  };
};
