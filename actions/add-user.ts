"use server";

import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/queries/user";
import { AddUserSchema } from "@/schemas";
import { AddUserValues } from "../components/user/add-user-form";

export const addUser = async (values: AddUserValues) => {
  const { squadId, ...schemaValues } = values;
  const validatedFields = AddUserSchema.safeParse(schemaValues);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s) !" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: `Aucun compte avec l'email '${email}' n'existe actuellement.`,
    };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      squads: {
        connect: [{ id: squadId }],
      },
    },
  });

  return {
    success: `${existingUser.username} a bien été ajouté à l'équipe !`,
  };
};
