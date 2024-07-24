"use server";

import { UpdateUserValues } from "@/components/user/user-settings-form";
import { prisma } from "@/lib/db";
import { getUserById } from "@/queries/user";
import { SettingsSchema } from "@/schemas";

export const updateUser = async (values: UpdateUserValues) => {
  const { id, ...schemaValues } = values;
  const validatedFields = SettingsSchema.safeParse(schemaValues);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s) !" };
  }

  const existingUser = await getUserById(id);

  if (!existingUser) {
    return {
      error: `Compte utilisateur non reconnu avec son identifiant.`,
    };
  }

  const { firstname, lastname, username } = validatedFields.data;

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstname: firstname || existingUser.firstname,
      lastname: lastname || existingUser.lastname,
      username: username || existingUser.username,
    },
  });

  return {
    success: `Tes informations ont bien été mis à jour !`,
  };
};
