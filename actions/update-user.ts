"use server";

import { UpdateUserValues } from "@/components/user/user-settings-form";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getUserById } from "@/queries/user";
import { SettingsSchema } from "@/schemas";

export const updateUser = async (values: UpdateUserValues) => {
  const { id, ...schemaValues } = values;
  const validatedFields = SettingsSchema.safeParse(schemaValues);
  logger.info(`update user - start ; id ( ${id} )`);

  if (!validatedFields.success) {
    logger.error(`update user - invalid fields`);
    return { error: "Champ(s) invalide(s) !" };
  }

  logger.info(`udpate user - valid fields`);
  const existingUser = await getUserById(id);

  if (!existingUser) {
    logger.error(`update user - user not recognized from database`);
    return {
      error: `Compte utilisateur non reconnu avec son identifiant.`,
    };
  }

  logger.info(`update user - user recognized from database`);
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

  logger.info(`update user - user names correctly updated`);
  return {
    success: `Tes informations ont bien été mises à jour !`,
  };
};
